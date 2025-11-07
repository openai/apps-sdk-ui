import clsx from "clsx"
import { ToggleGroup } from "radix-ui"
import { useCallback, useLayoutEffect, useRef } from "react"
import { useResizeObserver } from "usehooks-ts"
import { handlePressableMouseEnter, waitForAnimationFrame } from "../../lib/helpers"
import { type ControlSize, type Sizes } from "../../types"
import s from "./SegmentedControl.module.css"

export type SizeVariant = "2xs" | "xs" | "sm" | "md" | "lg" | "xl"

export type SegmentedControlProps<T extends string> = {
  /**
   * Controlled value for the group
   */
  "value": T
  /** Callback for when a new value is selected */
  "onChange"?: (nextValue: T) => void
  /** Callback any time the control is clicked (even if a new value was not selected) */
  "onClick"?: () => void
  /**
   * Text read aloud to screen readers when the control is focused
   */
  "aria-label": string
  /**
   * Controls the size of the segmented control
   *
   * | 3xs     | 2xs     | xs      | sm      | md      | lg      | xl      | 2xl     | 3xl     |
   * | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
   * | `22px`  | `24px`  | `26px`  | `28px`  | `32px`  | `36px`  | `40px`  | `44px`  | `48px`  |
   *
   * @default md
   */
  "size"?: ControlSize
  /**
   * Controls gutter on the edges of the button, defaults to value from `size`.
   *
   * | 2xs    | xs     | sm     | md     | lg     | xl     |
   * | ------ | ------ | ------ | ------ | ------ | ------ |
   * | `6px`  | `8px`  | `10px` | `12px` | `14px` | `16px` |
   */
  "gutterSize"?: Sizes<"2xs" | "xs" | "sm" | "md" | "lg" | "xl">
  /** Disable the entire group */
  "disabled"?: boolean
  /**
   * Display the control as a block element with equal width segments
   * @default false
   */
  "block"?: boolean
  /**
   * Determines if the segment control, and its options, should be a fully rounded pill shape.
   * @default false
   */
  "pill"?: boolean
  "className"?: string
  "children": React.ReactNode
}

export const SegmentedControl = <T extends string>({
  value,
  onChange,
  children,
  block,
  pill = true,
  size = "md",
  gutterSize,
  className,
  onClick,
  ...restProps
}: SegmentedControlProps<T>) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const applyThumbSizing = useCallback((attemptScroll: boolean) => {
    const root = rootRef.current
    const thumb = thumbRef.current

    if (!root || !thumb) {
      return
    }

    // Get selected node
    const activeNode = root?.querySelector<HTMLDivElement>('[data-state="on"]')

    // Impossible
    if (!activeNode) {
      return
    }

    const rootWidth = root.clientWidth
    let targetWidth = Math.floor(activeNode.clientWidth)
    const targetOffset = activeNode.offsetLeft

    // Detect if the thumb is moving too far to the edge of the container.
    // This would most commonly be due to subpixel widths adding up to excessive distance.
    if (rootWidth - (targetWidth + targetOffset) < 2) {
      targetWidth = targetWidth - 1
    }

    thumb.style.width = `${Math.floor(targetWidth)}px`
    thumb.style.transform = `translateX(${targetOffset}px)`

    // If the control is scrollable, ensure the active option is visible
    if (root.scrollWidth > rootWidth) {
      // Only scroll items near the edge, but not the inner 2/3.
      const buffer = rootWidth * 0.15
      const scrollLeft = root.scrollLeft
      const left = activeNode.offsetLeft
      const right = left + targetWidth
      if (left < scrollLeft + buffer || right > scrollLeft + rootWidth - buffer) {
        // Cheap trick to avoid unintentional scroll on mount - transition is set after mounting
        if (attemptScroll) {
          activeNode.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
        }
      }
    }
  }, [])

  useResizeObserver({
    // @ts-expect-error(2322) -- bug in types: https://github.com/juliencrn/usehooks-ts/issues/663
    ref: rootRef,
    onResize: () => {
      const thumb = thumbRef.current

      if (!thumb) {
        return
      }

      // Perform the size update instantly
      const currentTransition = thumb.style.transition
      thumb.style.transition = ""
      applyThumbSizing(false)
      thumb.style.transition = currentTransition
    },
  })

  useLayoutEffect(() => {
    const root = rootRef.current
    const thumb = thumbRef.current

    if (!root || !thumb) {
      return
    }

    // Cheap trick to avoid unintentional scroll on mount - transition is set after mounting
    applyThumbSizing(!!thumb.style.transition)

    // Apply transition after initial calculation is set
    if (!thumb.style.transition) {
      waitForAnimationFrame(() => {
        thumb.style.transition =
          "width 300ms var(--cubic-enter), transform 300ms var(--cubic-enter)"
      })
    }
  }, [applyThumbSizing, value, size, gutterSize, pill])

  const handleValueChange = (nextValue: T) => {
    // Only trigger onChange when a value exists
    // Disallow toggling off enabled items
    if (nextValue && onChange) onChange(nextValue)
  }

  return (
    <ToggleGroup.Root
      ref={rootRef}
      className={clsx(s.SegmentedControl, className)}
      type="single"
      value={value}
      loop={false}
      onValueChange={handleValueChange}
      onClick={onClick}
      data-block={block ? "" : undefined}
      data-pill={pill ? "" : undefined}
      data-size={size}
      data-gutter-size={gutterSize}
      {...restProps}
    >
      <div className={s.SegmentedControlThumb} ref={thumbRef} />
      {children}
    </ToggleGroup.Root>
  )
}

type SegmentedControlOptionProps = {
  /**
   * Option value
   */
  "value": string
  /**
   * Text read aloud to screen readers when the option is focused
   */
  "aria-label"?: string
  /**
   * Content to render in the option
   */
  "children": React.ReactNode
  /**
   * Disable the individual option
   */
  "disabled"?: boolean
}

const Segment = ({ children, ...restProps }: SegmentedControlOptionProps) => {
  return (
    <ToggleGroup.Item
      className={s.SegmentedControlOption}
      {...restProps}
      onPointerEnter={handlePressableMouseEnter}
    >
      <span className="relative">{children}</span>
    </ToggleGroup.Item>
  )
}

SegmentedControl.Option = Segment
