import { act, render, waitFor } from "@testing-library/react"
import React from "react"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { sleep } from "../../lib/helpers"
import { TransitionGroup, type TransitionGroupProps } from "./"

type TestGroupProps = {
  childKey: string | string[] | null
  childText?: string
} & Omit<TransitionGroupProps, "children">

const TestGroup: React.FC<TestGroupProps> = ({ childKey, childText, ...restProps }) => (
  <div className="TestWrapper">
    <TransitionGroup
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
    </TransitionGroup>
  </div>
)

// TransitionGroup should work in StrictMode, but callbacks behave a bit weird (called twice)
// so we only wrap some tests in StrictMode.
const StrictTestGroup: React.FC<TestGroupProps> = (props) => (
  <React.StrictMode>
    <TestGroup {...props} />
  </React.StrictMode>
)

describe("TransitionGroup", () => {
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    // eslint-disable-next-line no-console
    errorSpy = vi.spyOn(console, "error").mockImplementation(console.log)
  })

  afterEach(() => {
    errorSpy?.mockRestore?.()
  })

  test("can render null children", () => {
    const { container } = render(<TransitionGroup>{null}</TransitionGroup>)
    expect(container.innerHTML).toBe("")
  })

  test("throws when non-null children do not pass `key`", () => {
    expect(() => {
      render(
        <TransitionGroup>
          <p>Missing key</p>
        </TransitionGroup>,
      )
    }).toThrowError(/Child elements of <TransitionGroup \/> must include a `key`/)
  })

  test("applies className as expected", async () => {
    const { getByText } = render(<StrictTestGroup childKey="A" className="test-class" />)

    expect(getByText("A").parentElement).toHaveClass("test-class")
  })

  test("applies transitionId as expected", async () => {
    const { getByText } = render(<StrictTestGroup childKey="A" transitionId="my-transition" />)

    expect(getByText("A").parentElement).toHaveAttribute("data-transition-id", "my-transition")
  })

  test("mounts without initial classes when preventing transition", async () => {
    // Force useLayoutEffect to no-op to test the mount-only behavior, without side effects.
    // This is necessary to prove that the test suite isn't lying about the state of the DOM
    // that is immediately rendered on the page.
    const effectSpy = vi.spyOn(React, "useEffect").mockImplementation(() => {})

    const { getByText } = render(<StrictTestGroup childKey="A" />)

    // Initial DOM is rendered without state attributes
    expect(getByText("A").parentElement).not.toHaveAttribute("data-entering")
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
    // Force useLayoutEffect to no-op to test the mount-only behavior, without side effects.
    // This is necessary to prove that the test suite isn't lying about the state of the DOM
    // that is immediately rendered on the page.
    const effectSpy = vi.spyOn(React, "useEffect").mockImplementation(() => {})

    const { getByText } = render(<StrictTestGroup childKey="A" preventInitialTransition={false} />)

    // Initial DOM is rendered without state attributes
    expect(getByText("A").parentElement).toHaveAttribute("data-entering")
    effectSpy.mockRestore()
  })

  test("can transition between children", async () => {
    const { rerender, getByText, queryByText } = render(<StrictTestGroup childKey="A" />)

    // Initial child rendered
    expect(getByText("A")).toBeInTheDocument()

    // Render a new child
    rerender(<StrictTestGroup childKey="B" />)

    expect(getByText("A").parentElement).toHaveAttribute("data-exiting")
    expect(getByText("B").parentElement).toHaveAttribute("data-entering")

    // Animation becomes active
    await waitFor(() => {
      expect(getByText("A").parentElement).toHaveAttribute("data-exiting-active")
      expect(getByText("B").parentElement).toHaveAttribute("data-entering-active")
    })

    // Animation completes
    await waitFor(() => {
      expect(queryByText("A")).not.toBeInTheDocument()
      expect(getByText("B").parentElement).toBeInTheDocument()
      expect(getByText("B").parentElement).not.toHaveAttribute("data-entering")
      expect(getByText("B").parentElement).not.toHaveAttribute("data-entering-active")
    })
  })

  retryTest(5, "can interrupt child transitions", async () => {
    const controls = render(<StrictTestGroup childKey="A" />)
    const { rerender, getByText, queryByText, unmount } = controls

    expect(getByText("A")).toBeInTheDocument()

    // Render a new child
    rerender(<StrictTestGroup childKey="B" />)

    // Animation staged
    expect(getByText("A").parentElement).toHaveAttribute("data-exiting")
    expect(getByText("B").parentElement).toHaveAttribute("data-entering")
    // Interrupted state is not present because animation was not in-flight
    expect(getByText("A").parentElement).not.toHaveAttribute("data-interrupted")
    expect(getByText("B").parentElement).not.toHaveAttribute("data-interrupted")

    // Animations active
    await waitFor(() => {
      expect(getByText("A").parentElement).toHaveAttribute("data-exiting-active")
      expect(getByText("B").parentElement).toHaveAttribute("data-entering-active")
    })

    // Switch child back before animation completes
    rerender(<StrictTestGroup childKey="A" />)

    expect(getByText("A").parentElement).toHaveAttribute("data-entering")
    expect(getByText("B").parentElement).toHaveAttribute("data-exiting")
    // Both animations are considered interrupted!
    expect(getByText("A").parentElement).toHaveAttribute("data-interrupted")
    expect(getByText("B").parentElement).toHaveAttribute("data-interrupted")

    await waitFor(() => {
      expect(getByText("A").parentElement).toHaveAttribute("data-entering-active")
      expect(getByText("B").parentElement).toHaveAttribute("data-exiting-active")
      // Interrupted state is not applied during active animation
      expect(getByText("A").parentElement).not.toHaveAttribute("data-interrupted")
      expect(getByText("B").parentElement).not.toHaveAttribute("data-interrupted")
    })

    // Interrupt removal and bring both back
    rerender(<StrictTestGroup childKey={["A", "B"]} />)

    expect(getByText("A").parentElement).toHaveAttribute("data-entering")
    expect(getByText("A").parentElement).not.toHaveAttribute("data-interrupted")
    expect(getByText("B").parentElement).toHaveAttribute("data-entering")
    expect(getByText("B").parentElement).toHaveAttribute("data-interrupted")

    await waitFor(() => {
      expect(getByText("A").parentElement).toHaveAttribute("data-entering-active")
      expect(getByText("A").parentElement).not.toHaveAttribute("data-interrupted")
      expect(getByText("B").parentElement).toHaveAttribute("data-entering-active")
      expect(getByText("B").parentElement).not.toHaveAttribute("data-interrupted")
    })

    // Interrupt both and remove them
    rerender(<StrictTestGroup childKey={[]} />)

    expect(getByText("A").parentElement).toHaveAttribute("data-exiting")
    expect(getByText("A").parentElement).toHaveAttribute("data-interrupted")
    expect(getByText("B").parentElement).toHaveAttribute("data-exiting")
    expect(getByText("B").parentElement).toHaveAttribute("data-interrupted")

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

    expect(getByText("A").parentElement).not.toHaveAttribute("data-entering")

    rerender(
      <StrictTestGroup
        childKey="A"
        enterDuration={1000}
        exitDuration={1000}
        preventInitialTransition={false}
      />,
    )

    expect(getByText("A").parentElement).not.toHaveAttribute("data-entering")

    // Ensure it didn't trigger a moment later
    await waitFor(() => {
      expect(getByText("A").parentElement).not.toHaveAttribute("data-entering")
    })
  })

  test("does not trigger redundant in-flight transitions", async () => {
    const { rerender, getByText, queryByText } = render(<StrictTestGroup childKey="A" />)

    expect(getByText("A")).toBeInTheDocument()

    rerender(<StrictTestGroup childKey="B" />)

    expect(getByText("A").parentElement).toHaveAttribute("data-exiting")
    expect(getByText("B").parentElement).toHaveAttribute("data-entering")

    await waitFor(() => {
      expect(getByText("A").parentElement).toHaveAttribute("data-exiting-active")
      expect(getByText("B").parentElement).toHaveAttribute("data-entering-active")
    })

    // Re-render identical component
    rerender(<StrictTestGroup childKey="B" />)

    await waitFor(() => {
      expect(queryByText("A")).not.toBeInTheDocument()
      expect(getByText("B").parentElement).not.toHaveAttribute("data-entering")
      expect(getByText("B").parentElement).not.toHaveAttribute("data-entering-active")
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
    expect(getByText("A").parentElement).toHaveAttribute("data-entering")
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
    expect(getByText("A").parentElement).toHaveAttribute("data-entering")

    await waitFor(() => {
      expect(getByText("A").parentElement).toHaveAttribute("data-entering-active")
    })

    await waitFor(() => {
      expect(getByText("A").parentElement).not.toHaveAttribute("data-entering")
      expect(getByText("A").parentElement).not.toHaveAttribute("data-entering-active")
    })
  })

  test("does not attempt renders on children after unmount", async () => {
    const { container, rerender, getByText } = render(<StrictTestGroup childKey={null} />)

    rerender(<StrictTestGroup childKey="A" />)

    expect(getByText("A").parentElement).toHaveAttribute("data-entering")

    await waitFor(() => {
      expect(getByText("A").parentElement).toHaveAttribute("data-entering-active")
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

      const { rerender } = render(
        <TransitionGroup ref={testRef}>
          <span key="A">A</span>
        </TransitionGroup>,
      )

      await waitFor(() => {
        const element = testRef.current as HTMLElement
        expect(element).not.toBeNull()
        // Ref is of the container, which defaults to a <span>
        expect(element.nodeName).toBe("SPAN")
        expect(element.textContent).toBe("A")
      })

      rerender(
        <TransitionGroup as="div" ref={testRef}>
          <span key="B">B</span>
        </TransitionGroup>,
      )

      await waitFor(() => {
        const element = testRef.current as HTMLElement
        expect(element).not.toBeNull()
        // `as` should work and be transferred to ref
        expect(element.nodeName).toBe("DIV")
        expect(element.textContent).toBe("B")
      })
    })

    test("throws when attempting to forwardRef to multiple children", async () => {
      const testRef = React.createRef<HTMLElement>()

      expect(() => {
        render(
          <TransitionGroup ref={testRef}>
            <span key="A">A</span>
            <span key="B">B</span>
          </TransitionGroup>,
        )
      }).toThrowError("Cannot use forwardRef with multiple children in <TransitionGroup />")
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
        render(<TransitionGroup disableAnimations>{null}</TransitionGroup>)
      }).not.toThrowError()
    })

    test("does not animate between children", () => {
      const { rerender, getByText, queryByText } = render(
        <StrictTestGroup childKey="A" disableAnimations className="ExampleAClass" />,
      )

      expect(getByText("A")).toBeInTheDocument()

      // Ensure the wrapper container exists, and DOM structure is as expected
      expect(getByText("A").parentElement).toHaveClass("ExampleAClass")
      expect(getByText("A").parentElement?.parentElement).toHaveClass("TestWrapper")

      rerender(<StrictTestGroup childKey="B" disableAnimations className="ExampleBClass" />)

      // Children are immediately updated
      expect(queryByText("A")).not.toBeInTheDocument()

      // Wrapper is updated as expected
      expect(getByText("B")).toBeInTheDocument()
      expect(getByText("B").parentElement).toHaveClass("ExampleBClass")
    })

    test("can forward refs", async () => {
      const testRef = React.createRef<HTMLElement | null>()

      const { rerender } = render(
        <TransitionGroup disableAnimations ref={testRef}>
          <span key="A">A</span>
        </TransitionGroup>,
      )

      await waitFor(() => {
        const element = testRef.current
        // Ref is of the container, which defaults to a <div>
        expect(element!.nodeName).toBe("SPAN")
        expect(element!.textContent).toBe("A")
      })

      rerender(
        <TransitionGroup as="div" disableAnimations ref={testRef}>
          <span key="B">B</span>
        </TransitionGroup>,
      )

      await waitFor(() => {
        const element = testRef.current
        // `as` should work and be transferred to ref
        expect(element!.nodeName).toBe("DIV")
        expect(element!.textContent).toBe("B")
      })
    })

    test("passes style and transitionId to wrappers", () => {
      const { getByText } = render(
        <StrictTestGroup
          childKey="A"
          disableAnimations
          transitionId="tid-123"
          style={{ padding: "11px" }}
        />,
      )

      const wrapper = getByText("A").parentElement as HTMLElement
      expect(wrapper).toHaveAttribute("data-transition-id", "tid-123")
      expect(wrapper.style.padding).toBe("11px")
    })
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
        <TransitionGroup
          enterDuration={100}
          exitDuration={100}
          preventInitialTransition={false}
          {...callbacks}
        >
          {null}
        </TransitionGroup>,
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

      const A = getByText("A").parentElement
      const B = getByText("B").parentElement

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

      // Render another child, but *not* passing callbacks, updating them to undefined
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
    // or business logic behaviors with <TransitionGroup> callbacks.
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
