"use client"

import clsx from "clsx"
import { useRef, type ReactNode } from "react"
import { mergeRefs } from "react-merge-refs"
import { handlePressableMouseEnter } from "../../lib/helpers"
import type { ControlSize, Variants } from "../../types"
import { Button } from "../Button"
import { ChevronDownVector, DropdownVector, X } from "../Icon"
import { LoadingIndicator } from "../Indicator"
import s from "./SelectControl.module.css"

export type DropdownIconType = "chevronDown" | "dropdown" | "none"

export type SelectControlProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "onClick"> & {
  /**
   * Style variant for the Button
   * @default fill
   */
  variant?: Variants<"soft" | "outline" | "ghost">
  /**
   * Determines if the control should be a fully rounded pill shape
   * @default false
   */
  pill?: boolean
  /**
   * Extends the control to 100% of available width.
   * @default true
   */
  block?: boolean
  /**
   * Applies a negative margin using the current gutter to optically align the control
   * with surrounding content.
   */
  opticallyAlign?: "start" | "end"
  /**
   * Disables the control visually and from interactions
   * @default false
   */
  disabled?: boolean
  /**
   * Visually indicates that the control is in an invalid state
   * @default false
   */
  invalid?: boolean
  /**
   * Indicates that the control is selected. An unselected state will display placeholder styles.
   * @default false
   */
  selected?: boolean
  /**
   * Display a clear action that allows the select to be unset.
   * @default false
   */
  onClearClick?: () => void
  /**
   * Primary handler for when the control is selected with pointer or keyboard events
   */
  onInteract?: () => void
  /**
   * Determines size of the size and spacing of the control.
   *
   * | 3xs     | 2xs     | xs      | sm      | md      | lg      | xl      | 2xl     | 3xl     |
   * | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
   * | `22px`  | `24px`  | `26px`  | `28px`  | `32px`  | `36px`  | `40px`  | `44px`  | `48px`  |
   * @default md
   */
  size?: ControlSize
  /**
   * Displays loading indicator on top of button contents
   * @default false
   */
  loading?: boolean
  /**
   * Icon displayed in the far right of the select trigger
   * @default dropdown
   */
  dropdownIconType?: DropdownIconType
  /** Icon displayed at the start of the control */
  StartIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  /** Custom class applied to the control element */
  className?: string
  /** Content rendered for the control */
  children: ReactNode
  ref?: React.Ref<HTMLSpanElement | null>
}

export const SelectControl = ({
  ref,
  onPointerDown,
  onKeyDown,
  onPointerEnter,
  onInteract,
  invalid,
  disabled,
  children,
  className,
  variant = "outline",
  size = "md",
  block,
  opticallyAlign,
  pill = true,
  loading,
  onClearClick,
  selected = false,
  StartIcon,
  dropdownIconType = "dropdown",
  ...restProps
}: SelectControlProps) => {
  const controlRef = useRef<HTMLSpanElement>(null)
  const clearable = !!onClearClick
  const showClearAction = clearable && selected && !loading && !disabled
  const hasDropdownIcon = dropdownIconType && dropdownIconType !== "none" && !loading
  const hasAnyTertiaryIndicator = showClearAction || loading || hasDropdownIcon
  const isInteractive = !loading && !disabled

  // Act like a <button> and fire the click handler on keyboard actions
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLSpanElement>) => {
    switch (evt.key) {
      // NOTE: "Enter" does not open selects, as it may be an attempt to submit a form
      case "ArrowDown":
      case "ArrowUp":
      case " ":
        evt.stopPropagation()
        evt.preventDefault()

        if (onInteract) {
          onInteract()
        } else {
          // Otherwise, send a synthetic trigger event to Radix (presumably)
          controlRef.current?.dispatchEvent(
            new PointerEvent("pointerdown", {
              bubbles: true,
              cancelable: true,
              pointerType: "mouse", // mimic mouse interaction
            }),
          )
        }
        break
      case "Enter":
        // NOTE: "Enter" does not open selects, as it may be an attempt to submit a form
        break
      default:
        // Allow all other key presses through
        onKeyDown?.(evt)
    }
  }

  const handlePointerDown = (evt: React.PointerEvent<HTMLSpanElement>) => {
    // Don't trigger on right clicks
    if (evt.button === 2) {
      return
    }

    // Prevent focus from entering the click target of the select
    // so that focus correctly moves into the menu.
    evt.stopPropagation()

    if (onInteract) {
      evt.preventDefault()
      onInteract()
    } else {
      // NOTE: cannot preventDefault() here, for radix
      onPointerDown?.(evt)
      // @ts-expect-error -- `onClick` can only be present if Radix is trying to spread it.
      // An example would be `<Popover>`, but we specifically open this component on `onPointerDown`.
      // Trigger the handler, assuming that `onPointerDown` is not going to be responsible for opening.
      restProps.onClick?.(evt)
    }
  }

  return (
    // Intentionally not using <button> and rebuilding the semantics
    <span
      ref={mergeRefs([controlRef, ref])}
      className={clsx(s.SelectControl, className)}
      // Recreate <button> semantics
      role="button"
      tabIndex={disabled ? -1 : 0}
      onPointerEnter={(evt: React.PointerEvent<HTMLAnchorElement>) => {
        handlePressableMouseEnter(evt)
        onPointerEnter?.(evt)
      }}
      onPointerDown={isInteractive ? handlePointerDown : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      data-variant={variant}
      data-block={block ? "" : undefined}
      data-pill={pill ? "" : undefined}
      data-size={size}
      data-optically-align={opticallyAlign}
      aria-busy={loading ? "true" : undefined}
      data-selected={selected}
      data-loading={loading ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      aria-disabled={disabled}
      {...restProps}
      // Ignore onClick handler from Radix, because we use onPointerDown to mimic a native select
      onClick={undefined}
    >
      {StartIcon && <StartIcon className={s.StartIcon} />}
      <span className={s.TriggerText}>{children}</span>
      {hasAnyTertiaryIndicator && (
        <div className={s.IndicatorWrapper}>
          {showClearAction && (
            <Button
              aria-label="Clear current value"
              className={s.Clear}
              onPointerDown={(evt: React.PointerEvent<HTMLButtonElement>) => {
                // Prevent pointerDown on trigger from being captured
                evt.stopPropagation()
              }}
              onClick={(evt) => {
                evt.stopPropagation()
                evt.preventDefault()
                onClearClick()
              }}
              color="secondary"
              variant={hasDropdownIcon ? "ghost" : "solid"}
              // Mostly custom sizing through variables
              size="3xs"
              uniform
              pill={pill}
              data-only-child={!hasDropdownIcon ? "" : undefined}
            >
              <X />
            </Button>
          )}
          {loading && <LoadingIndicator className={s.LoadingIndicator} />}
          {/* Using raw SVG canvases (opposed to fixed icon canvases) led to less pixelation. */}
          {hasDropdownIcon && <DropdownIcon iconType={dropdownIconType} />}
        </div>
      )}
    </span>
  )
}

type DropdownIconProps = {
  iconType: Omit<DropdownIconType, "none">
}

export const DropdownIcon = ({ iconType }: DropdownIconProps) => {
  return iconType === "chevronDown" ? (
    <ChevronDownVector className={clsx(s.DropdownIcon, s.DropdownIconChevron)} />
  ) : (
    <DropdownVector className={s.DropdownIcon} />
  )
}
