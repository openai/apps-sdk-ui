"use client"

import { TransitionGroup, type TransitionGroupProps } from "./TransitionGroup"

import clsx from "clsx"
import { type CSSProperties } from "react"
import {
  toCssVariables,
  toFilterProperty,
  toMsDurationProperty,
  toOpacityProperty,
  toTransformProperty,
  waitForAnimationFrame,
} from "../../lib/helpers"
import s from "./AnimateLayoutGroup.module.css"
import {
  type InitialTransitionDefinition,
  type LayoutTransitionDefinition,
  NonNullChildren,
  type TransitionDefinition,
} from "./shared"

export type AnimateLayoutGroupProps = Pick<
  TransitionGroupProps,
  "as" | "children" | "className" | "insertMethod" | "preventInitialTransition"
> & {
  /**
   * Determines if `overflow: hidden` is applied to the wrapper element
   * @default false
   */
  hideOverflow?: boolean
  /**
   * Determines which side of the container the items will pin to during enter/exit
   * @default "start"
   */
  itemAnchor?: "start" | "end"
  /**
   * Determines which property will be animated during transitions
   * @default "height"
   */
  dimension?: "width" | "height"
  layoutEnter?: LayoutTransitionDefinition
  layoutExit?: LayoutTransitionDefinition
  layoutMove?: LayoutTransitionDefinition

  enter?: TransitionDefinition
  exit?: TransitionDefinition
  initial?: InitialTransitionDefinition
  /** Class applied to the inner TransitionGroup */
  transitionClassName?: string
  /**
   * Applies `will-change` to force animating elements to composite layers. Use with caution!
   * @default false
   */
  forceCompositeLayer?: boolean
}

export const AnimateLayoutGroup = (props: AnimateLayoutGroupProps) => {
  const {
    as: TagName = "span",
    children,
    className,
    transitionClassName,
    dimension = "height",
  } = props
  const { enterTotalDuration, exitTotalDuration, variables } = getAnimationProperties(props)

  const handleEnter = (element: HTMLDivElement) => {
    // Stage zero layout
    element.style[dimension] = "0"
  }

  const handleEnterActive = (element: HTMLDivElement) => {
    waitForAnimationFrame(() => {
      // Animate to target height
      // IMPORTANT: Use clientHeight/clientWidth to measure children, in case they have scale() applied
      const value =
        dimension === "width"
          ? element.firstElementChild?.clientWidth
          : element.firstElementChild?.clientHeight

      element.style[dimension] = `${value ?? 0}px`
    })
  }

  const handleEnterComplete = (element: HTMLDivElement) => {
    waitForAnimationFrame(() => {
      // Restore natural layout to the DOM node
      element.style[dimension] = ""
    })
  }

  const handleExit = (element: HTMLDivElement) => {
    element.style[dimension] = `${element.getBoundingClientRect()[dimension]}px`
  }

  const handleExitActive = (element: HTMLDivElement) => {
    waitForAnimationFrame(() => {
      // Animate to zero layout
      element.style[dimension] = "0"
    })
  }

  return (
    <TransitionGroup
      as={TagName}
      className={clsx(s.LayoutItem, className)}
      style={variables}
      // Adding 32ms to timers because of the additional waitForAnimationFrame() calls
      enterDuration={enterTotalDuration + 32}
      exitDuration={exitTotalDuration + 32}
      onEnter={handleEnter}
      onEnterActive={handleEnterActive}
      onEnterComplete={handleEnterComplete}
      onExit={handleExit}
      onExitActive={handleExitActive}
    >
      {NonNullChildren(children).map((child) => (
        // Ensure any falsy child.key value is sent specifically as `undefined`.
        // This ensures that key is not misinterpreted as a string 'null', 'false', etc.
        <TagName
          className={clsx(s.TransitionItem, transitionClassName)}
          // @ts-expect-error Pass-through the validation of `key` to <TransitionGroup>
          key={child.key || undefined}
          data-dimension={dimension}
        >
          {child}
        </TagName>
      ))}
    </TransitionGroup>
  )
}

// Keep in sync with default values in AnimateLayout.module.css
const DEFAULT_LAYOUT_ENTER_DURATION_MS = 300
const DEFAULT_LAYOUT_ENTER_DELAY_MS = 0
const DEFAULT_LAYOUT_EXIT_DURATION_MS = 300
const DEFAULT_LAYOUT_EXIT_DELAY_MS = 50
const DEFAULT_LAYOUT_MOVE_DURATION_MS = 300
const DEFAULT_LAYOUT_MOVE_DELAY_MS = 0
const DEFAULT_ENTER_DURATION_MS_EASE = 400
const DEFAULT_ENTER_DURATION_MS_CUBIC = 400
const DEFAULT_ENTER_DELAY_MS = 150
const DEFAULT_EXIT_DURATION_MS_EASE = 200
const DEFAULT_EXIT_DURATION_MS_CUBIC = 300
const DEFAULT_EXIT_DELAY_MS = 0

function getAnimationProperties({
  initial,
  enter,
  exit,
  forceCompositeLayer,
  layoutEnter,
  layoutExit,
  layoutMove,
}: AnimateLayoutGroupProps): {
  enterTotalDuration: number
  exitTotalDuration: number
  variables: CSSProperties
} {
  // Dynamically inspect if we're transitioning transform properties, and apply cubic curves and timings as defaults
  const initialTransform = toTransformProperty(initial)
  const enterTransform = toTransformProperty(enter)
  const exitTransform = toTransformProperty(exit)
  const isCubicTransition = [initialTransform, exitTransform, enterTransform].some(
    (t) => t !== "none",
  )
  const enterDuration =
    enter?.duration ??
    (isCubicTransition ? DEFAULT_ENTER_DURATION_MS_CUBIC : DEFAULT_ENTER_DURATION_MS_EASE)
  const enterTimingFunction =
    enter?.timingFunction ?? (isCubicTransition ? "var(--cubic-enter)" : "ease")
  const exitDuration =
    exit?.duration ??
    (isCubicTransition ? DEFAULT_EXIT_DURATION_MS_CUBIC : DEFAULT_EXIT_DURATION_MS_EASE)
  const exitTimingFunction =
    exit?.timingFunction ?? (isCubicTransition ? "var(--cubic-exit)" : "ease")

  // Generate variable overrides from props
  const variables = toCssVariables({
    "tg-will-change": forceCompositeLayer ? "transform, opacity" : "auto",
    "tg-enter-opacity": toOpacityProperty(enter?.opacity ?? 1),
    "tg-enter-transform": enterTransform,
    "tg-enter-filter": toFilterProperty(enter ?? {}),
    "tg-enter-duration": toMsDurationProperty(enterDuration),
    "tg-enter-delay": toMsDurationProperty(enter?.delay ?? DEFAULT_ENTER_DELAY_MS),
    "tg-enter-timing-function": enterTimingFunction,
    "tg-exit-opacity": toOpacityProperty(exit?.opacity ?? 0),
    "tg-exit-transform": exitTransform,
    "tg-exit-filter": toFilterProperty(exit ?? {}),
    "tg-exit-duration": toMsDurationProperty(exitDuration),
    "tg-exit-delay": toMsDurationProperty(exit?.delay ?? DEFAULT_EXIT_DELAY_MS),
    "tg-exit-timing-function": exitTimingFunction,
    "tg-initial-opacity": toOpacityProperty(initial?.opacity ?? exit?.opacity ?? 0),
    "tg-initial-transform": initialTransform === "none" ? exitTransform : initialTransform,
    "tg-initial-filter": toFilterProperty(initial ?? exit ?? {}),
    "tg-layout-enter-duration": toMsDurationProperty(
      layoutEnter?.duration ?? DEFAULT_LAYOUT_ENTER_DURATION_MS,
    ),
    "tg-layout-enter-delay": toMsDurationProperty(
      layoutEnter?.delay ?? DEFAULT_LAYOUT_ENTER_DELAY_MS,
    ),
    "tg-layout-enter-timing-function": layoutEnter?.timingFunction ?? "var(--cubic-move)",
    "tg-layout-exit-duration": toMsDurationProperty(
      layoutExit?.duration ?? DEFAULT_LAYOUT_EXIT_DURATION_MS,
    ),
    "tg-layout-exit-delay": toMsDurationProperty(layoutExit?.delay ?? DEFAULT_LAYOUT_EXIT_DELAY_MS),
    "tg-layout-exit-timing-function": layoutExit?.timingFunction ?? "var(--cubic-move)",
    "tg-layout-move-duration": toMsDurationProperty(
      layoutMove?.duration ?? DEFAULT_LAYOUT_MOVE_DURATION_MS,
    ),
    "tg-layout-move-delay": toMsDurationProperty(
      layoutMove?.delay ?? DEFAULT_LAYOUT_MOVE_DURATION_MS,
    ),
    "tg-layout-move-timing-function": layoutMove?.timingFunction ?? "var(--cubic-move)",
  } satisfies Record<string, string>)

  const enterTotalDuration =
    (enter?.delay ?? DEFAULT_ENTER_DELAY_MS) + (enterDuration ?? DEFAULT_ENTER_DURATION_MS_EASE)
  const exitTotalDuration =
    (exit?.delay ?? DEFAULT_EXIT_DELAY_MS) + (exitDuration ?? DEFAULT_EXIT_DURATION_MS_EASE)
  const layoutEnterTotalDuration =
    (layoutEnter?.delay ?? DEFAULT_LAYOUT_ENTER_DELAY_MS) +
    (layoutEnter?.duration ?? DEFAULT_LAYOUT_ENTER_DURATION_MS)
  const layoutExitTotalDuration =
    (layoutExit?.delay ?? DEFAULT_LAYOUT_EXIT_DELAY_MS) +
    (layoutExit?.duration ?? DEFAULT_LAYOUT_EXIT_DURATION_MS)
  const layoutMoveTotalDuration =
    (layoutMove?.delay ?? DEFAULT_LAYOUT_MOVE_DELAY_MS) +
    (layoutMove?.duration ?? DEFAULT_LAYOUT_MOVE_DURATION_MS)

  return {
    // In order for us to release layout dimensions (e.g., height) to the natural DOM state,
    // we must ensure the behaviors from the TransitionGroup callbacks are synced with the outer layout `transitions`.
    // Setting TransitionGroup timing to the max of these durations is the simplest approach.
    // In practice, these should only vary by about 50-200ms at most; imperceivable to end-users.
    enterTotalDuration: Math.max(
      enterTotalDuration,
      layoutEnterTotalDuration,
      layoutMoveTotalDuration,
    ),
    exitTotalDuration: Math.max(
      exitTotalDuration,
      layoutExitTotalDuration,
      layoutMoveTotalDuration,
    ),
    variables,
  }
}
