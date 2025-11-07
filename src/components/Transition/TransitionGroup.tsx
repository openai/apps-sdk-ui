import React, {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import { mergeRefs } from "react-merge-refs"

import { waitForAnimationFrame } from "../../lib/helpers"

import clsx from "clsx"
import { useTimeout } from "usehooks-ts"
import getDisableAnimations from "./getDisableAnimations"
import {
  assertSingleChildWhenRef,
  ChildrenWithKeys,
  computeNextRenderChildren,
  noop,
  useChildCallback,
  type CallbackType,
  type ReactElementWithKey,
  type TransitionGroupChildCallbacks,
} from "./shared"
import s from "./TransitionGroup.module.css"
import { getInitialTransitionState, transitionReducer } from "./transitionReducer"

type TransitionGroupChildProps = {
  as: "div" | "span"
  children: React.ReactNode
  className?: string
  transitionId?: string
  style?: CSSProperties
  preventMountTransition?: boolean
  shouldRender: boolean
  enterDuration: number
  exitDuration: number
  enterMountDelay?: number
  removeChild: () => void
  ref?: React.Ref<unknown>
} & TransitionGroupChildCallbacks

const TransitionGroupChildInner = ({
  ref: forwardedRef,
  as: TagName,
  children,
  className,
  transitionId,
  style,
  preventMountTransition,
  shouldRender,
  enterDuration,
  exitDuration,
  removeChild,
  onEnter,
  onEnterActive,
  onEnterComplete,
  onExit,
  onExitActive,
  onExitComplete,
}: TransitionGroupChildProps) => {
  const [state, dispatch] = useReducer(
    transitionReducer,
    getInitialTransitionState(preventMountTransition || false),
  )
  // Allow a child to prevent mount transition, but still experience
  // future enter transition events, when applicable.
  const preventedMountTransition = useRef<boolean>(false)
  const elementRef = useRef<HTMLDivElement | null>(null)
  // Duration values should not affect hook re-renders, so we create refs for them
  const enterDurationRef = useRef<number>(enterDuration)
  enterDurationRef.current = enterDuration
  const exitDurationRef = useRef<number>(exitDuration)
  exitDurationRef.current = exitDuration

  const lastCallbackRef = useRef<CallbackType>(null)
  const triggerCallback = useCallback(
    (callbackType: CallbackType) => {
      const element = elementRef.current

      if (!element || callbackType === lastCallbackRef.current) {
        return
      }

      lastCallbackRef.current = callbackType

      switch (callbackType) {
        case "enter":
          onEnter(element)
          break
        case "enter-active":
          onEnterActive(element)
          break
        case "enter-complete":
          onEnterComplete(element)
          break
        case "exit":
          onExit(element)
          break
        case "exit-active":
          onExitActive(element)
          break
        case "exit-complete":
          onExitComplete(element)
          break
        default:
          callbackType satisfies never
          break
      }
    },
    [onEnter, onEnterActive, onEnterComplete, onExit, onExitActive, onExitComplete],
  )

  React.useLayoutEffect(() => {
    // Exit transition
    if (!shouldRender) {
      let exitTimeout: number | undefined

      dispatch({ type: "exit-before" })
      triggerCallback("exit")

      const cancelAnimationFrame = waitForAnimationFrame(() => {
        dispatch({ type: "exit-active" })
        triggerCallback("exit-active")

        exitTimeout = window.setTimeout(() => {
          triggerCallback("exit-complete")
          removeChild()
        }, exitDurationRef.current)
      })

      return () => {
        cancelAnimationFrame()
        if (exitTimeout !== undefined) clearTimeout(exitTimeout)
      }
    }

    // Enter transition

    // Check if we need to prevent this specific entering cycle
    if (preventMountTransition && !preventedMountTransition.current) {
      // Mark initial transition as prevented and short-circuit.
      preventedMountTransition.current = true
      return
    }

    let enterTimeout: number | undefined

    dispatch({ type: "enter-before" })
    triggerCallback("enter")

    const cancelAnimationFrame = waitForAnimationFrame(() => {
      dispatch({ type: "enter-active" })
      triggerCallback("enter-active")

      enterTimeout = window.setTimeout(() => {
        dispatch({ type: "done" })
        triggerCallback("enter-complete")
      }, enterDurationRef.current)
    })

    return () => {
      cancelAnimationFrame()
      if (enterTimeout !== undefined) clearTimeout(enterTimeout)
    }
  }, [
    shouldRender,
    // This value is immutable after <TransitionGroup> is created, and does not change on re-renders.
    preventMountTransition,
    removeChild,
    triggerCallback,
  ])

  useEffect(() => {
    // Required for <StrictMode>, because we need to unset this token
    // when the hooks are re-run. It's an imperative effect that we need to manage.
    return () => {
      preventedMountTransition.current = false
    }
  }, [])

  return (
    <TagName
      ref={mergeRefs([elementRef, forwardedRef])}
      className={clsx(className, s.TransitionGroupChild)}
      data-transition-id={transitionId}
      style={style}
      data-entering={state.enter ? "" : undefined}
      data-entering-active={state.enterActive ? "" : undefined}
      data-exiting={state.exit ? "" : undefined}
      data-exiting-active={state.exitActive ? "" : undefined}
      data-interrupted={state.interrupted ? "" : undefined}
    >
      {children}
    </TagName>
  )
}

const TransitionGroupChild = (props: TransitionGroupChildProps) => {
  // Don't spread these out of props - pass all props to inner child
  const { enterMountDelay, preventMountTransition } = props
  // Mount gating occurs when enterMountDelay exists, and isn't initial mount
  // Otherwise, this flag is a no-op and the TransitionChild mounts normally.
  const mountDelay = !preventMountTransition && enterMountDelay != null ? enterMountDelay : null
  const [mounted, setMounted] = useState(mountDelay == null)
  useTimeout(() => setMounted(true), mounted ? null : mountDelay)

  return mounted ? <TransitionGroupChildInner {...props} /> : null
}

export type TransitionGroupProps = {
  /** Components controlled by TransitionGroup rendering */
  children: React.ReactNode
  /** Determines the tag used by wrapping elements */
  as?: "div" | "span"
  /** Class passed to wrapping elements */
  className?: string
  /** Identifier passed to wrapping elements as `[data-transition-id]` */
  transitionId?: string
  /** Determines the amount of time that the enter state is applied during mounting */
  enterDuration?: number
  /** Determines the amount of time that the exit state is applied before unmounting */
  exitDuration?: number
  /**
   * Determines if children should have an enter transition applied during mounting of the TransitionGroup.
   * @default true
   */
  preventInitialTransition?: boolean
  /** Delay in MS to wait before mounting a child. `null` for no delay (default). */
  enterMountDelay?: number
  /** Render children changes immediately, bypassing transition timings */
  disableAnimations?: boolean
  /** Determines how new children are added to the children array */
  insertMethod?: "append" | "prepend"
  /** Styles applied to wrapping elements */
  style?: CSSProperties
  /** Ref for the TransitionGroup */
  ref?: React.Ref<unknown>
} & Partial<TransitionGroupChildCallbacks>

type RenderChild = {
  component: ReactElementWithKey
  shouldRender: boolean
  preventMountTransition?: boolean
  removeChild: () => void
} & TransitionGroupChildCallbacks

export const TransitionGroup = (props: TransitionGroupProps) => {
  const {
    ref: forwardedRef,
    as: TagName = "span",
    children,
    className,
    transitionId,
    style,
    enterDuration = 0,
    exitDuration = 0,
    preventInitialTransition = true,
    enterMountDelay,
    insertMethod = "append",
    disableAnimations = getDisableAnimations(),
  } = props
  // Create stable, mutable references for all callbacks
  const onEnter = useChildCallback(props.onEnter ?? noop)
  const onEnterActive = useChildCallback(props.onEnterActive ?? noop)
  const onEnterComplete = useChildCallback(props.onEnterComplete ?? noop)
  const onExit = useChildCallback(props.onExit ?? noop)
  const onExitActive = useChildCallback(props.onExitActive ?? noop)
  const onExitComplete = useChildCallback(props.onExitComplete ?? noop)

  // Ensure all children are provided with keys.
  // Cannot reliably use Children.toArray() because `key` is processed: https://reactjs.org/docs/react-api.html#reactchildrentoarray
  Children.forEach(children, (child) => {
    // @ts-expect-error - We know `key` might not exist on certain types, that's why we're checking
    if (child && !child.key) {
      throw new Error("Child elements of <TransitionGroup /> must include a `key`")
    }
  })

  const createDefaultRenderChildProps = useCallback(
    (child: ReactElementWithKey): RenderChild => ({
      component: child,
      shouldRender: true,
      removeChild: () => {
        setRenderChildren((currentRenderChildren) =>
          currentRenderChildren.filter((c) => child.key !== c.component.key),
        )
      },
      onEnter,
      onEnterActive,
      onEnterComplete,
      onExit,
      onExitActive,
      onExitComplete,
    }),
    [onEnter, onEnterActive, onEnterComplete, onExit, onExitActive, onExitComplete],
  )

  const [renderChildren, setRenderChildren] = useState<RenderChild[]>((): RenderChild[] => {
    return ChildrenWithKeys(children).map((child) => ({
      ...createDefaultRenderChildProps(child),
      // Lock this value to whatever the value was on initial render of the TransitionGroup.
      // It doesn't make sense to change this once it is mounted.
      preventMountTransition: preventInitialTransition,
    }))
  })

  useLayoutEffect(() => {
    setRenderChildren((currentRenderChildren): RenderChild[] => {
      const propChildrenArray = ChildrenWithKeys(children)
      return computeNextRenderChildren(
        propChildrenArray,
        currentRenderChildren,
        createDefaultRenderChildProps,
        insertMethod,
      )
    })
  }, [children, insertMethod, createDefaultRenderChildProps])

  // Prevent mistakes with forwardRef() by ensuring single child usage within the group.
  assertSingleChildWhenRef("TransitionGroup", forwardedRef, Children.count(children))

  if (disableAnimations) {
    return (
      <>
        {Children.map(children, (child) => (
          <TagName
            // @ts-expect-error -- TS is not happy about this forwardedRef, but it's fine.
            ref={forwardedRef}
            className={className}
            style={style}
            data-transition-id={transitionId}
          >
            {child}
          </TagName>
        ))}
      </>
    )
  }

  return (
    <>
      {renderChildren.map(({ component, ...restProps }) => (
        <TransitionGroupChild
          key={component.key}
          {...restProps}
          as={TagName}
          className={className}
          transitionId={transitionId}
          enterDuration={enterDuration}
          exitDuration={exitDuration}
          enterMountDelay={enterMountDelay}
          style={style}
          ref={forwardedRef}
        >
          {component}
        </TransitionGroupChild>
      ))}
    </>
  )
}
