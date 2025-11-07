export const isDev = import.meta.env.DEV

export const isJSDomLike =
  (typeof navigator !== "undefined" && /(jsdom|happy-dom)/i.test(navigator.userAgent)) ||
  typeof (globalThis as unknown as Record<string, unknown>).happyDOM === "object"

export const isTest = import.meta.env.MODE === "test" || isJSDomLike
