import { act, cleanup, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, expect, it, vi } from "vitest"
import { clearTextSelection, useTextSelection } from "./useTextSelection"

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  cleanup()
  window.getSelection()?.removeAllRanges()
  vi.clearAllTimers()
  vi.useRealTimers()
  document.body.replaceChildren()
})

function selectText() {
  const element = document.createElement("span")
  element.textContent = "Selected text"
  document.body.appendChild(element)
  const range = document.createRange()
  range.selectNodeContents(element)
  const selection = window.getSelection()!
  selection.removeAllRanges()
  selection.addRange(range)
  return selection
}

function notifySelectionChange() {
  act(() => {
    document.dispatchEvent(new Event("selectionchange"))
    vi.runOnlyPendingTimers()
  })
}

it("notifies selection changes without a mouse event", () => {
  const callback = vi.fn()
  renderHook(() => useTextSelection(true, callback))
  const selection = selectText()
  notifySelectionChange()
  expect(callback).toHaveBeenCalledWith(selection)
})

it("notifies when the selection is cleared programmatically", () => {
  const callback = vi.fn()
  renderHook(() => useTextSelection(true, callback))
  selectText()
  notifySelectionChange()
  callback.mockClear()
  clearTextSelection()
  notifySelectionChange()
  expect(callback).toHaveBeenCalledWith(null)
})

it("stops notifying when listening is disabled or the hook unmounts", () => {
  const callback = vi.fn()
  const { rerender, unmount } = renderHook(
    ({ listening }) => useTextSelection(listening, callback),
    { initialProps: { listening: true } },
  )
  rerender({ listening: false })
  selectText()
  notifySelectionChange()
  expect(callback).not.toHaveBeenCalled()
  rerender({ listening: true })
  notifySelectionChange()
  expect(callback).toHaveBeenCalled()
  callback.mockClear()
  unmount()
  notifySelectionChange()
  expect(callback).not.toHaveBeenCalled()
})
