"use client"

import { DateTime } from "luxon"
import { createContext, use } from "react"
import type { SelectControlProps } from "../SelectControl"

export type DateContextValue = {
  value: DateTime | null
  min?: DateTime
  max?: DateTime
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
  // References
  onChangeRef: React.MutableRefObject<(nextValue: DateTime | null) => void>
}

export const DateContext = createContext<DateContextValue | null>(null)

export const useDateContext = () => {
  const context = use(DateContext)

  if (!context) {
    throw new Error("Date components must be wrapped in <DatePicker />")
  }

  return context
}
