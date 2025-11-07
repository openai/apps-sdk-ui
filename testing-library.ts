import * as matchers from "@testing-library/jest-dom/matchers"
import { cleanup } from "@testing-library/react"
import { afterEach, expect } from "vitest"

expect.extend(matchers)

// Optional: cleans up `render` after each test
afterEach(() => {
  cleanup()
})
