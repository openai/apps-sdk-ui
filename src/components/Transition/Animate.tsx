import clsx from "clsx"
import { TransitionGroup, type TransitionGroupProps } from "./TransitionGroup"

import { type CSSProperties } from "react"
import {
  toCssVariables,
  toFilterProperty,
  toMsDurationProperty,
  toOpacityProperty,
  toTransformProperty,
} from "../../lib/helpers"
import s from "./Animate.module.css"
import { type InitialTransitionDefinition, type TransitionDefinition } from "./shared"

export type AnimateProps = Pick<
  TransitionGroupProps,
  "as" | "children" | "className" | "insertMethod" | "preventInitialTransition"
> & {
  /** Class applied to the inner TransitionGroup */
  transitionClassName?: string
  /** Styles applied to the enter transition */
  enter?: TransitionDefinition
  /** Styles applied to the exit transition */
  exit?: TransitionDefinition
  /** Styles applied before the enter transition occurs */
  initial?: InitialTransitionDefinition
  /**
   * Determines how transition states are positioned
   * @default absolute
   */
  transitionPosition?: "absolute" | "static"
  /**
   * Applies `will-change` to force animating elements to composite layers. Use with caution!
   * @default false
   */
  forceCompositeLayer?: boolean
}

export const Animate = (props: AnimateProps) => {
  const {
    as: TagName = "span",
    className,
    children,
    preventInitialTransition,
    insertMethod,
    transitionClassName,
    transitionPosition = "absolute",
  } = props
  const { enterTotalDuration, exitTotalDuration, variables } = getAnimationProperties(props)

  return (
    <TagName
      className={clsx("block", transitionPosition === "absolute" && "relative", className)}
      data-transition-position={transitionPosition}
      style={variables}
    >
      <TransitionGroup
        as={TagName}
        className={clsx(s.TransitionItem, transitionClassName)}
        enterDuration={enterTotalDuration}
        exitDuration={exitTotalDuration}
        insertMethod={insertMethod}
        preventInitialTransition={preventInitialTransition}
      >
        {children}
      </TransitionGroup>
    </TagName>
  )
}

// Keep in sync with default values in Animate.module.css
const DEFAULT_ENTER_DURATION_MS_EASE = 400
const DEFAULT_ENTER_DURATION_MS_CUBIC = 500
const DEFAULT_EXIT_DURATION_MS_EASE = 200
const DEFAULT_EXIT_DURATION_MS_CUBIC = 300

function getAnimationProperties({
  initial: initial,
  enter: enter,
  exit: exit,
  forceCompositeLayer,
}: AnimateProps): {
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
    "tg-enter-filter": toFilterProperty(enter),
    "tg-enter-duration": toMsDurationProperty(enterDuration),
    "tg-enter-delay": toMsDurationProperty(enter?.delay ?? 0),
    "tg-enter-timing-function": enterTimingFunction,
    "tg-exit-opacity": toOpacityProperty(exit?.opacity ?? 0),
    "tg-exit-transform": exitTransform,
    "tg-exit-filter": toFilterProperty(exit),
    "tg-exit-duration": toMsDurationProperty(exitDuration),
    "tg-exit-delay": toMsDurationProperty(exit?.delay ?? 0),
    "tg-exit-timing-function": exitTimingFunction,
    "tg-initial-opacity": toOpacityProperty(initial?.opacity ?? exit?.opacity ?? 0),
    "tg-initial-transform": initialTransform === "none" ? exitTransform : initialTransform,
    "tg-initial-filter": toFilterProperty(initial ?? exit ?? {}),
  } satisfies Record<string, string>)

  const enterTotalDuration = (enter?.delay ?? 0) + enterDuration
  const exitTotalDuration = (exit?.delay ?? 0) + exitDuration

  return { enterTotalDuration, exitTotalDuration, variables }
}
