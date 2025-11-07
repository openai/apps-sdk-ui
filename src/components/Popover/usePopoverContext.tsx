import { createContext, use, type RefObject } from "react"

export type PopoverContextValue = {
  open: boolean
  setOpen: (next: boolean) => void
  shake: boolean
  setShake: (next: boolean) => void
  showOnHover: boolean
  temporarilyPreventClickToClose: boolean
  onTriggerEnter: () => void
  onTriggerLeave: () => void
  hoverOpenFocusedWithTab: RefObject<boolean>
  isPointerInTransitRef: RefObject<boolean>
  triggerRef: RefObject<HTMLButtonElement | null>
  contentRef: RefObject<HTMLDivElement | null>
}

export const PopoverContext = createContext<PopoverContextValue | null>(null)

export const usePopoverContext = () => {
  const context = use(PopoverContext)

  if (!context) {
    throw new Error("Popover components must be wrapped in <Popover />")
  }

  return context
}
