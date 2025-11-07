import { type DateTime } from "luxon"

export type DateRange = [DateTime, DateTime]
export type DateRangeShortcut = {
  label: string
  getDateRange: () => DateRange
}
