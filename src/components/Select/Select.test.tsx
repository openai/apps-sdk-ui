import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Select } from "./Select"

const options = [{ value: "one", label: "One" }]

describe("Select form participation", () => {
  it.each([false, true])("matches the native input disabled state: %s", (disabled) => {
    const { container } = render(
      <form>
        <Select
          name="choice"
          value="one"
          options={options}
          onChange={vi.fn()}
          disabled={disabled}
        />
      </form>,
    )
    const input = container.querySelector("input")!
    const form = container.querySelector("form")!

    expect(input.disabled).toBe(disabled)
    expect(new FormData(form).get("choice")).toBe(disabled ? null : "one")
  })

  it.each(["name", "id"])("does not validate a disabled required input with %s", (attribute) => {
    const { container } = render(
      <form>
        <Select
          {...{ [attribute]: "choice" }}
          value=""
          options={options}
          onChange={vi.fn()}
          required
          disabled
        />
      </form>,
    )

    expect(container.querySelector("input")!.willValidate).toBe(false)
    expect(container.querySelector("form")!.checkValidity()).toBe(true)
  })

  it("still validates an enabled required input", () => {
    const { container } = render(
      <form>
        <Select name="choice" value="" options={options} onChange={vi.fn()} required />
      </form>,
    )

    expect(container.querySelector("input")!.willValidate).toBe(true)
    expect(container.querySelector("form")!.checkValidity()).toBe(false)
  })

  it("updates form participation when disabled changes", () => {
    const onChange = vi.fn()
    const field = (disabled: boolean) => (
      <form>
        <Select
          name="choice"
          value="one"
          options={options}
          onChange={onChange}
          disabled={disabled}
        />
      </form>
    )
    const { container, rerender } = render(field(false))
    const form = container.querySelector("form")!

    expect(new FormData(form).get("choice")).toBe("one")
    rerender(field(true))
    expect(new FormData(form).has("choice")).toBe(false)
    rerender(field(false))
    expect(new FormData(form).get("choice")).toBe("one")
    expect(onChange).not.toHaveBeenCalled()
  })

  it("also disables the multi-select form input", () => {
    const { container } = render(
      <form>
        <Select
          multiple
          name="choice"
          value={["one"]}
          options={options}
          onChange={vi.fn()}
          disabled
        />
      </form>,
    )

    expect(container.querySelector("input")!.disabled).toBe(true)
    expect(new FormData(container.querySelector("form")!).has("choice")).toBe(false)
  })
})
