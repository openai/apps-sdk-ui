import { act, render, waitFor } from "@testing-library/react"
import React from "react"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { sleep } from "../../lib/helpers"
import { SlotTransitionGroup, type SlotTransitionGroupProps } from "./"

type TestGroupProps = {
  childKey: string | string[] | null
  childText?: string
} & Omit<SlotTransitionGroupProps, "children">

const TestGroup: React.FC<TestGroupProps> = ({ childKey, childText, ...restProps }) => (
  <div className="TestWrapper">
    <SlotTransitionGroup
      enterDuration={100}
      exitDuration={100}
      disableAnimations={false}
      {...restProps}
    >
      {Array.isArray(childKey) ? (
        childKey.map((key: string) => <p key={key}>{key}</p>)
      ) : (
        <p key={childKey}>{childText || childKey}</p>
      )}
    </SlotTransitionGroup>
  </div>
)

// SlotTransitionGroup should work in StrictMode, but callbacks behave a bit weird (called twice)
// so we only wrap some tests in StrictMode.
const StrictTestGroup: React.FC<TestGroupProps> = (props) => (
  <React.StrictMode>
    <TestGroup {...props} />
  </React.StrictMode>
)

describe("SlotTransitionGroup", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // eslint-disable-next-line no-console
    errorSpy = vi.spyOn(console, "error").mockImplementation(console.log)
  })

  afterEach(() => {
    errorSpy?.mockRestore?.()
  })

  test("can render null children", () => {
    const { container } = render(<SlotTransitionGroup>{null}</SlotTransitionGroup>)
    expect(container.innerHTML).toBe("")
  })

  test("throws when non-null children do not pass `key`", () => {
    expect(() => {
      render(
        <SlotTransitionGroup>
          <p>Missing key</p>
        </SlotTransitionGroup>,
      )
    }).toThrowError(/Child elements of <SlotTransitionGroup \/> must include a `key`/)
  })

  // No className prop at group-level for SlotTransitionGroup; consumers should set it directly on children

  // No transitionId prop at group-level for SlotTransitionGroup; consumers should set it directly on children

  test("mounts without initial classes when preventing transition", async () => {
    // Force useEffect to no-op to test the mount-only behavior, without side effects.
    const effectSpy = vi.spyOn(React, "useEffect").mockImplementation(() => {})

    const { getByText } = render(<StrictTestGroup childKey="A" />)

    // Initial DOM is rendered without state attributes
    expect(getByText("A")).not.toHaveAttribute("data-entering")
    effectSpy.mockRestore()
  })

  test("can handle prop updates", async () => {
    const { queryByText, rerender } = render(<StrictTestGroup childKey="A" />)

    expect(queryByText("A")).toBeInTheDocument()

    rerender(<StrictTestGroup childKey="A" childText="Text from prop" />)

    expect(queryByText("A")).not.toBeInTheDocument()
    expect(queryByText("Text from prop")).toBeInTheDocument()
  })

  test("mounts with initial classes when animating", async () => {
    // Force useEffect to no-op to test the mount-only behavior, without side effects.
    const effectSpy = vi.spyOn(React, "useEffect").mockImplementation(() => {})

    const { getByText } = render(<StrictTestGroup childKey="A" preventInitialTransition={false} />)

    // Initial DOM has entering attribute on the child
    expect(getByText("A")).toHaveAttribute("data-entering")
    effectSpy.mockRestore()
  })

  test("can transition between children", async () => {
    const { rerender, getByText, queryByText } = render(<StrictTestGroup childKey="A" />)

    // Initial child rendered
    expect(getByText("A")).toBeInTheDocument()

    // Render a new child
    rerender(<StrictTestGroup childKey="B" />)

    expect(getByText("A")).toHaveAttribute("data-exiting")
    expect(getByText("B")).toHaveAttribute("data-entering")

    // Animation becomes active
    await waitFor(() => {
      expect(getByText("A")).toHaveAttribute("data-exiting-active")
      expect(getByText("B")).toHaveAttribute("data-entering-active")
    })

    // Animation completes
    await waitFor(() => {
      expect(queryByText("A")).not.toBeInTheDocument()
      expect(getByText("B")).toBeInTheDocument()
      expect(getByText("B")).not.toHaveAttribute("data-entering")
      expect(getByText("B")).not.toHaveAttribute("data-entering-active")
    })
  })

  retryTest(5, "can interrupt child transitions", async () => {
    const controls = render(<StrictTestGroup childKey="A" />)
    const { rerender, getByText, queryByText, unmount } = controls

    expect(getByText("A")).toBeInTheDocument()

    // Render a new child
    rerender(<StrictTestGroup childKey="B" />)

    // Animation staged
    expect(getByText("A")).toHaveAttribute("data-exiting")
    expect(getByText("B")).toHaveAttribute("data-entering")
    // Interrupted state is not present because animation was not in-flight
    expect(getByText("A")).not.toHaveAttribute("data-interrupted")
    expect(getByText("B")).not.toHaveAttribute("data-interrupted")

    // Animations active
    await waitFor(() => {
      expect(getByText("A")).toHaveAttribute("data-exiting-active")
      expect(getByText("B")).toHaveAttribute("data-entering-active")
    })

    // Switch child back before animation completes
    rerender(<StrictTestGroup childKey="A" />)

    expect(getByText("A")).toHaveAttribute("data-entering")
    expect(getByText("B")).toHaveAttribute("data-exiting")
    // Both animations are considered interrupted!
    expect(getByText("A")).toHaveAttribute("data-interrupted")
    expect(getByText("B")).toHaveAttribute("data-interrupted")

    await waitFor(() => {
      expect(getByText("A")).toHaveAttribute("data-entering-active")
      expect(getByText("B")).toHaveAttribute("data-exiting-active")
      // Interrupted state is not applied during active animation
      expect(getByText("A")).not.toHaveAttribute("data-interrupted")
      expect(getByText("B")).not.toHaveAttribute("data-interrupted")
    })

    // Interrupt removal and bring both back
    rerender(<StrictTestGroup childKey={["A", "B"]} />)

    expect(getByText("A")).toHaveAttribute("data-entering")
    expect(getByText("A")).not.toHaveAttribute("data-interrupted")
    expect(getByText("B")).toHaveAttribute("data-entering")
    expect(getByText("B")).toHaveAttribute("data-interrupted")

    await waitFor(() => {
      expect(getByText("A")).toHaveAttribute("data-entering-active")
      expect(getByText("A")).not.toHaveAttribute("data-interrupted")
      expect(getByText("B")).toHaveAttribute("data-entering-active")
      expect(getByText("B")).not.toHaveAttribute("data-interrupted")
    })

    // Interrupt both and remove them
    rerender(<StrictTestGroup childKey={[]} />)

    expect(getByText("A")).toHaveAttribute("data-exiting")
    expect(getByText("A")).toHaveAttribute("data-interrupted")
    expect(getByText("B")).toHaveAttribute("data-exiting")
    expect(getByText("B")).toHaveAttribute("data-interrupted")

    await waitFor(() => {
      expect(queryByText("A")).not.toBeInTheDocument()
      expect(queryByText("B")).not.toBeInTheDocument()
    })

    unmount()
  })

  test("does not trigger redundant transitions", async () => {
    const { rerender, getByText } = render(<StrictTestGroup childKey="A" />)

    expect(getByText("A")).toBeInTheDocument()

    rerender(<StrictTestGroup childKey="A" enterDuration={1000} exitDuration={1000} />)

    expect(getByText("A")).not.toHaveAttribute("data-entering")

    rerender(
      <StrictTestGroup
        childKey="A"
        enterDuration={1000}
        exitDuration={1000}
        preventInitialTransition={false}
      />,
    )

    expect(getByText("A")).not.toHaveAttribute("data-entering")

    // Ensure it didn't trigger a moment later
    await waitFor(() => {
      expect(getByText("A")).not.toHaveAttribute("data-entering")
    })
  })

  test("does not trigger redundant in-flight transitions", async () => {
    const { rerender, getByText, queryByText } = render(<StrictTestGroup childKey="A" />)

    expect(getByText("A")).toBeInTheDocument()

    rerender(<StrictTestGroup childKey="B" />)

    expect(getByText("A")).toHaveAttribute("data-exiting")
    expect(getByText("B")).toHaveAttribute("data-entering")

    await waitFor(() => {
      expect(getByText("A")).toHaveAttribute("data-exiting-active")
      expect(getByText("B")).toHaveAttribute("data-entering-active")
    })

    // Re-render identical component
    rerender(<StrictTestGroup childKey="B" />)

    await waitFor(() => {
      expect(queryByText("A")).not.toBeInTheDocument()
      expect(getByText("B")).not.toHaveAttribute("data-entering")
      expect(getByText("B")).not.toHaveAttribute("data-entering-active")
    })
  })

  test("can delay mount with enterMountDelay", async () => {
    const DELAY = 250

    const { queryByText, getByText } = render(
      <StrictTestGroup childKey="A" preventInitialTransition={false} enterMountDelay={DELAY} />,
    )

    // Should not be in the DOM immediately
    expect(queryByText("A")).not.toBeInTheDocument()

    // Advance time by less than DELAY
    await act(() => sleep(DELAY - 50))
    expect(queryByText("A")).not.toBeInTheDocument()

    // Advance time to DELAY
    await act(() => sleep(60))
    expect(getByText("A")).toBeInTheDocument()
    expect(getByText("A")).toHaveAttribute("data-entering")
  })

  test("mounts immediately when enterMountDelay is undefined", async () => {
    const { getByText } = render(<StrictTestGroup childKey="A" preventInitialTransition={false} />)
    expect(getByText("A")).toBeInTheDocument()
  })

  test("delays mounting when child changes with enterMountDelay", async () => {
    const DELAY = 150
    const { getByText, queryByText, rerender } = render(<StrictTestGroup childKey="A" />)

    expect(getByText("A")).toBeInTheDocument()

    rerender(<StrictTestGroup childKey="B" enterMountDelay={DELAY} />)

    // B should not be in the DOM immediately
    expect(queryByText("B")).toBeNull()
    await act(() => sleep(DELAY))
    expect(getByText("B")).toBeInTheDocument()
  })

  test("mounts after a tick when enterMountDelay is 0", async () => {
    const { getByText } = render(
      <StrictTestGroup childKey="A" preventInitialTransition={false} enterMountDelay={0} />,
    )
    await act(() => sleep(0))
    expect(getByText("A")).toBeInTheDocument()
  })

  test("does not delay mount if preventInitialTransition is true", async () => {
    const { getByText } = render(
      <StrictTestGroup childKey="A" preventInitialTransition enterMountDelay={200} />,
    )

    expect(getByText("A")).toBeInTheDocument()
  })

  test("does not delay mount if disableAnimations is true", async () => {
    const { getByText } = render(<TestGroup childKey="A" disableAnimations enterMountDelay={200} />)
    expect(getByText("A")).toBeInTheDocument()
  })

  test("can mount with animation (preventInitialTransition={false})", async () => {
    const { getByText } = render(<StrictTestGroup childKey="A" preventInitialTransition={false} />)

    expect(getByText("A")).toBeInTheDocument()
    expect(getByText("A")).toHaveAttribute("data-entering")

    await waitFor(() => {
      expect(getByText("A")).toHaveAttribute("data-entering-active")
    })

    await waitFor(() => {
      expect(getByText("A")).not.toHaveAttribute("data-entering")
      expect(getByText("A")).not.toHaveAttribute("data-entering-active")
    })
  })

  test("does not attempt renders on children after unmount", async () => {
    const { container, rerender, getByText } = render(<StrictTestGroup childKey={null} />)

    rerender(<StrictTestGroup childKey="A" />)

    expect(getByText("A")).toHaveAttribute("data-entering")

    await waitFor(() => {
      expect(getByText("A")).toHaveAttribute("data-entering-active")
    })

    // Unmount the transition group
    rerender(null)

    // Wait for all children to be removed
    await waitFor(() => {
      expect(container.innerHTML).toBe("")
    })

    await act(() => sleep(300))

    // React did not trigger any console errors, like rendering state on unmounted components
    expect(errorSpy).not.toHaveBeenCalled()
  })

  describe("forwardRef", () => {
    test("can forward ref to child", async () => {
      const testRef = React.createRef<HTMLElement>()

      render(
        <SlotTransitionGroup ref={testRef}>
          <span key="A">A</span>
        </SlotTransitionGroup>,
      )

      await waitFor(() => {
        const element = testRef.current as HTMLElement
        expect(element).not.toBeNull()
        // Ref is of the slotted child itself
        expect(element.nodeName).toBe("SPAN")
        expect(element.textContent).toBe("A")
      })
    })

    test("throws when attempting to forwardRef to multiple children", async () => {
      const testRef = React.createRef<HTMLElement>()

      expect(() => {
        render(
          <SlotTransitionGroup ref={testRef}>
            <span key="A">A</span>
            <span key="B">B</span>
          </SlotTransitionGroup>,
        )
      }).toThrowError("Cannot use forwardRef with multiple children in <SlotTransitionGroup />")
    })
  })

  describe("props and refs preservation", () => {
    test("preserves child's own ref in disableAnimations", async () => {
      const childRef = React.createRef<HTMLElement>()

      const { getByText } = render(
        <SlotTransitionGroup disableAnimations>
          <span key="A" ref={childRef} data-x="1">
            A
          </span>
        </SlotTransitionGroup>,
      )

      await waitFor(() => {
        const el = childRef.current as HTMLElement
        expect(el).not.toBeNull()
        expect(el.nodeName).toBe("SPAN")
        expect(el.textContent).toBe("A")
      })

      expect(getByText("A")).toHaveAttribute("data-x", "1")
    })

    test("preserves child's own ref in animated mode", async () => {
      const childRef = React.createRef<HTMLElement>()

      render(
        <SlotTransitionGroup preventInitialTransition={false} enterDuration={1}>
          <span key="A" ref={childRef}>
            A
          </span>
        </SlotTransitionGroup>,
      )

      await waitFor(() => {
        const el = childRef.current as HTMLElement
        expect(el).not.toBeNull()
        expect(el.nodeName).toBe("SPAN")
        expect(el.textContent).toBe("A")
      })
    })

    test("preserves child's own className and data-* props", () => {
      const { getByText } = render(
        <SlotTransitionGroup disableAnimations>
          <span key="A" className="child-class" data-id="abc">
            A
          </span>
        </SlotTransitionGroup>,
      )

      const child = getByText("A")
      expect(child).toHaveClass("child-class")
      expect(child).toHaveAttribute("data-id", "abc")
    })
  })

  describe("insertMethod", () => {
    test("can prepend items with insertMethod", () => {
      const { rerender, getByText, queryAllByText } = render(
        <StrictTestGroup
          childKey={["item-A"]}
          insertMethod="prepend"
          enterDuration={1}
          exitDuration={1}
        />,
      )

      expect(getByText("item-A")).toBeInTheDocument()

      // Render another child, which will be appended with our internal insertMethod logic
      rerender(
        <StrictTestGroup
          childKey={["item-A", "item-B"]}
          insertMethod="prepend"
          enterDuration={1}
          exitDuration={1}
        />,
      )

      const items = queryAllByText(/item-/)
      expect(items).toHaveLength(2)
      expect(items[0]).toHaveTextContent("item-B")
      expect(items[1]).toHaveTextContent("item-A")
    })
  })

  describe("disableAnimations", () => {
    test("can render null children", () => {
      expect(() => {
        render(<SlotTransitionGroup disableAnimations>{null}</SlotTransitionGroup>)
      }).not.toThrowError()
    })

    test("does not animate between children", () => {
      const { rerender, getByText, queryByText } = render(
        <StrictTestGroup childKey="A" disableAnimations />,
      )

      expect(getByText("A")).toBeInTheDocument()
      expect(getByText("A").parentElement).toHaveClass("TestWrapper")

      rerender(<StrictTestGroup childKey="B" disableAnimations />)

      // Children are immediately updated
      expect(queryByText("A")).not.toBeInTheDocument()

      // Child is updated as expected
      expect(getByText("B")).toBeInTheDocument()
    })

    test("can forward refs", async () => {
      const testRef = React.createRef<HTMLElement | null>()

      const { rerender } = render(
        <SlotTransitionGroup disableAnimations ref={testRef}>
          <span key="A">A</span>
        </SlotTransitionGroup>,
      )

      await waitFor(() => {
        const element = testRef.current
        // Ref is of the child
        expect(element!.nodeName).toBe("SPAN")
        expect(element!.textContent).toBe("A")
      })

      rerender(
        <SlotTransitionGroup disableAnimations ref={testRef}>
          <span key="B">B</span>
        </SlotTransitionGroup>,
      )

      await waitFor(() => {
        const element = testRef.current
        expect(element!.nodeName).toBe("SPAN")
        expect(element!.textContent).toBe("B")
      })
    })

    // No style/transitionId passthrough from group; consumers can set these directly on children
  })

  describe("callbacks", () => {
    let onEnter: ReturnType<typeof vi.fn>
    let onEnterActive: ReturnType<typeof vi.fn>
    let onEnterComplete: ReturnType<typeof vi.fn>
    let onExit: ReturnType<typeof vi.fn>
    let onExitActive: ReturnType<typeof vi.fn>
    let onExitComplete: ReturnType<typeof vi.fn>

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let callbacks: any

    beforeEach(() => {
      onEnter = vi.fn()
      onEnterActive = vi.fn()
      onEnterComplete = vi.fn()
      onExit = vi.fn()
      onExitActive = vi.fn()
      onExitComplete = vi.fn()

      callbacks = {
        onEnter,
        onEnterActive,
        onEnterComplete,
        onExit,
        onExitActive,
        onExitComplete,
      }
    })

    test("does not fire when initial transition is prevented (default)", () => {
      render(<TestGroup childKey="A" {...callbacks} />)
      expect(onEnter).not.toHaveBeenCalled()
    })

    test("does not fire for null children", () => {
      render(
        <SlotTransitionGroup
          enterDuration={100}
          exitDuration={100}
          preventInitialTransition={false}
          {...callbacks}
        >
          {null}
        </SlotTransitionGroup>,
      )
      expect(onEnter).not.toHaveBeenCalled()
    })

    test("fires when animating initial transition", async () => {
      render(<TestGroup childKey="A" preventInitialTransition={false} {...callbacks} />)

      expect(onEnter).toHaveBeenCalledTimes(1)

      await waitFor(() => expect(onEnterActive).toHaveBeenCalledTimes(1))
      await waitFor(() => expect(onEnterComplete).toHaveBeenCalledTimes(1))
    })

    test("fires all events when transitioning between children", async () => {
      const { rerender, getByText } = render(<TestGroup childKey="A" {...callbacks} />)

      rerender(<TestGroup childKey="B" {...callbacks} />)

      const A = getByText("A")
      const B = getByText("B")

      await waitFor(() => {
        expect(onExit).toHaveBeenCalledTimes(1)
        expect(onExit).toHaveBeenCalledWith(A)
        expect(onEnter).toHaveBeenCalledTimes(1)
        expect(onEnter).toHaveBeenCalledWith(B)
      })

      await waitFor(() => {
        expect(onExitActive).toHaveBeenCalledTimes(1)
        expect(onExitActive).toHaveBeenCalledWith(A)
        expect(onEnterActive).toHaveBeenCalledTimes(1)
        expect(onEnterActive).toHaveBeenCalledWith(B)
      })

      await waitFor(() => {
        expect(onExitComplete).toHaveBeenCalledTimes(1)
        expect(onExitComplete).toHaveBeenCalledWith(A)
        expect(onEnterComplete).toHaveBeenCalledTimes(1)
        expect(onEnterComplete).toHaveBeenCalledWith(B)
      })
    })

    test("can update callback props between renders", async () => {
      const { rerender } = render(
        <TestGroup childKey="A" preventInitialTransition={false} {...callbacks} />,
      )

      // Initial entrance animation has callbacks fires
      expect(onEnter).toHaveBeenCalledTimes(1)
      await waitFor(() => expect(onEnterActive).toHaveBeenCalledTimes(1))
      await waitFor(() => expect(onEnterComplete).toHaveBeenCalledTimes(1))

      // Render another child, but not passing callbacks, updating them to undefined
      rerender(<TestGroup childKey="B" enterDuration={1} exitDuration={1} />)

      // Wait a moment for rendering
      await act(() => sleep(100))

      // Exit callbacks were not called
      expect(onExit).not.toHaveBeenCalled()
      expect(onExitActive).not.toHaveBeenCalled()
      expect(onExitComplete).not.toHaveBeenCalled()
      // Enter callbacks are still only called once
      expect(onEnter).toHaveBeenCalledTimes(1)
      expect(onEnterActive).toHaveBeenCalledTimes(1)
      expect(onEnterComplete).toHaveBeenCalledTimes(1)

      // Render another child, passing callbacks back in
      rerender(<TestGroup childKey="C" {...callbacks} />)

      // Callbacks continue as expected
      expect(onExit).toHaveBeenCalledTimes(1)
      expect(onEnter).toHaveBeenCalledTimes(2)

      await waitFor(() => {
        expect(onExitActive).toHaveBeenCalledTimes(1)
        expect(onEnterActive).toHaveBeenCalledTimes(2)
      })

      await waitFor(() => {
        expect(onExitComplete).toHaveBeenCalledTimes(1)
        expect(onEnterComplete).toHaveBeenCalledTimes(2)
      })
    })

    // NOTE: This is intentional behavior to discourage using non-animation
    // or business logic behaviors with callbacks.
    test("does not fire callbacks with disableAnimations", async () => {
      const { rerender, getByText } = render(
        <TestGroup
          childKey="A"
          preventInitialTransition={false}
          disableAnimations
          {...callbacks}
        />,
      )

      expect(getByText("A")).toBeInTheDocument()

      rerender(
        <TestGroup
          childKey="B"
          preventInitialTransition={false}
          disableAnimations
          {...callbacks}
        />,
      )

      // Wait a moment for rendering
      await act(() => sleep(100))

      // Callbacks were not called
      expect(onEnter).not.toHaveBeenCalled()
      expect(onEnterActive).not.toHaveBeenCalled()
      expect(onEnterComplete).not.toHaveBeenCalled()
      expect(onExit).not.toHaveBeenCalled()
      expect(onExitActive).not.toHaveBeenCalled()
      expect(onExitComplete).not.toHaveBeenCalled()
    })
  })
})
