export const createId = <T extends string = string>(prefix: string, maxLength: number = 21): T =>
  `${prefix}_${Math.random().toString(36).slice(2, 10)}`.slice(0, maxLength) as T
