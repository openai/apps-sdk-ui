import { act, fireEvent, render } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { Slider } from "./Slider"

describe("Slider signed input", () => {
  afterEach(() => vi.useRealTimers())

  it.each([
    ["-5", -5],
    ["-2.5", -2.5],
    ["5", 5],
    ["2.5", 2.5],
  ])("preserves the value typed as %s", (text, expected) => {
    vi.useFakeTimers()
    const onChange = vi.fn()
    const { getByRole } = render(
      <Slider min={-10} max={10} step={0.1} value={0} onChange={onChange} />,
    )
    const input = getByRole("textbox")

    fireEvent.change(input, { target: { value: text } })
    act(() => vi.advanceTimersByTime(250))

    expect(input).toHaveValue(text)
    expect(onChange).toHaveBeenLastCalledWith(expected)
  })

  it.each(["-", "-."])("allows incomplete signed input %s without emitting a value", (text) => {
    vi.useFakeTimers()
    const onChange = vi.fn()
    const { getByRole } = render(
      <Slider min={-10} max={10} step={0.1} value={3} onChange={onChange} />,
    )
    const input = getByRole("textbox")

    fireEvent.change(input, { target: { value: text } })
    act(() => vi.advanceTimersByTime(250))

    expect(input).toHaveValue(text)
    expect(onChange).not.toHaveBeenCalled()

    fireEvent.blur(input)
    expect(input).toHaveValue("0.0")
    expect(onChange).toHaveBeenLastCalledWith(0)
  })

  it("clamps a negative value to the supported range", () => {
    vi.useFakeTimers()
    const onChange = vi.fn()
    const { getByRole } = render(
      <Slider min={-10} max={10} step={1} value={0} onChange={onChange} />,
    )
    const input = getByRole("textbox")

    fireEvent.change(input, { target: { value: "-20" } })
    act(() => vi.advanceTimersByTime(250))
    expect(onChange).toHaveBeenLastCalledWith(-10)

    fireEvent.blur(input)
    expect(input).toHaveValue("-10")
  })
})
