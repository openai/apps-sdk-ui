import { renderToString } from "react-dom/server"
import { afterEach, expect, it, vi } from "vitest"

afterEach(() => {
  vi.unstubAllGlobals()
  vi.resetModules()
})

it("renders without browser globals and does not cache server fallbacks", async () => {
  vi.resetModules()
  vi.stubGlobal("window", undefined)
  vi.stubGlobal("document", undefined)
  vi.stubGlobal("getComputedStyle", undefined)
  const { useBreakpoint, cache } = await import("./useBreakpoints")
  function Component() {
    return <span>{String(useBreakpoint("md"))}</span>
  }
  expect(renderToString(<Component />)).toBe("<span>false</span>")
  expect(cache.size).toBe(0)
})

it("still resolves custom browser CSS breakpoints", async () => {
  vi.resetModules()
  const getPropertyValue = vi.fn(() => "900px")
  vi.stubGlobal(
    "getComputedStyle",
    vi.fn(() => ({ getPropertyValue })),
  )
  const { useBreakpoint, cache } = await import("./useBreakpoints")
  function Component() {
    return <span>{String(useBreakpoint("md"))}</span>
  }
  renderToString(<Component />)
  expect(getPropertyValue).toHaveBeenCalledWith("--breakpoint-md")
  expect(cache.get("md")).toBe(900)
})
