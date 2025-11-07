import { cleanup } from "@testing-library/react"
import { test } from "vitest"
import { executeWithRetries } from "./utils/executeWithRetries"

function globalRetryTest(maxRetries: number, name: string, fn: () => Promise<void> | void) {
  test(name, async () => {
    await executeWithRetries(
      maxRetries,
      async () => {
        await fn()
      },
      async () => {
        // Ensure DOM is cleared between attempts
        cleanup()
      },
    )
  })
}

type GlobalThis = typeof globalThis
type GlobalThisWithRetryTest = GlobalThis & {
  retryTest: typeof globalRetryTest
}

const g = globalThis as GlobalThisWithRetryTest
g.retryTest = globalRetryTest
