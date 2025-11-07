export async function executeWithRetries<T>(
  maxRetries: number,
  fn: () => Promise<T> | T,
  onAttemptFailure?: (attempt: number, error: unknown) => Promise<void> | void,
): Promise<T> {
  let lastError: unknown
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (onAttemptFailure) await onAttemptFailure(attempt, err)
      if (attempt === maxRetries) {
        throw lastError
      }
    }
  }
  // Should be unreachable, but type-safe fallback
  throw lastError
}
