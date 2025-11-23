"use client"

import clsx from "clsx"
import { Tooltip as RadixTooltip, Slot } from "radix-ui"
import { useState, type MouseEventHandler, type PointerEventHandler } from "react"
import { useTimeout } from "usehooks-ts"
import { useEscCloseStack } from "../../hooks/useEscCloseStack"
import { preventDefaultHandler } from "../../lib/helpers"
import s from "./Tooltip.module.css"

export type TooltipProps = {
  children: React.ReactNode
  /**
   * The content of the tooltip. If `null`, the tooltip will not render.
   */
  content: React.ReactNode
  /**
   * Defines the `max-width` of the tooltip content. `"none"` creates a single-line, naturally sized tooltip.
   * @default 300
   */
  maxWidth?: number | "none"
  /**
   * Forces the tooltip to remain open or closed
   */
  forceOpen?: boolean
  /**
   * Delay of when the tooltip is shown from first interaction, in milliseconds.
   * @default 150
   */
  openDelay?: number
  /** Indicates that the tooltip has interactive content, and should remain open when hovered. */
  interactive?: boolean
  /**
   * Short, 1-3 word tooltips, stylized inversely from normal tooltips
   */
  compact?: boolean
  /**
   * Prevents the tooltip from closing when the trigger is clicked right after opening
   * @default false
   */
  preventUnintentionalClickToClose?: true
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default center
   */
  align?: RadixTooltip.TooltipContentProps["align"]
  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: RadixTooltip.TooltipContentProps["alignOffset"]
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
   * @default top
   */
  side?: RadixTooltip.TooltipContentProps["side"]
  /**
   * The distance in pixels from the trigger.
   * @default 5
   */
  sideOffset?: RadixTooltip.TooltipContentProps["sideOffset"]
  /**
   * Gutter sizing inside the tooltip content
   * @default md
   */
  gutterSize?: "sm" | "md" | "lg"
  /** Ref for the tooltip */
  ref?: React.Ref<HTMLDivElement | null>
  onPointerDown?: PointerEventHandler
  onClick?: MouseEventHandler
  /** Optional class name to apply to the tooltip content */
  contentClassName?: string
}

export const Tooltip = (props: TooltipProps) => {
  const {
    ref: forwardedRef,
    children,
    content,
    forceOpen = content === null ? false : undefined,
    maxWidth = 300,
    openDelay = 150,
    interactive = false,
    compact = false,
    preventUnintentionalClickToClose,
    align,
    alignOffset = 0,
    side,
    sideOffset = 5,
    gutterSize = "md",
    contentClassName,
    onPointerDown,
    onClick,
    ...restProps
  } = props
  const [visible, setVisible] = useState<boolean>(false)
  const [temporarilyPreventClickToClose, setTemporarilyPreventClickToClose] =
    useState<boolean>(false)
  useTimeout(
    () => setTemporarilyPreventClickToClose(false),
    temporarilyPreventClickToClose ? 400 : null,
  )
  const open = forceOpen ?? visible

  const handleOpenChange = (nextState: boolean) => {
    // When forceOpen is passed, don't manage internal state
    if (typeof forceOpen === "boolean") return

    setVisible(nextState)

    if (preventUnintentionalClickToClose) {
      setTemporarilyPreventClickToClose(nextState)
    }
  }

  const maybePreventClickClose = (evt: React.MouseEvent) => {
    if (preventUnintentionalClickToClose && temporarilyPreventClickToClose) {
      // Prevents tooltip listeners from closing
      evt.preventDefault()
      evt.stopPropagation()
    }
  }

  return (
    <Root
      open={open}
      delayDuration={openDelay}
      onOpenChange={handleOpenChange}
      disableHoverableContent={!interactive}
    >
      <RadixTooltip.Trigger asChild>
        <Slot.Root
          {...restProps}
          ref={forwardedRef}
          onPointerDown={(evt) => {
            maybePreventClickClose(evt)
            onPointerDown?.(evt)
          }}
          onClick={(evt) => {
            maybePreventClickClose(evt)
            onClick?.(evt)
          }}
        >
          {children}
        </Slot.Root>
      </RadixTooltip.Trigger>
      <Content
        maxWidth={maxWidth}
        compact={compact}
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        gutterSize={gutterSize}
        className={contentClassName}
      >
        {content}
      </Content>
    </Root>
  )
}

const Root = ({
  children,
  open,
  onOpenChange,
  ...restProps
}: RadixTooltip.TooltipProps & {
  open: boolean
  onOpenChange: (nextState: boolean) => void
}) => {
  useEscCloseStack(open, () => {
    onOpenChange(false)
  })

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root open={open} onOpenChange={onOpenChange} {...restProps}>
        {children}
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}

type TooltipContentProps = RadixTooltip.TooltipContentProps & {
  children: React.ReactNode
  /**
   * Defines the `max-width` of the tooltip content. `"none"` creates a single-line, naturally sized tooltip.
   * @default 300
   */
  maxWidth?: number | "none"
  /**
   * Short, 1-3 word tooltips, stylized inversely from normal tooltips
   */
  compact?: boolean
  /**
   * Gutter sizing inside the tooltip content
   * @default md
   */
  gutterSize?: "sm" | "md" | "lg"
  /** Determines if the tooltip content should respond to click events */
  clickable?: boolean
}

export const Content = ({
  children,
  maxWidth = 300,
  compact = false,
  clickable = undefined,
  alignOffset = 0,
  sideOffset = 5,
  gutterSize = "md",
  className,
  style,
  ...restProps
}: TooltipContentProps) => {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        {...restProps}
        className={clsx(s.Tooltip, className)}
        data-compact={compact}
        data-clickable={clickable}
        data-gutter-size={gutterSize}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        collisionPadding={15}
        hideWhenDetached
        style={{
          ...style,
          maxWidth,
        }}
        onEscapeKeyDown={preventDefaultHandler}
      >
        {children}
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  )
}

type TooltipTriggerProps = RadixTooltip.TooltipTriggerProps & {
  /**
   * Determines if `tabindex=0` is applied to the trigger
   * @default true
   */
  focusable?: boolean
  /**
   * Optional class name to apply to the trigger
   */
  className?: string
  /** Ref for the trigger */
  ref?: React.Ref<HTMLSpanElement | null>
}

export const Trigger = ({
  children,
  asChild = true,
  ...restProps
}: RadixTooltip.TooltipTriggerProps) => {
  return (
    <RadixTooltip.Trigger asChild={asChild} {...restProps}>
      {children}
    </RadixTooltip.Trigger>
  )
}

// Optional wrapper for tooltip trigger, if the visual content isn't already accessible or with built-in visual indications
export const TriggerDecorator = (props: TooltipTriggerProps) => {
  const { children, className, focusable = true, ref, ...restProps } = props
  const isPlainText = typeof children === "string"

  return (
    <Slot.Root
      ref={ref}
      {...restProps}
      className={clsx(s.TriggerDecorator, className)}
      tabIndex={focusable ? 0 : undefined}
    >
      {isPlainText ? <span>{children}</span> : children}
    </Slot.Root>
  )
}

// Building advanced tooltip behaviors can be achieved by using the
// composed components, and wiring up bespoke behaviors.
Tooltip.Root = Root
Tooltip.Content = Content
Tooltip.Trigger = Trigger
// Basic <Tooltip> usage can be done with the component directly,
// without requiring controlled component composition.
// <TriggerDecorator> is a helper component that creates an accessible trigger with a visual effect
Tooltip.TriggerDecorator = TriggerDecorator
