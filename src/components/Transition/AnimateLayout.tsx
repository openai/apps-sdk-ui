import clsx from "clsx"
import { useRef, type CSSProperties } from "react"
import {
  toCssVariables,
  toFilterProperty,
  toMsDurationProperty,
  toOpacityProperty,
  toTransformProperty,
  waitForAnimationFrame,
} from "../../lib/helpers"
import s from "./AnimateLayout.module.css"
import { TransitionGroup, type TransitionGroupProps } from "./TransitionGroup"
import {
  type InitialTransitionDefinition,
  type LayoutTransitionDefinition,
  type TransitionDefinition,
} from "./shared"

export type AnimateLayoutProps = Pick<
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

export const AnimateLayout = (props: AnimateLayoutProps) => {
  const {
    as: TagName = "span",
    children,
    transitionClassName,
    insertMethod,
    className,
    hideOverflow = false,
    // An initial height animation will almost never be correct. Consider carefully when overriding.
    preventInitialTransition = true,
    itemAnchor = "start",
    dimension = "height",
  } = props
  const containerRef = useRef<HTMLDivElement | null>(null)
  const captainRef = useRef<HTMLDivElement | null>(null)
  const exitTimestampRef = useRef<number | null>(null)

  const { enterTotalDuration, exitTotalDuration, variables } = getAnimationProperties(props)

  const handleEnter = (element: HTMLDivElement) => {
    const container = containerRef.current

    if (!container) {
      return
    }

    // If handleExit() was called >50ms ago, consider this a "move" and don't touch "interrupted" state
    const justExited = exitTimestampRef.current && Date.now() - exitTimestampRef.current < 50

    const anotherCaptain = !!captainRef.current
    // Look at me, I'm the captain now
    captainRef.current = element

    // Recent exits are a near guarantee we are "moving" states
    container.dataset.direction = justExited || anotherCaptain ? "move" : "in"

    // If we just exited, don't touch the interrupted state. Exit just set it with the correct state of things
    if (!justExited) {
      container.dataset.interrupted = String(!!container.style[dimension])
    }

    const clientRect = container.getBoundingClientRect()
    container.style[dimension] = `${clientRect[dimension]}px`
  }

  const handleEnterActive = (element: HTMLDivElement) => {
    const container = containerRef.current

    if (!container) {
      return
    }

    // ~Impossible to not be the captain at this point, but check anyway.
    const amICaptain = captainRef.current === element
    if (!amICaptain) {
      return
    }

    // IMPORTANT: Use clientHeight/clientWidth to measure children, in case they have scale() applied
    const value = dimension === "width" ? element.clientWidth : element.clientHeight
    container.style[dimension] = `${value}px`
  }

  const handleEnterComplete = (element: HTMLDivElement) => {
    const container = containerRef.current

    // Wait for the next tick, to ensure React has cleared `[data-entering*]` state from the DOM
    // Without this, it's possible that we release the height from the container
    // before the children in the DOM are naturally positioned (non-absolute).
    waitForAnimationFrame(() => {
      const amICaptain = captainRef.current === element
      if (!container || !amICaptain) {
        return
      }

      // Restore natural height to the DOM node
      container.style[dimension] = ""
    })
  }

  const handleExit = (element: HTMLDivElement) => {
    const container = containerRef.current
    const amICaptain = !captainRef.current || captainRef.current === element

    if (!container || !amICaptain) {
      return
    }

    // o7
    captainRef.current = null
    exitTimestampRef.current = Date.now()

    container.dataset.direction = "out"
    container.dataset.interrupted = String(!!container.style[dimension])

    const clientRect = container.getBoundingClientRect()
    container.style[dimension] = `${clientRect[dimension]}px`
  }

  const handleExitActive = (_element: HTMLDivElement) => {
    const container = containerRef.current
    const newCaptainExists = !!captainRef.current

    // If another component has become the captain, exit early
    if (!container || newCaptainExists) {
      return
    }

    // Animate to zero layout
    container.style[dimension] = "0"
  }

  const handleExitComplete = (_element: HTMLDivElement) => {
    // Wait for the next tick, to ensure React has cleared `[data-exiting*]` state from the DOM
    waitForAnimationFrame(() => {
      const container = containerRef.current
      const newCaptainExists = !!captainRef.current

      // If another component has become the captain, exit early
      if (!container || newCaptainExists) {
        return
      }

      // Restore natural height to the DOM node
      container.style[dimension] = ""
    })
  }

  return (
    <TagName
      ref={containerRef}
      className={clsx(s.Layout, className)}
      style={variables}
      data-item-anchor={itemAnchor}
      data-clip={hideOverflow}
      data-dimension={dimension}
    >
      <TransitionGroup
        as={TagName}
        className={clsx(s.TransitionItem, transitionClassName)}
        insertMethod={insertMethod}
        enterDuration={enterTotalDuration}
        exitDuration={exitTotalDuration}
        preventInitialTransition={preventInitialTransition}
        onEnter={handleEnter}
        onEnterActive={handleEnterActive}
        onEnterComplete={handleEnterComplete}
        onExit={handleExit}
        onExitActive={handleExitActive}
        onExitComplete={handleExitComplete}
      >
        {children}
      </TransitionGroup>
    </TagName>
  )
}

// Keep in sync with default values in AnimateLayout.module.css
const DEFAULT_LAYOUT_ENTER_DURATION_MS = 300
const DEFAULT_LAYOUT_ENTER_DELAY_MS = 0
const DEFAULT_LAYOUT_EXIT_DURATION_MS = 300
const DEFAULT_LAYOUT_EXIT_DELAY_MS = 0
const DEFAULT_LAYOUT_MOVE_DURATION_MS = 300
const DEFAULT_LAYOUT_MOVE_DELAY_MS = 0
const DEFAULT_ENTER_DURATION_MS_EASE = 300
const DEFAULT_ENTER_DURATION_MS_CUBIC = 300
const DEFAULT_ENTER_DELAY_MS = 100
const DEFAULT_EXIT_DURATION_MS_EASE = 200
const DEFAULT_EXIT_DURATION_MS_CUBIC = 200
const DEFAULT_EXIT_DELAY_MS = 0

function getAnimationProperties({
  initial,
  enter,
  exit,
  forceCompositeLayer,
  layoutEnter,
  layoutExit,
  layoutMove,
}: AnimateLayoutProps): {
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
    "tg-layout-move-delay": toMsDurationProperty(layoutMove?.delay ?? DEFAULT_LAYOUT_MOVE_DELAY_MS),
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
