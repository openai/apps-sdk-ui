import clsx from "clsx"
import clamp from "lodash/clamp"
import round from "lodash/round"
import { Slider as RadixSlider } from "radix-ui"
import {
  type ChangeEventHandler,
  type ElementRef,
  type FocusEventHandler,
  type KeyboardEventHandler,
  memo,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useDebounceCallback, useResizeObserver } from "usehooks-ts"
import { useBreakpoint } from "../../hooks/useBreakpoints"
import { useIsMounted } from "../../hooks/useIsMounted"
import { useLatestValue } from "../../hooks/useLatestValue"
import { usePrevious } from "../../hooks/usePrevious"
import { toCssVariables } from "../../lib/helpers"
import { Button } from "../Button"
import { Reload } from "../Icon"
import { Tooltip } from "../Tooltip"
import s from "./Slider.module.css"

export type SliderMark = {
  value: number
  label: string
}

export type SliderProps = {
  /**
   * The current value of the slider
   */
  value: number
  /**
   * The minimum value the slider can have
   */
  min: number
  /**
   * The maximum value the slider can have
   */
  max: number
  /**
   * The step increment between slider values
   */
  step: number
  /**
   * Value that will be offered as a "reset to default" option
   */
  resetValue?: number
  /**
   * String that will be displayed in the tooltip
   * @default Reset to default
   */
  resetTooltip?: string
  /**
   * Unit to display next to the slider value (e.g., ms, px)
   */
  unit?: string
  /**
   * Unit to display to the right of the slider value (e.g., $)
   */
  prefixUnit?: string
  /**
   * Optional label for the slider, which can be a string or React node.
   */
  label?: ReactNode
  /**
   * List of marks to display below the slider track
   */
  marks?: SliderMark[]
  /**
   * Color of the slider track
   */
  trackColor?: string
  /**
   * Color of the slider progress along the track
   */
  rangeColor?: string
  className?: string
  disabled?: boolean
  /**
   * Callback function invoked when the slider value changes.
   *
   * @param value - The new value of the slider.
   */
  onChange: (value: number) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  ref?: React.Ref<ElementRef<typeof RadixSlider.Root> | null>
}

export const Slider = memo((props: SliderProps) => {
  const {
    className,
    onChange,
    min,
    max,
    step,
    disabled,
    value,
    resetValue,
    resetTooltip = "Reset to default",
    onBlur,
    onFocus,
    unit,
    prefixUnit,
    label,
    marks: propMarks = [],
    trackColor,
    rangeColor,
    ref: forwardedRef,
  } = props
  const id = useId()
  const precision = useMemo(() => String(step).split(".")[1]?.length ?? 0, [step])
  const [inputValue, setInputValue] = useState<string>(String(value.toFixed(precision)))
  const setInputValueNumber = useCallback(
    (nextValue: number) => {
      setInputValue(nextValue.toFixed(precision))
    },
    [precision],
  )

  // prevents input from jumping around while the user is typing
  const debouncedOnChange = useDebounceCallback(onChange, 250)
  const [pointerDown, setPointerDown] = useState(false)
  const isMounted = useIsMounted()

  // Used to position the input over the thumb
  const isTabletAndUp = useBreakpoint("md")
  const inputRef = useRef<HTMLInputElement>(null)

  // The input width is based on the number of characters in the input / font size
  const inputWidth = Math.max(inputValue.length, 1) * (isTabletAndUp ? 7.8 : 9.5)

  // Calculate animation duration based on the distance the thumb needs to move
  // If the pointer is down, it means the user is dragging the thumb and we want
  // to disable the animation to make the thumb move in sync with the pointer.
  const percent = (value - min) / (max - min)
  const previousPercent = usePrevious(percent)
  const animationDurationMS =
    !isMounted || pointerDown ? 0 : Math.max(Math.abs(percent - previousPercent) * 300, 100)

  // We assume that the width of the thumb does not change from render to render
  // so we can avoid the overhead of watching it with a resize observer.
  const thumbRef = useRef<HTMLDivElement>(null)

  // It should be exceedingly uncommon to change marks dynamically, and they are unlikely to be a stable array reference from consumers.
  // We are sorting so we can make assumptions about which marks have the ability to collide with each other.
  const marks = useMemo<SliderMark[]>(
    () => [...propMarks].sort((a, b) => a.value - b.value),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally limiting when this stable value changes to length of marks
    [propMarks.length],
  )

  // We make assumptions about marks in order to efficiently position them
  useEffect(() => {
    if (!marks) {
      return
    }

    const markValues = new Set<number>()

    for (const mark of marks) {
      if (mark.value < min || mark.value > max) {
        throw new Error(`Slider mark value ${mark.value} is out of bounds [${min}, ${max}]`)
      }
      if (markValues.has(mark.value)) {
        throw new Error("Slider marks must have unique values")
      }
      markValues.add(mark.value)
    }
  }, [marks, max, min])

  // Update the value if it is out of bounds due to min/max changes
  const latestValue = useLatestValue(value)
  const latestOnChange = useLatestValue(onChange)
  useEffect(() => {
    const clamped = clamp(latestValue.current, min, max)
    if (clamped !== latestValue.current) {
      latestOnChange.current(clamped)
      setInputValueNumber(clamped)
    }
  }, [max, min, latestValue, latestOnChange, setInputValueNumber])

  useEffect(() => {
    // If the input is focused then the change came from this input we
    // wait until after they blur before updating the input value to be
    // the actual value.
    if (inputRef.current !== document.activeElement) {
      setInputValueNumber(value)
    }
  }, [value, setInputValueNumber])

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (evt) => {
    // https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/
    if (evt.key === "Home") {
      evt.preventDefault()
      onChange(min)
      setInputValueNumber(min)
    }
    if (evt.key === "End") {
      evt.preventDefault()
      onChange(max)
      setInputValueNumber(max)
    }
    if (evt.key === "ArrowUp") {
      evt.preventDefault()
      const multiplier = evt.shiftKey ? 10 : 1
      const next = clamp(value + step * multiplier, min, max)
      onChange(next)
      setInputValueNumber(next)
    }
    if (evt.key === "ArrowDown") {
      evt.preventDefault()
      const multiplier = evt.shiftKey ? 10 : 1
      const next = clamp(value - step * multiplier, min, max)
      onChange(next)
      setInputValueNumber(next)
    }

    // Other keyboard actions not tied to normal slider behavior
    if (evt.key === "Enter" || evt.key === "Escape") {
      evt.preventDefault()
      evt.currentTarget.blur()
    }
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const nextValue = evt.currentTarget.value.replace(/[^\d.]/, "").trim()
    let parsed = parseFloat(nextValue || "0")
    parsed = clamp(parsed, min, max)
    if (step >= 1) {
      parsed = Math.floor(parsed)
    }
    debouncedOnChange(parsed)
    setInputValue(nextValue)
  }

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = (evt) => {
    let parsed = parseFloat(evt.target.value.trim()) || 0
    // If floats are not allowed (based on `step` value) coerce to whole number
    if (step >= 1) {
      parsed = Math.floor(parsed)
    } else {
      parsed = round(parsed, precision)
    }
    // Make sure the final value is within the min/max range (and emit a change if necessary)
    parsed = clamp(parsed, min, max)
    if (parsed !== value) {
      onChange(parsed)
    }
    setInputValueNumber(parsed)
    onBlur?.(evt)
  }

  return (
    <div className={clsx(s.SliderWrap, className)}>
      <div className={s.SliderLabel}>
        <label htmlFor={id} className="flex-1">
          {label}
        </label>
        {resetValue !== undefined && (
          <Tooltip content={resetTooltip} compact>
            <Button
              size="2xs"
              variant="ghost"
              color="secondary"
              className={s.Reset}
              data-hide={disabled || (resetValue === value && !pointerDown)}
              onClick={() => onChange(resetValue)}
            >
              <Reload />
            </Button>
          </Tooltip>
        )}
        <div className={s.SliderValue} onClick={() => inputRef.current?.focus()}>
          {prefixUnit && <span className={s.ValueUnit}>{prefixUnit}</span>}
          <input
            id={id}
            className={s.ValueInput}
            ref={inputRef}
            style={{ width: `${Math.ceil(inputWidth)}px` }}
            onKeyDown={handleKeyDown}
            value={inputValue}
            type="text"
            onClick={(e) => e.stopPropagation()}
            onBlur={handleInputBlur}
            onFocus={(e) => {
              e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)
              onFocus?.(e)
            }}
            onChange={handleInputChange}
            disabled={disabled}
          />
          {unit && <span className={s.ValueUnit}>{unit}</span>}
        </div>
      </div>
      <div className={s.SliderContainer}>
        <RadixSlider.Root
          ref={forwardedRef}
          className={s.Slider}
          onValueChange={(values) => onChange(values[0])}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={[value]}
          onBlur={onBlur}
          onFocus={onFocus}
          onPointerDown={() => setPointerDown(true)}
          onPointerUp={() => setPointerDown(false)}
          style={toCssVariables({
            "slider-duration": `${animationDurationMS}ms`,
            "slider-track-color": trackColor,
            "slider-range-color": rangeColor,
          })}
        >
          <RadixSlider.Track className={s.Track}>
            <RadixSlider.Range className={s.Range} />
          </RadixSlider.Track>
          <RadixSlider.Thumb className={s.Thumb} ref={thumbRef} />
        </RadixSlider.Root>
        {marks && <SliderMarks marks={marks} thumbRef={thumbRef} min={min} max={max} />}
      </div>
    </div>
  )
})

type MarksProps = {
  marks: SliderMark[]
  thumbRef: React.RefObject<HTMLDivElement | null>
  min: number
  max: number
}

// The minimum difference we enforce between marks, in pixels
const MINIMUM_MARK_SPACING_PX = 16

const SliderMarks = memo(({ marks, thumbRef, min, max }: MarksProps) => {
  // We seperate the container and measure divs so that our resize observer
  // does not fire when we adjust the height of the marks container.
  const marksContainerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)

  // We measure the width of the slider within this component so that sliders
  // without marks do not pay a performance penalty.
  // @ts-expect-error(2322) -- bug in types: https://github.com/juliencrn/usehooks-ts/issues/663
  const { width: sliderWidth } = useResizeObserver({ ref: measureRef })

  useLayoutEffect(() => {
    // Impossible
    if (!thumbRef.current || !marksContainerRef.current) {
      return
    }

    const markElements = Array.from(
      marksContainerRef.current.querySelectorAll("[data-mark]"),
    ) as HTMLDivElement[]

    const thumbHalfWidth = thumbRef.current.getBoundingClientRect().width / 2

    // Wipe all styles so we can accurately determine the positions of the marks
    markElements.forEach((markEl) => {
      markEl.style.width = ""
      markEl.style.display = ""
    })

    const positionMarks = () => {
      if (!sliderWidth) {
        return
      }

      markElements.forEach((markEl, index) => {
        const markValue = marks[index].value
        const valuePercent = (markValue - min) / (max - min)
        const markWidth = markEl.getBoundingClientRect().width
        const markHalfWidth = markWidth / 2

        // Radix smoothes the width of the thumb over the entire track so
        // that the thumb is always within bounds. We need to duplicate
        // this smoothing so that the marks match the observed breakpoints.
        const smoothedThumb = thumbHalfWidth - valuePercent * (thumbHalfWidth / 0.5)

        // Calculate where we would naively put the mark based on the value
        const naiveLeftOffset = valuePercent * sliderWidth

        // Add the thumb smoothing, and account for the width of the mark itself
        let left = naiveLeftOffset + smoothedThumb - markHalfWidth

        // Clamp to the left and right bounds of the container
        left = Math.max(0, Math.min(left, sliderWidth - markWidth))

        markEl.style.left = `${left}px`
      })
    }

    const marksHaveCollisions = () => {
      for (let i = 0; i < markElements.length - 1; i++) {
        const currentRect = markElements[i].getBoundingClientRect()
        const nextRect = markElements[i + 1].getBoundingClientRect()

        if (currentRect.right + MINIMUM_MARK_SPACING_PX > nextRect.left) {
          return true
        }
      }
      return false
    }

    positionMarks()

    // If we have collisions, try to wrap the content
    if (marksHaveCollisions()) {
      markElements.forEach((markEl) => {
        markEl.style.width = "min-content"
      })

      positionMarks()

      // Hide all marks if we still have collisions
      if (marksHaveCollisions()) {
        markElements.forEach((markEl) => {
          markEl.style.display = "none"
        })
      }
    }

    const tallestHeight = Math.max(
      ...markElements.map((markEl) => markEl.getBoundingClientRect().height),
    )

    // Give our container a height so that we allocate space on the page
    // for the marks and push down other content when we have to wrap
    marksContainerRef.current.style.height = tallestHeight > 0 ? `${tallestHeight}px` : ""
  }, [marks, thumbRef, marksContainerRef, min, max, sliderWidth])

  return (
    <div className={s.MarksContainer} ref={marksContainerRef}>
      <div ref={measureRef}>
        {marks.map((mark) => (
          <div key={mark.value} className={s.Mark} data-mark>
            <span className={s.MarkLabel}>{mark.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
})
