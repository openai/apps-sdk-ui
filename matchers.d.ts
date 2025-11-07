/* eslint-disable */
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers"
import type { ExpectStatic } from "vitest"

declare module "vitest" {
  interface Assertion<T = any>
    extends TestingLibraryMatchers<ExpectStatic["stringContaining"], T> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
