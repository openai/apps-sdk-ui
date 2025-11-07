import { useEffect, useRef, useState } from "react"

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  return isMounted
}

// Some components may want a ref instead of a state
// (for example, if they're checking isMounted in an async useEffect)
export function useIsMountedRef() {
  const isMountedRef = useRef<boolean>(undefined)
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])
  return isMountedRef
}
