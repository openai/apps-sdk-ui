declare global {
  function retryTest(maxRetries: number, name: string, fn: () => Promise<void> | void): void
}

export {}
