"use client"

import { DateTime, Interval } from "luxon"
import { useEffect, useMemo, useRef, useState } from "react"
import { useBreakpoint } from "../../hooks/useBreakpoints"
import {
  chunkIntoWeeks,
  getDaysOfMonth,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
} from "../../lib/dateUtils"
import { waitForAnimationFrame } from "../../lib/helpers"
import { Button } from "../Button"
import { Check, ChevronLeft, ChevronRight } from "../Icon"
import { TransitionGroup } from "../Transition"
import s from "./Calendar.module.css"
import { useDateRangeContext } from "./context"
import { type DateRange, type DateRangeShortcut } from "./types"

const CALENDAR_WIDTH_PX = 210
const CALENDAR_GAP_PX = 32
const STEP_DISTANCE_PX = CALENDAR_WIDTH_PX + CALENDAR_GAP_PX

export const DateRangeCalendar = () => {
  const { value, min, max, maxRangeDays, onChangeRef } = useDateRangeContext()
  const isSmallUp = useBreakpoint("sm")
  const calendarContainerRef = useRef<HTMLDivElement | null>(null)
  const [selectionRange, setSelectionRange] = useState<DateRange | null>(null)
  const [calendarSteps, setCalendarSteps] = useState<number>(0)
  const [forceRenderIncrement, setForceRenderIncrement] = useState<number>(0)
  const [leftCalendarDate, setLeftCalendarDate] = useState<DateTime>(() =>
    isSmallUp
      ? getLeftCalendarDate(value?.[0] ?? DateTime.now(), max)
      : value?.[0] ?? DateTime.now(),
  )

  const rightCalendarDate = isSmallUp
    ? leftCalendarDate.plus({ months: 1 }).startOf("month")
    : leftCalendarDate.startOf("month")

  const canGoBack = !min || isBefore(min, leftCalendarDate.startOf("month"))
  const canGoForward = !max || isBefore(rightCalendarDate.endOf("month"), max)

  const handleNext = () => {
    setCalendarSteps((c) => c + 1)
    setLeftCalendarDate((dt) => dt.plus({ months: 1 }))
  }

  const handlePrevious = () => {
    setCalendarSteps((c) => c - 1)
    setLeftCalendarDate((dt) => dt.minus({ months: 1 }))
  }

  const handleDateSelect = (selectedDate: DateTime) => {
    if (!selectionRange) {
      setSelectionRange([selectedDate, selectedDate])
      return
    }

    const [currentSelectionStartDate] = selectionRange

    // Selecting a date before the current selected start date moves the start date
    // but does not resolve the selection
    if (isBefore(selectedDate, currentSelectionStartDate)) {
      setSelectionRange([selectedDate, selectedDate])
      return
    }

    // Resolve the selection by emitting the value and clearing selection
    onChangeRef.current([currentSelectionStartDate, selectedDate])
    setSelectionRange(null)
  }

  const handleDateMouseEnter = (hoveredDate: DateTime) => {
    // If we're not actively selecting, no-op
    if (!selectionRange) {
      return
    }

    setSelectionRange((currentSelectionRange) => {
      // impossible due to the check above
      if (!currentSelectionRange) {
        return currentSelectionRange
      }

      const [currentStartDate] = currentSelectionRange

      // When hovering a date before the current date, don't change the selection range
      if (isBefore(hoveredDate, currentStartDate)) {
        return [currentStartDate, currentStartDate]
      }

      return [currentStartDate, hoveredDate]
    })
  }

  const handleCalendarMouseLeave = () => {
    // If we're not actively selecting, no-op
    if (!selectionRange) {
      return
    }

    setSelectionRange((currentSelectionRange) => {
      if (!currentSelectionRange) {
        return currentSelectionRange
      }

      // Reset the end selection
      const [currentStartDate] = currentSelectionRange
      return [currentStartDate, currentStartDate]
    })
  }

  const selectedDisplayValue = selectionRange || value

  // Force re-renders when `value` changes out of brand from direct user-selection
  useEffect(() => {
    // No-op when value is empty
    if (!value) {
      return
    }

    // When a new value is received, it could be out of band from the control of this calendar.
    // For example, a shortcut could be selected, or clear could be pressed. In either case, selection
    // should be reset so that the new `value` can be displayed fully.
    setSelectionRange(null)

    // Check if `value` is still within view of our calendar
    const viewInterval = Interval.fromDateTimes(
      leftCalendarDate.startOf("month"),
      rightCalendarDate.endOf("month"),
    )
    const isValueInRangeOfCalendar =
      viewInterval.contains(value[0]) || viewInterval.contains(value[1])
    if (!isValueInRangeOfCalendar) {
      // Reset state the calendar view entirely
      setSelectionRange(null)
      setCalendarSteps(0)
      setLeftCalendarDate(isSmallUp ? getLeftCalendarDate(value[0], max) : value[0])
      setForceRenderIncrement((c) => c + 1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only re-run this hook when value changes
  }, [value])

  // Detect height changes when new calendars are rendered
  useEffect(() => {
    waitForAnimationFrame(() => {
      const container = calendarContainerRef.current

      if (!container) {
        return
      }

      let maxHeight = -Infinity

      // Find the tallest calendar
      container.querySelectorAll("[data-calendar]")?.forEach((element) => {
        // NOTE: clientHeight does not respect the scale() that popover uses to animate in, which is what we want
        // We want to know the full height of the element, without any transform applied.
        const height = element.clientHeight

        // Ignore calendars that are exiting
        if (element.closest("[data-exiting")) {
          return
        }

        if (height > maxHeight) {
          maxHeight = height
        }
      })

      container.style.height = `${maxHeight}px`

      // Don't animate the initial height.
      // This is relevant when the calendar opens to a larger size than the default.
      if (!container.style.transition) {
        waitForAnimationFrame(() => {
          container.style.transition = `height 0.25s var(--cubic-move)`
        })
      }
    })
  }, [leftCalendarDate])

  return (
    <div className={s.CalendarWrapper} key={`stable-view-${forceRenderIncrement}`}>
      <div
        ref={calendarContainerRef}
        className={s.CalendarContainer}
        onMouseLeave={handleCalendarMouseLeave}
      >
        <div className={s.Previous}>
          <Button
            variant="ghost"
            color="secondary"
            size="sm"
            pill={false}
            gutterSize="2xs"
            iconSize="sm"
            onClick={handlePrevious}
            disabled={!canGoBack}
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className={s.Next}>
          <Button
            variant="ghost"
            color="secondary"
            size="sm"
            pill={false}
            gutterSize="2xs"
            iconSize="sm"
            onClick={handleNext}
            disabled={!canGoForward}
          >
            <ChevronRight />
          </Button>
        </div>
        <div
          className={s.CalendarRange}
          style={{
            transform: `translate(${calendarSteps * -1 * STEP_DISTANCE_PX}px, 0)`,
          }}
        >
          <TransitionGroup enterDuration={400} exitDuration={400}>
            <CalendarView
              key={leftCalendarDate.toLocaleString({
                month: "long",
                year: "numeric",
              })}
              stepPosition={calendarSteps}
              date={leftCalendarDate}
              selectedDates={selectedDisplayValue}
              min={min}
              max={max}
              selectionStart={selectionRange?.[0]}
              maxRangeDays={maxRangeDays}
              isSelecting={!!selectionRange}
              onDateSelect={handleDateSelect}
              onDateMouseEnter={handleDateMouseEnter}
            />
            {isSmallUp && (
              <CalendarView
                key={rightCalendarDate.toLocaleString({
                  month: "long",
                  year: "numeric",
                })}
                stepPosition={calendarSteps + 1}
                date={rightCalendarDate}
                selectedDates={selectedDisplayValue}
                min={min}
                max={max}
                selectionStart={selectionRange?.[0]}
                maxRangeDays={maxRangeDays}
                isSelecting={!!selectionRange}
                onDateSelect={handleDateSelect}
                onDateMouseEnter={handleDateMouseEnter}
              />
            )}
          </TransitionGroup>
        </div>
      </div>
    </div>
  )
}

type CalendarViewProps = {
  // Can be any day within the given month that the calendar should render for
  date: DateTime
  selectedDates?: DateRange | null
  onDateSelect?: (dt: DateTime) => void
  onDateMouseEnter?: (dt: DateTime) => void
  min?: DateTime
  max?: DateTime
  selectionStart?: DateTime | null
  maxRangeDays?: number
  isSelecting?: boolean
  stepPosition: number
}

const daysOfTheWeekLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const CalendarView = ({
  date,
  selectedDates,
  min,
  max,
  selectionStart,
  maxRangeDays,
  isSelecting,
  onDateSelect,
  onDateMouseEnter,
  stepPosition,
}: CalendarViewProps) => {
  // Lock position on mount and don't respond to changes
  const [position] = useState(stepPosition)
  const { startOfMonth, weeks, enabledInterval } = useMemo(() => {
    const monthStart = date.startOf("month")
    const endOfMonth = date.endOf("month")

    const daysBeforeMonthStart = monthStart.weekday % 7
    const blankDays = new Array(daysBeforeMonthStart).fill(null)
    const daysInMonth = getDaysOfMonth(monthStart)
    const calendarCells = [...blankDays, ...daysInMonth]

    const enabledDateInterval = Interval.fromDateTimes(min || monthStart, max || endOfMonth)

    return {
      startOfMonth: monthStart,
      endOfMonth,
      weeks: chunkIntoWeeks(calendarCells, 7),
      enabledInterval: enabledDateInterval,
    }
  }, [date, min, max])

  const [selectedStart, selectedEnd] = selectedDates || []
  const rangeEndLimit =
    selectionStart && maxRangeDays != null
      ? selectionStart.plus({ days: maxRangeDays - 1 })
      : undefined

  const selectedInterval = useMemo<Interval | null>(() => {
    if (!selectedStart || !selectedEnd) {
      return null
    }

    return Interval.fromDateTimes(selectedStart.startOf("day"), selectedEnd.endOf("day"))
  }, [selectedStart, selectedEnd])

  return (
    <div className={s.Calendar} style={{ left: position * STEP_DISTANCE_PX }} data-calendar>
      <p className={s.MonthLabel}>
        {startOfMonth.monthLong} {startOfMonth.year}
      </p>
      <div className={s.Week}>
        {daysOfTheWeekLabels.map((day) => (
          <div key={day} className={s.DayLabel}>
            {day}
          </div>
        ))}
      </div>
      {weeks.map((week, weekIndex) => (
        <div className={s.Week} key={weekIndex}>
          {week.map((d, dayIndex) => {
            if (!d) {
              return <div className={s.Day} key={`${weekIndex}-${dayIndex}`} />
            }

            // Check if 'day' is within selected range
            const enabled =
              enabledInterval.contains(d) &&
              !(isSelecting && rangeEndLimit && isAfter(d, rangeEndLimit))
            const isStart = enabled && selectedStart && isSameDay(d, selectedStart)
            const isEnd = enabled && selectedEnd && isSameDay(d, selectedEnd)
            const hasRange = selectedStart && selectedEnd && !isSameDay(selectedStart, selectedEnd)
            const isInRange = hasRange && selectedInterval?.contains(d)
            const dayIsToday = isToday(d)
            const isFirstRangeTrail =
              d.day === 1 &&
              // Trail doesn't make sense to display at the start of the week (Monday)
              d.weekday !== 7 &&
              isInRange &&
              !isStart
            const isLastRangeTrail =
              d.day === d.daysInMonth &&
              // Trail doesn't make sense to display at the end of the week (Saturday)
              d.weekday !== 6 &&
              isInRange &&
              !isEnd

            return (
              <div
                className={s.Day}
                key={dayIndex}
                data-is-start={isStart ? "" : undefined}
                data-is-end={isEnd ? "" : undefined}
                data-is-in-range={isInRange ? "" : undefined}
                data-is-first-range-trail={isFirstRangeTrail ? "" : undefined}
                data-is-last-range-trail={isLastRangeTrail ? "" : undefined}
              >
                <button
                  className={s.InteractiveDay}
                  disabled={!enabled}
                  onClick={() => d && onDateSelect?.(d)}
                  onMouseEnter={() => d && onDateMouseEnter?.(d)}
                >
                  {d.day}
                  {dayIsToday && <span className={s.TodayDot} />}
                </button>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export const DateRangeShortcuts = ({ shortcuts }: { shortcuts?: DateRangeShortcut[] }) => {
  const isMediumUp = useBreakpoint("md")
  const { value, onChangeRef } = useDateRangeContext()

  if (!isMediumUp || !shortcuts?.length) {
    return null
  }

  return (
    <div className={s.Shortcuts}>
      {shortcuts.map((shortcut) => {
        const { label, getDateRange } = shortcut
        const range = getDateRange()
        const [start, end] = range
        const isActive = !!value && isSameDay(value[0], start) && isSameDay(value[1], end)

        return (
          <Button
            key={label}
            className="mb-1"
            variant="ghost"
            color="primary"
            pill={false}
            size="md"
            iconSize="sm"
            block
            selected={isActive}
            onClick={() => onChangeRef.current(range, shortcut)}
          >
            <span className={s.ButtonText}>{label}</span>
            {isActive && <Check />}
          </Button>
        )
      })}
    </div>
  )
}

const getLeftCalendarDate = (targetDate: DateTime, maxDate?: DateTime) => {
  if (!maxDate) {
    return targetDate
  }

  return isBefore(targetDate.endOf("month"), maxDate) ? targetDate : targetDate.minus({ months: 1 })
}
