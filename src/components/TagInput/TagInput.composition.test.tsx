import { createEvent, fireEvent, render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { TagInput } from "./TagInput"

describe("TagInput composition", () => {
  it.each(["Enter", " ", ",", "Tab"])("leaves composing %s to the input method", (key) => {
    const onChange = vi.fn()
    const { getByRole, container } = render(<TagInput autoFocus onChange={onChange} />)
    const input = getByRole("textbox")
    fireEvent.compositionStart(input)
    fireEvent.change(input, { target: { value: "中文" } })
    const event = createEvent.keyDown(input, { key, isComposing: true })

    fireEvent(input, event)

    expect(event.defaultPrevented).toBe(false)
    expect(input).toHaveValue("中文")
    expect(input).toHaveFocus()
    expect(container.querySelectorAll("[data-tag]")).toHaveLength(0)
    expect(onChange).not.toHaveBeenCalled()
  })

  it.each(["ArrowLeft", "ArrowUp", "Backspace"])(
    "does not select a tag on composing %s at the start of the input",
    (key) => {
      const onChange = vi.fn()
      const { getByRole } = render(
        <TagInput
          autoFocus
          defaultValue={[{ value: "existing", valid: true }]}
          onChange={onChange}
        />,
      )
      const input = getByRole("textbox") as HTMLInputElement
      fireEvent.compositionStart(input)
      fireEvent.change(input, { target: { value: "中文" } })
      input.setSelectionRange(0, 0)
      const event = createEvent.keyDown(input, { key, isComposing: true })

      fireEvent(input, event)

      expect(event.defaultPrevented).toBe(false)
      expect(input).toHaveFocus()
      expect(input).toHaveValue("中文")
      expect(onChange).not.toHaveBeenCalled()
    },
  )

  it.each(["Enter", " ", ",", "Tab"])("still submits on ordinary %s", (key) => {
    const onChange = vi.fn()
    const { getByRole, getByText } = render(<TagInput autoFocus onChange={onChange} />)
    const input = getByRole("textbox")
    fireEvent.change(input, { target: { value: "new" } })

    fireEvent.keyDown(input, { key })

    expect(getByText("new").closest("[data-tag]")).toBeInTheDocument()
    expect(input).toHaveValue("")
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith([{ value: "new", valid: true }])
  })

  it("submits normally after composition ends", () => {
    const onChange = vi.fn()
    const { getByRole, getByText } = render(<TagInput autoFocus onChange={onChange} />)
    const input = getByRole("textbox")
    fireEvent.compositionStart(input)
    fireEvent.change(input, { target: { value: "中文" } })
    fireEvent.keyDown(input, { key: "Enter", isComposing: true })
    fireEvent.compositionEnd(input, { data: "中文" })

    expect(onChange).not.toHaveBeenCalled()
    fireEvent.keyDown(input, { key: "Enter", isComposing: false })

    expect(getByText("中文").closest("[data-tag]")).toBeInTheDocument()
    expect(input).toHaveValue("")
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith([{ value: "中文", valid: true }])
  })

  it.each(["ArrowLeft", "ArrowUp", "Backspace"])("still selects a tag on ordinary %s", (key) => {
    const { getByRole, getByText } = render(
      <TagInput autoFocus defaultValue={[{ value: "existing", valid: true }]} />,
    )

    fireEvent.keyDown(getByRole("textbox"), { key })

    expect(getByText("existing").closest("[data-tag]")).toHaveFocus()
  })
})
