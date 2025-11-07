import { useCallback } from "react"
import { flushSync } from "react-dom"
import { waitForAnimationFrame } from "../../lib/helpers"
import { usePopoverContext } from "./usePopoverContext"

export const usePopoverClose = () => {
  const { setOpen } = usePopoverContext()
  return useCallback(() => setOpen(false), [setOpen])
}

export const usePopoverShake = () => {
  const { setShake } = usePopoverContext()
  return useCallback(() => {
    // Sequence: (1) ensure shake is cleared, then (2) set on the next tick
    flushSync(() => {
      setShake(false)
    })
    waitForAnimationFrame(() => setShake(true))
  }, [setShake])
}

export const usePopoverController = (): {
  /** Plays a short shake animation on the modal. */
  shake: () => void
  /** Imperatively closes the modal. */
  close: () => void
} => {
  const shake = usePopoverShake()
  const close = usePopoverClose()
  return { close, shake }
}
