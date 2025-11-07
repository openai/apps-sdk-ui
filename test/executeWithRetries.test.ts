import { describe, expect, test } from "vitest"
import { executeWithRetries } from "./utils/executeWithRetries"

describe("executeWithRetries", () => {
  test("succeeds on first attempt and calls fn once", async () => {
    let calls = 0
    const result = await executeWithRetries(5, () => {
      calls += 1
      return 42
    })
    expect(result).toBe(42)
    expect(calls).toBe(1)
  })

  test("succeeds on Nth attempt (async)", async () => {
    let calls = 0
    const result = await executeWithRetries(5, async () => {
      calls += 1
      if (calls < 3) throw new Error("fail")
      return "ok"
    })
    expect(result).toBe("ok")
    expect(calls).toBe(3)
  })

  test("throws after max retries and calls fn max times", async () => {
    let calls = 0
    let failures = 0
    await expect(
      executeWithRetries(
        3,
        () => {
          calls += 1
          throw new Error("always fail")
        },
        () => {
          failures += 1
        },
      ),
    ).rejects.toThrow("always fail")
    expect(calls).toBe(3)
    expect(failures).toBe(3)
  })
})
