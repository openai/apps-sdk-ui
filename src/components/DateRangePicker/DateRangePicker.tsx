import { DateTime } from "luxon"
import { useMemo } from "react"
import { useLatestValue } from "../../hooks/useLatestValue"
import { isBefore } from "../../lib/dateUtils"
import { Popover, type PopoverContentProps } from "../Popover"
import type { SelectControlProps } from "../SelectControl"
import { DateRangeCalendar, DateRangeShortcuts } from "./Calendar"
import { DateRangeContext, type DateRangeContextValue } from "./context"
import { DateRangeTrigger } from "./Trigger"
import { type DateRange, type DateRangeShortcut } from "./types"

export type DateRangePickerProps = {
  /**
   * The selected date range value.
   */
  value: DateRange | null
  /**
   * Handler that is triggered when the date range changes.
   */
  onChange: (nextValue: DateRange | null, shortcut?: DateRangeShortcut) => void
  /**
   * Defines the earliest selectable date (inclusive).
   */
  min?: DateTime
  /**
   * Defines the latest selectable date (inclusive).
   */
  max?: DateTime
  /**
   * Maximum length of the selectable range in days (inclusive).
   * When set, the end date cannot be more than this many days after the start date.
   */
  maxRangeDays?: number
  /**
   * List of date range shortcuts displayed for quick selection, shown to the left of the calendar.
   */
  shortcuts?: DateRangeShortcut[]
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
   * @default bottom
   */
  side?: PopoverContentProps["side"]
  /**
   * The distance in pixels from the trigger.
   * @default 8
   */
  sideOffset?: PopoverContentProps["sideOffset"]
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default center
   */
  align?: PopoverContentProps["align"]
  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: PopoverContentProps["alignOffset"]

  /**
   * Disables the select visually and from interactions
   * @default false
   */
  disabled?: boolean
  /**
   * Placeholder text for the select
   * @default Select date range...
   */
  placeholder?: string
  /**
   * Style variant for the select trigger
   * @default outline
   */
  variant?: SelectControlProps["variant"]
  /**
   * Determines if the select trigger should be a fully rounded pill shape
   * @default false
   */
  pill?: boolean
  /**
   * Determines size of the size and spacing of the control.
   *
   * | 3xs     | 2xs     | xs      | sm      | md      | lg      | xl      | 2xl     | 3xl     |
   * | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
   * | `22px`  | `24px`  | `26px`  | `28px`  | `32px`  | `36px`  | `40px`  | `44px`  | `48px`  |
   * @default md
   */
  size?: SelectControlProps["size"]
  /**
   * Icon displayed in the far right of the select trigger
   * @default dropdown
   */
  dropdownIconType?: SelectControlProps["dropdownIconType"]
  /**
   * Custom class applied to the select trigger
   */
  triggerClassName?: string
  /**
   * Display calendar icon at the start of the trigger
   * @default true
   */
  triggerShowIcon?: boolean
  /**
   * Allows the trigger to display as a stepper when the selected date matches the unit.
   * Currently 'month' is the only supported unit.
   */
  triggerStepperUnit?: "month"
  /**
   * Format of dates displayed in the trigger
   * @default "MM/dd/yy"
   */
  triggerDateFormat?: string
  /**
   * Display a clear action that allows the select to be unset.
   * @default false
   */
  clearable?: boolean
  /**
   * Extends select to 100% of available width.
   * @default true
   */
  block?: boolean
}

export const DateRangePicker = (props: DateRangePickerProps) => {
  const {
    value,
    onChange,
    min,
    max,
    maxRangeDays,
    shortcuts,
    side = "bottom",
    sideOffset = 8,
    align = "center",
    alignOffset,
    variant = "outline",
    size = "md",
    clearable = false,
    disabled = false,
    dropdownIconType,
    placeholder = "Select date range...",
    pill = false,
    block = false,
    triggerStepperUnit,
    triggerClassName,
    triggerShowIcon = true,
    triggerDateFormat = "MM/dd/yy",
  } = props

  if (min && max && !isBefore(min, max)) {
    throw new Error("DateRangePicker error: `min` date must be before the `max` date")
  }

  // Create stable, mutable references to avoid memoization requirements from consumers
  const onChangeRef = useLatestValue(onChange)

  const store = useMemo<DateRangeContextValue>(
    () => ({
      value,
      min,
      max,
      maxRangeDays,
      variant,
      size,
      dropdownIconType,
      clearable,
      disabled,
      placeholder,
      block,
      pill,
      shortcuts,
      triggerStepperUnit,
      triggerClassName,
      triggerShowIcon,
      triggerDateFormat,
      onChangeRef,
    }),
    [
      value,
      min,
      max,
      maxRangeDays,
      variant,
      size,
      dropdownIconType,
      clearable,
      disabled,
      placeholder,
      block,
      pill,
      shortcuts,
      triggerStepperUnit,
      triggerClassName,
      triggerShowIcon,
      triggerDateFormat,
      onChangeRef,
    ],
  )

  return (
    <DateRangeContext value={store}>
      <Popover>
        <Popover.Trigger>
          <DateRangeTrigger />
        </Popover.Trigger>
        <Popover.Content
          minWidth={230}
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset ?? (align === "center" ? 0 : -5)}
        >
          <div className="flex">
            <DateRangeShortcuts shortcuts={shortcuts} />
            <DateRangeCalendar />
          </div>
        </Popover.Content>
      </Popover>
    </DateRangeContext>
  )
}
