"use client"

import clsx from "clsx"
import type { DateTime } from "luxon"
import { useMemo, type ComponentProps } from "react"
import { getMonthStartAndEnd, isBefore, isSameDay } from "../../lib/dateUtils"
import { Button } from "../Button"
import { Calendar, ChevronLeft, ChevronRight } from "../Icon"
import { SelectControl } from "../SelectControl"
import s from "./Trigger.module.css"
import { useDateRangeContext } from "./context"
import { type DateRange, type DateRangeShortcut } from "./types"

export const DateRangeTrigger = (props: ComponentProps<"span">) => {
  const {
    value,
    min,
    max,
    disabled,
    variant,
    pill,
    size,
    block,
    triggerStepperUnit,
    triggerClassName,
    clearable,
    dropdownIconType,
    triggerShowIcon,
    onChangeRef,
  } = useDateRangeContext()

  const isStepperView = useMemo<boolean>(
    () =>
      rangeMatchesStepperUnit(value, triggerStepperUnit, {
        min,
        max,
      }),
    [value, triggerStepperUnit, min, max],
  )

  const handleClearClick = () => {
    onChangeRef.current(null)
  }

  return (
    <SelectControl
      className={clsx(isStepperView && s.StepperControl, triggerClassName)}
      selected={!!value}
      variant={variant}
      pill={pill}
      block={block}
      size={size}
      disabled={disabled}
      StartIcon={triggerShowIcon && !isStepperView ? Calendar : undefined}
      dropdownIconType={!isStepperView ? dropdownIconType : "none"}
      onClearClick={clearable && !isStepperView ? handleClearClick : undefined}
      {...props}
    >
      {isStepperView ? <TriggerStepperView /> : <TriggerDisplayView />}
    </SelectControl>
  )
}

const TriggerStepperView = () => {
  const { value, min, max, disabled, onChangeRef } = useDateRangeContext()

  if (!value) {
    return null
  }

  const [startDate, endDate] = value
  const canGoBack = !min || isBefore(min, startDate.startOf("month"))
  const canGoForward = !max || isBefore(endDate.endOf("month"), max)

  return (
    <span className="flex">
      <Button
        className={s.StepperPrevious}
        color="secondary"
        variant="ghost"
        disabled={disabled || !canGoBack}
        size="3xs"
        uniform
        pill
        onPointerDown={(evt) => {
          evt.stopPropagation()
          onChangeRef.current(getMonthStartAndEnd(startDate.minus({ months: 1 }), { min, max }))
        }}
      >
        <ChevronLeft />
      </Button>{" "}
      <span className={clsx(s.TriggerText, "min-w-[120px] text-center")}>
        {startDate.monthLong} {startDate.year}
      </span>
      <Button
        className={s.StepperNext}
        color="secondary"
        variant="ghost"
        disabled={disabled || !canGoForward}
        size="3xs"
        uniform
        pill
        onPointerDown={(evt) => {
          evt.stopPropagation()
          onChangeRef.current(getMonthStartAndEnd(startDate.plus({ months: 1 }), { min, max }))
        }}
      >
        <ChevronRight />
      </Button>
    </span>
  )
}

const TriggerDisplayView = () => {
  const { placeholder, value, triggerDateFormat, shortcuts } = useDateRangeContext()

  const activeShortcut = useMemo<DateRangeShortcut | undefined>(() => {
    if (!value || !shortcuts?.length) {
      return undefined
    }

    return shortcuts.find((sc) => {
      const [start, end] = sc.getDateRange()
      return isSameDay(start, value[0]) && isSameDay(end, value[1])
    })
  }, [value, shortcuts])

  return (
    <>
      {activeShortcut ? (
        <span className="inline-block">{activeShortcut.label}</span>
      ) : value && isSameDay(value[0], value[1]) ? (
        <span className="inline-block tabular-nums">{value[0].toFormat(triggerDateFormat)}</span>
      ) : value ? (
        <span className="inline-block tabular-nums">
          {value[0].toFormat(triggerDateFormat)}
          <span className={s.RangeTextSeparator}>-</span>
          {value[1].toFormat(triggerDateFormat)}
        </span>
      ) : (
        placeholder
      )}
    </>
  )
}

const rangeMatchesStepperUnit = (
  range: DateRange | null,
  stepperUnit: "month" | undefined,
  { min, max }: { min?: DateTime; max?: DateTime } = {},
): boolean => {
  // Allows method to be called lazily
  if (!range || !stepperUnit) {
    return false
  }

  const [startDate, endDate] = range
  const [startDateCompare, endDateCompare] = getMonthStartAndEnd(startDate, {
    min,
    max,
  })

  return isSameDay(startDateCompare, startDate) && isSameDay(endDateCompare, endDate)
}
