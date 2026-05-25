import { fireEvent, render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Slider } from "./"

describe("Slider", () => {
  it("strips every non-numeric character from the value input", () => {
    const onChange = vi.fn()
    const { container } = render(
      <Slider value={10} min={0} max={100} step={1} onChange={onChange} />,
    )

    const input = container.querySelector<HTMLInputElement>('input[type="text"]')
    expect(input).not.toBeNull()

    // A value with non-numeric characters interspersed throughout, e.g. from a paste.
    fireEvent.change(input!, { target: { value: "1a2b3" } })

    // All non-digit/dot characters should be removed, not just the first one.
    expect(input!.value).toBe("123")
  })
})
