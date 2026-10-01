import { DateTime } from "luxon"
import { describe, expect, it } from "vitest"
import { chunkIntoWeeks, getDaysOfMonth } from "./dateUtils"

describe("chunkIntoWeeks", () => {
  const days = getDaysOfMonth(DateTime.local(2024, 2, 1))

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejects invalid chunk size %s",
    (size) => {
      expect(() => chunkIntoWeeks(days, size)).toThrow(RangeError)
      expect(() => chunkIntoWeeks([], size)).toThrow(RangeError)
    },
  )

  it("preserves the days and partial final week with the default size", () => {
    const weeks = chunkIntoWeeks(days)
    expect(weeks.map((week) => week.length)).toEqual([7, 7, 7, 7, 1])
    expect(weeks.flat()).toEqual(days)
  })

  it("supports custom positive sizes and empty input", () => {
    expect(chunkIntoWeeks(days, 10).map((week) => week.length)).toEqual([10, 10, 9])
    expect(chunkIntoWeeks(days, 1).flat()).toEqual(days)
    expect(chunkIntoWeeks([], 7)).toEqual([])
  })
})
