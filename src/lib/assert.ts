export function assertIs<T>(a: unknown, b: T): asserts a is T {
  if (a !== b) {
    throw new Error(`Expected ${a} to be ${b}`)
  }
}
