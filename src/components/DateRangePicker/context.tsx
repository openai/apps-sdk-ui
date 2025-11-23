"use client"

import { DateTime } from "luxon"
import { createContext, use } from "react"
import type { SelectControlProps } from "../SelectControl"
import type { DateRange, DateRangeShortcut } from "./types"

export type DateRangeContextValue = {
  value: DateRange | null
  min?: DateTime
  max?: DateTime
  maxRangeDays?: number
  triggerStepperUnit?: "month"
  triggerClassName?: string
  triggerShowIcon?: boolean
  triggerDateFormat: string
  disabled: boolean
  variant?: SelectControlProps["variant"]
  pill: boolean
  block: boolean
  size?: SelectControlProps["size"]
  dropdownIconType?: SelectControlProps["dropdownIconType"]
  clearable: boolean
  placeholder: string
  shortcuts?: DateRangeShortcut[]
  // References
  onChangeRef: React.MutableRefObject<
    (nextValue: DateRange | null, shortcut?: DateRangeShortcut) => void
  >
}

export const DateRangeContext = createContext<DateRangeContextValue | null>(null)

export const useDateRangeContext = () => {
  const context = use(DateRangeContext)

  if (!context) {
    throw new Error("DateRange components must be wrapped in <DateRangePicker />")
  }

  return context
}
