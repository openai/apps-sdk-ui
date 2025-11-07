import clsx from "clsx"
import { Popover as RadixPopover } from "radix-ui"
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type PointerEventHandler,
  type ReactNode,
} from "react"
import { useTimeout } from "usehooks-ts"
import { useEscCloseStack } from "../../hooks/useEscCloseStack"
import { useLatestValue } from "../../hooks/useLatestValue"
import { focusableElements, preventDefaultHandler, toCssVariables } from "../../lib/helpers"
import { TransitionGroup } from "../Transition"
import { createPointerIntentArea, isPointInPolygon, type Polygon } from "./pointerIntent"
import s from "./Popover.module.css"
import { PopoverContext, usePopoverContext, type PopoverContextValue } from "./usePopoverContext"

export type PopoverProps = {
  /** Sets controlled visibility state */
  open?: boolean
  /** Callback invoked when visibility state changes */
  onOpenChange?: (nextState: boolean) => void
  showOnHover?: boolean
  hoverOpenDelay?: number
  children: React.ReactNode
}

export const Popover = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  showOnHover = false,
  hoverOpenDelay = 150,
  children,
}: PopoverProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [shake, setShake] = useState<boolean>(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const openTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const hoverOpenFocusedWithTab = useRef<boolean>(false)
  const isPointerInTransitRef = useRef<boolean>(false)
  const isOpen = controlledOpen ?? open

  const [temporarilyPreventClickToClose, setTemporarilyPreventClickToClose] =
    useState<boolean>(false)
  useTimeout(
    () => setTemporarilyPreventClickToClose(false),
    temporarilyPreventClickToClose ? 500 : null,
  )

  const latestOpenChange = useLatestValue(controlledOnOpenChange)

  const handleOpenChangeImpl = useLatestValue((nextState: boolean) => {
    clearTimeout(openTimerRef.current)

    // No-op if the state is not changing
    if (isOpen === nextState) {
      return
    }

    if (!nextState) {
      // clear any running shake animation on close
      setShake(false)

      // Check for specific hover conditions where focus should be
      // immediately restored to the trigger before closing
      if (showOnHover && hoverOpenFocusedWithTab.current) {
        triggerRef.current?.focus()
      }

      // Always cleanup this state
      hoverOpenFocusedWithTab.current = false
    }

    latestOpenChange.current?.(nextState)
    setOpen(nextState)

    if (showOnHover) {
      setTemporarilyPreventClickToClose(nextState)
    }
  })

  const handleOpenChange = useCallback(
    (nextState: boolean) => {
      handleOpenChangeImpl.current(nextState)
    },
    [handleOpenChangeImpl],
  )

  const handleTriggerEnter = useCallback(() => {
    openTimerRef.current = setTimeout(() => handleOpenChange(true), hoverOpenDelay)
  }, [handleOpenChange, hoverOpenDelay])

  const handleTriggerLeave = useCallback(() => {
    clearTimeout(openTimerRef.current)
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current)
    }
  }, [])

  const store = useMemo<PopoverContextValue>(
    () => ({
      open: isOpen,
      setOpen: handleOpenChange,
      shake,
      setShake,
      showOnHover,
      temporarilyPreventClickToClose,
      onTriggerEnter: handleTriggerEnter,
      onTriggerLeave: handleTriggerLeave,
      isPointerInTransitRef,
      triggerRef,
      contentRef,
      hoverOpenFocusedWithTab,
    }),
    [
      isOpen,
      handleOpenChange,
      shake,
      setShake,
      showOnHover,
      temporarilyPreventClickToClose,
      hoverOpenFocusedWithTab,
      isPointerInTransitRef,
      handleTriggerEnter,
      handleTriggerLeave,
    ],
  )

  return (
    <PopoverContext value={store}>
      <RadixPopover.Root open={isOpen} onOpenChange={handleOpenChange} modal={false}>
        {children}
      </RadixPopover.Root>
    </PopoverContext>
  )
}

const Trigger = ({
  children,
  onPointerDown,
  onClick,
}: {
  children: React.ReactNode
  onPointerDown?: PointerEventHandler
  onClick?: MouseEventHandler
}) => {
  const {
    setOpen,
    showOnHover,
    temporarilyPreventClickToClose,
    onTriggerEnter,
    onTriggerLeave,
    isPointerInTransitRef,
    triggerRef,
    contentRef,
  } = usePopoverContext()
  const hasPointerMoveOpenedRef = useRef<boolean>(false)

  const maybePreventClickClose = (evt: React.MouseEvent) => {
    // Don't prevent temporary close if the trigger is an anchor tag itself
    const isLink = evt.currentTarget.nodeName.toLocaleLowerCase() === "a"

    if (!isLink && temporarilyPreventClickToClose) {
      // Prevents tooltip listeners from closing
      evt.preventDefault()
      evt.stopPropagation()
    }
  }

  const handlePointerMove = (evt: React.PointerEvent) => {
    if (evt.pointerType === "touch") {
      return
    }

    if (!hasPointerMoveOpenedRef.current && !isPointerInTransitRef.current) {
      onTriggerEnter()
      hasPointerMoveOpenedRef.current = true
    }
  }

  const handlePointerLeave = () => {
    if (!hasPointerMoveOpenedRef.current) {
      return
    }

    onTriggerLeave()
    hasPointerMoveOpenedRef.current = false
  }

  return (
    <RadixPopover.Trigger
      asChild
      ref={triggerRef}
      onPointerDown={(evt) => {
        maybePreventClickClose(evt)
        onPointerDown?.(evt)
      }}
      onClick={(evt) => {
        maybePreventClickClose(evt)
        onClick?.(evt)
      }}
      onPointerMove={showOnHover ? handlePointerMove : undefined}
      onPointerLeave={showOnHover ? handlePointerLeave : undefined}
      onFocus={showOnHover ? () => setOpen(true) : undefined}
      onBlur={
        showOnHover
          ? () => {
              setTimeout(() => {
                // Ignore this handler if focus has moved into the popover
                if (contentRef.current?.contains(document.activeElement)) {
                  return
                }

                setOpen(false)
              }, 50)
            }
          : undefined
      }
    >
      {children}
    </RadixPopover.Trigger>
  )
}

export type PopoverContentProps = {
  children: ReactNode
  /**
   * Whether to avoid collisions with vieport/scroll containersw.
   * @default true
   */
  avoidCollisions?: boolean
  /**
   * Set the `width` of the popover, in pixels.
   * @default auto
   */
  width?: number | "auto"
  /**
   * Set the `min-width` of the popover, in pixels.
   * @default 300
   */
  minWidth?: number | "auto"
  /**
   * Set the `max-width` of the popover, in pixels.
   */
  maxWidth?: number
  /**
   * Background style for the popover
   * @default default
   */
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
   * @default bottom
   */
  side?: RadixPopover.PopoverContentProps["side"]
  /**
   * The distance in pixels from the trigger.
   * @default 8
   */
  sideOffset?: RadixPopover.PopoverContentProps["sideOffset"]
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default center
   */
  align?: RadixPopover.PopoverContentProps["align"]
  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: RadixPopover.PopoverContentProps["alignOffset"]
  /**
   * Whether the popover surface should be translucent.
   * @default false
   */
  translucent?: boolean
  /** Additional class name to apply to the popover content, you usually don't want to set this, but ag-grid needs it to render a custom editor properly */
  className?: string
  /**
   * Auto focus the popover content when it is opened.
   * @default true
   */
  autoFocus?: boolean
}

const ContentImpl = ({
  children,
  avoidCollisions,
  width,
  minWidth,
  maxWidth,
  side,
  sideOffset = 8,
  align,
  alignOffset,
  translucent,
  className,
  autoFocus = true,
}: PopoverContentProps) => {
  const { showOnHover, shake, contentRef } = usePopoverContext()

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (evt) => {
    const contentElement = contentRef.current

    if (
      // When the current target is our container
      contentElement &&
      evt.target === contentElement &&
      // We know that shift key tabs will lead to closing the popover (because we don't use `modal`)
      evt.key === "Tab" &&
      evt.shiftKey
    ) {
      // Prevent that from happening
      evt.preventDefault()
      evt.stopPropagation()

      // Move focus to the last focusable element, placing the user in the focus loop
      const focusable = focusableElements(contentElement)
      const lastFocusable = focusable[focusable.length - 1]
      lastFocusable?.focus()
    }
  }

  // Important that we send initial focus into the popover, placing it onto the container.
  // This allows focus looping to begin, as well as capturing scoped key presses.
  // We prevent Radix's default behavior of focusing an element, because this can have adverse side-effects.
  useEffect(() => {
    const contentElement = contentRef.current

    if (!contentElement || !autoFocus) {
      return
    }

    // If we're already focused within the content area, no-op.
    // This would be true if some inner component declares autoFocus
    if (contentElement?.contains(document.activeElement)) {
      return
    }

    // Our focus isn't in the content area - move it there.
    // NOTE: Don't automatically shift focus on hover popovers
    if (!showOnHover) {
      contentElement.focus({ preventScroll: true })
    }
  }, [contentRef, showOnHover, autoFocus])

  return (
    <RadixPopover.Content
      forceMount
      ref={contentRef}
      className={clsx(s.Popover, className)}
      style={toCssVariables({
        "popover-width": width,
        "popover-min-width": minWidth,
        "popover-max-width": maxWidth,
      })}
      onCloseAutoFocus={showOnHover ? preventDefaultHandler : undefined}
      // data-surface={surface}
      data-animate={shake ? "shake" : undefined}
      data-translucent={translucent ? "true" : undefined}
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset ?? (align === "center" ? 0 : -5)}
      avoidCollisions={avoidCollisions ?? true}
      hideWhenDetached
      collisionPadding={20}
      onOpenAutoFocus={preventDefaultHandler}
      // Use custom esc listener because default Radix is bound to the document
      // and cannot have propagation stopped.
      onEscapeKeyDown={preventDefaultHandler}
      onKeyDown={handleKeyDown}
    >
      {children}
    </RadixPopover.Content>
  )
}

const ContentHoverable = (props: PopoverContentProps) => {
  const { setOpen, triggerRef, contentRef, isPointerInTransitRef, hoverOpenFocusedWithTab } =
    usePopoverContext()
  const [pointerGraceArea, setPointerGraceArea] = useState<Polygon | null>(null)

  const handleRemoveGraceArea = useCallback(() => {
    setPointerGraceArea(null)
    isPointerInTransitRef.current = false
  }, [isPointerInTransitRef])

  const handleCreateGraceArea = useCallback(
    (event: PointerEvent, hoverTarget: HTMLElement) => {
      const graceArea = createPointerIntentArea(event, hoverTarget)
      setPointerGraceArea(graceArea)
      isPointerInTransitRef.current = true
    },
    [isPointerInTransitRef],
  )

  useEffect(() => {
    return () => handleRemoveGraceArea()
  }, [handleRemoveGraceArea])

  useEffect(() => {
    const trigger = triggerRef.current
    const content = contentRef.current

    if (!trigger || !content) {
      return
    }

    const handleTriggerLeave = (event: PointerEvent) => handleCreateGraceArea(event, content)
    const handleContentLeave = (event: PointerEvent) => handleCreateGraceArea(event, trigger)

    trigger.addEventListener("pointerleave", handleTriggerLeave)
    content.addEventListener("pointerleave", handleContentLeave)
    return () => {
      trigger.removeEventListener("pointerleave", handleTriggerLeave)
      content.removeEventListener("pointerleave", handleContentLeave)
    }
  }, [contentRef, triggerRef, handleCreateGraceArea, handleRemoveGraceArea])

  useEffect(() => {
    if (!pointerGraceArea) {
      return
    }

    const handleTrackPointerGrace = (event: PointerEvent) => {
      const trigger = triggerRef.current
      const content = contentRef.current
      const target = event.target as HTMLElement
      const pointerPosition = { x: event.clientX, y: event.clientY }
      const hasEnteredTarget = trigger?.contains(target) || content?.contains(target)
      const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea)
      // Stop considering grace areas when the pointer runs into other control triggers
      const targetHasPopup = target.hasAttribute("aria-haspopup")

      if (hasEnteredTarget) {
        handleRemoveGraceArea()
      } else if (isPointerOutsideGraceArea || targetHasPopup) {
        handleRemoveGraceArea()
        setOpen(false)
      }
    }
    document.addEventListener("pointermove", handleTrackPointerGrace)
    return () => document.removeEventListener("pointermove", handleTrackPointerGrace)
  }, [pointerGraceArea, setOpen, handleRemoveGraceArea, triggerRef, contentRef])

  // Hoverable doesn't place focus in the popover by default
  // If this is open, and tab is pressed, and focusableElements() has an element, prevent default behavior and focus it
  // Then set a flag (probably in context) that tells us to restore focus to the trigger on close (e.g., not execute the onCloseAutoFocus handler)

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (!contentRef.current) {
        return
      }

      // Only assume forward tab is attempting to move into the popup
      if (evt.key === "Tab" && !evt.shiftKey) {
        const [firstFocusable] = focusableElements(contentRef.current)
        if (firstFocusable) {
          evt.preventDefault()
          firstFocusable.focus()
          hoverOpenFocusedWithTab.current = true
          document.removeEventListener("keydown", handleKeyDown)
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [contentRef, hoverOpenFocusedWithTab])

  return <ContentImpl {...props} />
}

const Content = (props: PopoverContentProps) => {
  const { open, showOnHover, setOpen } = usePopoverContext()

  useEscCloseStack(open, () => {
    setOpen(false)
  })

  return (
    <RadixPopover.Portal forceMount>
      <TransitionGroup
        enterDuration={600}
        exitDuration={300}
        className={s.Transition}
        disableAnimations
      >
        {open &&
          (showOnHover ? (
            <ContentHoverable key="popover-hover" {...props} />
          ) : (
            <ContentImpl key="popover" {...props} />
          ))}
      </TransitionGroup>
    </RadixPopover.Portal>
  )
}

Popover.Trigger = Trigger
Popover.Content = Content
