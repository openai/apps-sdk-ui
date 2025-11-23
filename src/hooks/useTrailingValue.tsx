import { useEffect, useRef, useState } from "react"
import { useLatestValue } from "./useLatestValue"

/**
 * Returns a version of `value` that updates to the latest `value` after `delay`
 * milliseconds. Useful for holding on to a previous value for a short time
 * after it changes (e.g. for coordinating animations).
 */
export function useTrailingValue<T>(value: T, delay: number): T {
  const [trailing, setTrailing] = useState(value)
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])
  const currentDelay = useLatestValue(delay)

  // clear up any unsettled timeouts on unmount
  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout)
      timeouts.current.length = 0
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setTrailing(value)
      timeouts.current = timeouts.current.filter((t) => t !== timer)
    }, currentDelay.current)

    timeouts.current.push(timer)
  }, [value, currentDelay])

  return trailing
}
