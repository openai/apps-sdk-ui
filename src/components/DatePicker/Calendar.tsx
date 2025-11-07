import { DateTime, Interval } from "luxon"
import { useEffect, useMemo, useRef, useState } from "react"
import { chunkIntoWeeks, getDaysOfMonth, isBefore, isSameDay, isToday } from "../../lib/dateUtils"
import { waitForAnimationFrame } from "../../lib/helpers"
import { Button } from "../Button"
import { ChevronLeft, ChevronRight } from "../Icon"
import { usePopoverClose } from "../Popover/usePopoverController"
import { TransitionGroup } from "../Transition"
import s from "./Calendar.module.css"
import { useDateContext } from "./context"

const CALENDAR_WIDTH_PX = 210
const CALENDAR_GAP_PX = 32
const STEP_DISTANCE_PX = CALENDAR_WIDTH_PX + CALENDAR_GAP_PX

export const DateCalendar = () => {
  const { value, min, max, onChangeRef } = useDateContext()
  const closePopover = usePopoverClose()
  const calendarContainerRef = useRef<HTMLDivElement | null>(null)
  const [calendarSteps, setCalendarSteps] = useState<number>(0)
  const [forceRenderIncrement, setForceRenderIncrement] = useState<number>(0)
  const [calendarDate, setCalendarDate] = useState<DateTime>(() => value ?? DateTime.now())

  const canGoBack = !min || isBefore(min, calendarDate.startOf("month"))
  const canGoForward = !max || isBefore(calendarDate.endOf("month"), max)

  const handleNext = () => {
    setCalendarSteps((c) => c + 1)
    setCalendarDate((dt) => dt.plus({ months: 1 }))
  }

  const handlePrevious = () => {
    setCalendarSteps((c) => c - 1)
    setCalendarDate((dt) => dt.minus({ months: 1 }))
  }

  const handleDateSelect = (selectedDate: DateTime) => {
    onChangeRef.current(selectedDate)
    closePopover()
  }

  // Force re-renders when `value` changes out of band from direct user-selection
  useEffect(() => {
    // No-op when value is empty
    if (!value) {
      return
    }

    // Check if `value` is still within view of our calendar
    const viewInterval = Interval.fromDateTimes(
      calendarDate.startOf("month"),
      calendarDate.endOf("month"),
    )
    const isValueInRangeOfCalendar = viewInterval.contains(value)
    if (!isValueInRangeOfCalendar) {
      // Reset state the calendar view entirely
      setCalendarSteps(0)
      setCalendarDate(value)
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
  }, [calendarDate])

  return (
    <div className={s.CalendarWrapper} key={`stable-view-${forceRenderIncrement}`}>
      <div ref={calendarContainerRef} className={s.CalendarContainer}>
        <div className={s.Previous}>
          <Button
            variant="ghost"
            color="secondary"
            size="sm"
            gutterSize="2xs"
            pill={false}
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
            gutterSize="2xs"
            pill={false}
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
              key={calendarDate.toLocaleString({
                month: "long",
                year: "numeric",
              })}
              stepPosition={calendarSteps}
              date={calendarDate}
              selectedDate={value}
              min={min}
              max={max}
              onDateSelect={handleDateSelect}
            />
          </TransitionGroup>
        </div>
      </div>
    </div>
  )
}

type CalendarViewProps = {
  // Can be any day within the given month that the calendar should render for
  date: DateTime
  selectedDate?: DateTime | null
  onDateSelect?: (dt: DateTime) => void
  min?: DateTime
  max?: DateTime
  stepPosition: number
}

const daysOfTheWeekLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const CalendarView = ({
  date,
  selectedDate,
  min,
  max,
  onDateSelect,
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

            const enabled = enabledInterval.contains(d)
            const isSelected = enabled && selectedDate && isSameDay(d, selectedDate)
            const dayIsToday = isToday(d)

            return (
              <div className={s.Day} key={dayIndex} data-is-selected={isSelected ? "" : undefined}>
                <button
                  className={s.InteractiveDay}
                  disabled={!enabled}
                  onClick={() => d && onDateSelect?.(d)}
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
