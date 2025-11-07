export type Pretty<T extends Record<string, unknown>> = {} & { [K in keyof T]: T[K] }

declare const brand: unique symbol
export type Brand<T, B> = T & { [brand]: B }
