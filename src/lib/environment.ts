const META_ENV = typeof import.meta !== "undefined" ? import.meta.env : undefined

const NODE_ENV =
  typeof process !== "undefined" && process.env?.NODE_ENV ? process.env?.NODE_ENV : "production"

export const isDev = NODE_ENV === "development" || !!META_ENV?.DEV

export const isJSDomLike =
  (typeof navigator !== "undefined" && /(jsdom|happy-dom)/i.test(navigator.userAgent)) ||
  typeof (globalThis as Record<string, unknown>).happyDOM === "object"

export const isTest = NODE_ENV === "test" || META_ENV?.MODE === "test" || isJSDomLike

export const hasWindow = typeof window !== "undefined"
export const hasDocument = typeof document !== "undefined"
export const canUseDOM = hasWindow && hasDocument
