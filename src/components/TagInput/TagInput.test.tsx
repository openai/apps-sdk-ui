import { fireEvent, render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { TagInput } from "./TagInput"

const literalValues = [
  'double"quote',
  String.raw`C:\temp\report`,
  "trailing\\",
  "plain-tag",
  "中文 🚀",
]

describe("TagInput focus", () => {
  it.each(literalValues)("focuses the clicked tag with value %s", (value) => {
    const onChange = vi.fn()
    const { getByText } = render(
      <TagInput defaultValue={[{ value, valid: true }]} onChange={onChange} />,
    )
    const tag = getByText(value).closest("[data-tag]")!

    fireEvent.mouseDown(tag)
    fireEvent.click(tag)

    expect(tag).toHaveFocus()
    expect(tag).toHaveAttribute("data-tag", value)
    expect(onChange).not.toHaveBeenCalled()
  })

  it.each(literalValues)("navigates to and from the tag with value %s", (value) => {
    const { getByRole, getByText } = render(
      <TagInput
        autoFocus
        defaultValue={[
          { value: "first", valid: true },
          { value, valid: true },
        ]}
      />,
    )
    const input = getByRole("textbox")
    const tag = getByText(value).closest("[data-tag]")!
    const first = getByText("first").closest("[data-tag]")!

    expect(input).toHaveFocus()
    fireEvent.keyDown(input, { key: "ArrowLeft" })
    expect(tag).toHaveFocus()
    fireEvent.keyDown(tag, { key: "ArrowLeft" })
    expect(first).toHaveFocus()
    fireEvent.keyDown(first, { key: "ArrowRight" })
    expect(tag).toHaveFocus()
    fireEvent.keyDown(tag, { key: "ArrowRight" })
    expect(input).toHaveFocus()
  })

  it.each(literalValues)("selects then removes the tag with value %s using Backspace", (value) => {
    const onChange = vi.fn()
    const { getByRole, getByText, queryByText } = render(
      <TagInput
        autoFocus
        defaultValue={[
          { value: "first", valid: true },
          { value, valid: true },
        ]}
        onChange={onChange}
      />,
    )
    const input = getByRole("textbox")
    const tag = getByText(value).closest("[data-tag]")!

    fireEvent.keyDown(input, { key: "Backspace" })
    expect(tag).toHaveFocus()
    expect(onChange).not.toHaveBeenCalled()
    fireEvent.keyDown(tag, { key: "Backspace" })

    expect(queryByText(value)).not.toBeInTheDocument()
    expect(onChange).toHaveBeenCalledWith([{ value: "first", valid: true }])
    expect(input).toHaveFocus()
  })

  it("focuses a controlled tag when the input is hidden at maxTags", () => {
    const value = 'quoted"path\\'
    const onChange = vi.fn()
    const { getByText, queryByRole } = render(
      <TagInput value={[{ value, valid: true }]} maxTags={1} onChange={onChange} />,
    )
    const tag = getByText(value).closest("[data-tag]")!

    expect(queryByRole("textbox")).not.toBeInTheDocument()
    fireEvent.mouseDown(tag)
    fireEvent.click(tag)

    expect(tag).toHaveFocus()
    expect(onChange).not.toHaveBeenCalled()
  })
})
