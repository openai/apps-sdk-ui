import type { Meta } from "@storybook/react"
import { DateTime } from "luxon"
import { useState } from "react"
import { getMonthStartAndEnd } from "../../lib/dateUtils"
import { DateRangePicker, type DateRangePickerProps } from "./DateRangePicker"
import { type DateRange, type DateRangeShortcut } from "./types"

const meta = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  argTypes: {
    value: { control: false },
    onChange: { control: false },
    min: { control: false },
    max: { control: false },
    shortcuts: { control: false },
    triggerClassName: { control: false },
    triggerStepperUnit: {
      control: "select",
      options: [undefined, "month"],
    },
    placeholder: { control: false },
    maxRangeDays: { control: "number" },
  },
} satisfies Meta<typeof DateRangePicker>

export default meta

export const Base = (args: DateRangePickerProps) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null)

  return (
    <DateRangePicker
      {...args}
      value={selectedDateRange}
      onChange={setSelectedDateRange}
      shortcuts={dayShortcuts}
    />
  )
}

Base.args = {
  size: "lg",
  pill: true,
  clearable: true,
}

Base.parameters = {
  docs: {
    source: {
      code: `
<DateRangePicker
  value={selectedDateRange}
  onChange={(nextDateRange) => {
    setSelectedDateRange(nextDateRange);
  }}
  shortcuts={dayShortcuts}
  clearable
  pill
/>
`,
    },
  },
}

export const Limits = (args: DateRangePickerProps) => {
  const today = DateTime.local()
  const minDate = today.minus({ days: 30 }).startOf("day")
  const maxDate = today.endOf("day")
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(() =>
    getMonthStartAndEnd(today, { min: minDate, max: maxDate }),
  )

  return (
    <DateRangePicker
      {...args}
      value={selectedDateRange}
      onChange={setSelectedDateRange}
      min={minDate}
      max={maxDate}
    />
  )
}

Limits.args = {
  size: "lg",
  pill: true,
  triggerShowIcon: true,
}

Limits.parameters = {
  docs: {
    source: {
      code: `
const today = DateTime.local()
const minDate = today.minus({ days: 120 }).startOf("day")
const maxDate = today.endOf("day")
const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(() =>
  getMonthStartAndEnd(today, { min: minDate, max: maxDate }),
)

return (
  <DateRangePicker
    ...
    min={minDate}
    max={maxDate}
  />
)
`,
    },
  },
}

const dayShortcuts: DateRangeShortcut[] = [
  {
    label: "Today",
    getDateRange: () => {
      const today = DateTime.local()
      return [today.startOf("day"), today.endOf("day")]
    },
  },
  {
    label: "Yesterday",
    getDateRange: () => {
      const yesterday = DateTime.local().minus({ days: 1 })
      return [yesterday.startOf("day"), yesterday.endOf("day")]
    },
  },
  {
    label: "Last 7 days",
    getDateRange: () => {
      const today = DateTime.local().endOf("day")
      return [today.minus({ days: 7 }).startOf("day"), today.endOf("day")]
    },
  },
  {
    label: "Last 30 days",
    getDateRange: () => {
      const today = DateTime.local().endOf("day")
      return [today.minus({ days: 30 }).startOf("day"), today.endOf("day")]
    },
  },
] as const

export const Shortcuts = (args: DateRangePickerProps) => {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null)

  return (
    <DateRangePicker
      {...args}
      value={selectedDateRange}
      onChange={setSelectedDateRange}
      shortcuts={dayShortcuts}
    />
  )
}

Shortcuts.args = {
  size: "lg",
  pill: true,
  clearable: true,
}

Shortcuts.parameters = {
  docs: {
    source: {
      code: `
<DateRangePicker
  ...
  shortcuts={dayShortcuts}
/>
`,
    },
  },
}

export const MonthStepper = (args: DateRangePickerProps) => {
  const today = DateTime.local()
  const maxDate = today.endOf("day")
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(() =>
    getMonthStartAndEnd(today, { max: today }),
  )

  return (
    <DateRangePicker
      {...args}
      value={selectedDateRange}
      onChange={setSelectedDateRange}
      max={maxDate}
    />
  )
}

MonthStepper.args = {
  size: "lg",
  clearable: true,
  pill: true,
  triggerStepperUnit: "month",
}

MonthStepper.parameters = {
  docs: {
    source: {
      code: `
<DateRangePicker
  ...
  triggerStepperUnit: "month",
/>
`,
    },
  },
}
