import { useCallback, useRef } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any

export function useStableCallback<T extends AnyFunction>(callback: T): T {
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  return useCallback((...args: Parameters<T>) => callbackRef.current(...args), []) as T
}
