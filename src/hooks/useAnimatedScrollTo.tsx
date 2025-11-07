import { useCallback, useEffect, useRef } from "react"
import { prefersReducedMotion } from "../lib/helpers"

const clamp0 = (n: number) => Math.max(0, n)

export const useAnimatedScrollTo = (scrollRef: React.RefObject<HTMLDivElement | null>) => {
  const rafIdRef = useRef<number | null>(null)
  const listenerCleanup = useRef<(() => void) | null>(null)
  const isAnimatingRef = useRef(false)
  const userInterruptedRef = useRef(false)

  const addInteractionListeners = useCallback((container: HTMLDivElement) => {
    const handleInteract = () => {
      userInterruptedRef.current = true
    }

    container.addEventListener("wheel", handleInteract, { passive: true })
    container.addEventListener("touchstart", handleInteract, { passive: true })
    container.addEventListener("touchmove", handleInteract, { passive: true })

    listenerCleanup.current = () => {
      container.removeEventListener("wheel", handleInteract)
      container.removeEventListener("touchstart", handleInteract)
      container.removeEventListener("touchmove", handleInteract)
      listenerCleanup.current = null
    }
  }, [])

  const cancelAnimation = useCallback(() => {
    rafIdRef.current && cancelAnimationFrame(rafIdRef.current)
    isAnimatingRef.current = false
    userInterruptedRef.current = false
    listenerCleanup.current?.()
  }, [])

  useEffect(() => {
    return () => cancelAnimation()
  }, [cancelAnimation])

  const scrollTo = useCallback(
    (targetScrollTop: number) => {
      const container = scrollRef.current
      if (!container) {
        return
      }

      // Skip animation for reduced motion users
      if (prefersReducedMotion()) {
        container.scrollTop = targetScrollTop
        cancelAnimation()
        return
      }

      // If already animating, cancel current animation and restart
      if (isAnimatingRef.current) {
        cancelAnimation()
      }

      // Clamp boundaries
      const maxY = clamp0(container.scrollHeight - container.clientHeight)
      const targetY = clamp0(Math.min(targetScrollTop, maxY))
      let currentY = container.scrollTop

      isAnimatingRef.current = true
      userInterruptedRef.current = false
      addInteractionListeners(container)

      // Controls how quickly the scroll converges toward the target (per second).
      // Higher = snappier, lower = smoother and slower.
      const scrollResponsiveness = 11
      // Distance at which currentY will round to target, in pixels.
      const epsilonPx = 0.5
      let prevTime = performance.now()

      const step = (currentTime: number) => {
        const element = scrollRef.current

        if (!element || userInterruptedRef.current) {
          cancelAnimation()
          return
        }

        // Time elapsed since the last frame, in seconds (clamped to 60ms).
        // Used to make the scroll animation frame-rate independent.
        const deltaSeconds = clamp0(Math.min(0.06, (currentTime - prevTime) / 1000))
        prevTime = currentTime
        // Fraction of remaining distance to cover this frame,
        // based on exponential convergence toward the target scroll position.
        // Behaves like an ease-out: fast initially, then smoothly slows as it nears the target.
        const alpha = 1 - Math.exp(-scrollResponsiveness * deltaSeconds)
        const diffY = targetY - currentY
        const nextY = currentY + diffY * alpha
        currentY = clamp0(Math.min(nextY, maxY))

        element.scrollTop = currentY

        // Check remaining distance for rounding completion
        const remaining = Math.abs(targetY - currentY)
        if (remaining <= epsilonPx) {
          element.scrollTop = targetY
          cancelAnimation()
          return
        }

        rafIdRef.current = requestAnimationFrame(step)
      }

      rafIdRef.current = requestAnimationFrame(step)
    },
    [addInteractionListeners, cancelAnimation, scrollRef],
  )

  return scrollTo
}
