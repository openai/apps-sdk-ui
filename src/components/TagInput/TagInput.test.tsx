import { fireEvent, render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { TagInput } from "./TagInput"

vi.mock("../Icon", () => ({ X: () => <svg /> }))

const paste = (input: HTMLElement, text: string) =>
  fireEvent.paste(input, { clipboardData: { getData: () => text } })

describe("TagInput paste", () => {
  it("retains every pasted tag and the existing tags", () => {
    const onChange = vi.fn()
    const { getByRole, container } = render(
      <TagInput defaultValue={[{ value: "existing", valid: true }]} onChange={onChange} />,
    )
    paste(getByRole("textbox"), "first,second third")
    expect(
      Array.from(container.querySelectorAll("[data-tag]"), (tag) => tag.getAttribute("data-tag")),
    ).toEqual(["existing", "first", "second", "third"])
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it("reports one complete update for controlled inputs", () => {
    const onChange = vi.fn()
    const { getByRole } = render(<TagInput value={[]} onChange={onChange} />)
    paste(getByRole("textbox"), "first,second")
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith([
      { value: "first", valid: true },
      { value: "second", valid: true },
    ])
  })

  it("deduplicates pasted tags and respects the remaining capacity", () => {
    const onChange = vi.fn()
    const { getByRole } = render(
      <TagInput
        defaultValue={[{ value: "existing", valid: true }]}
        maxTags={3}
        onChange={onChange}
      />,
    )
    paste(getByRole("textbox"), "existing,first,first,second,third")
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith([
      { value: "existing", valid: true },
      { value: "first", valid: true },
      { value: "second", valid: true },
    ])
  })

  it("validates each pasted tag", () => {
    const onChange = vi.fn()
    const { getByRole } = render(
      <TagInput validator={(value) => value === "valid"} onChange={onChange} />,
    )
    paste(getByRole("textbox"), "valid,invalid")
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith([
      { value: "valid", valid: true },
      { value: "invalid", valid: false },
    ])
  })
})
