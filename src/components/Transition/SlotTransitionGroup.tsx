"use client"

import React, {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react"
import { mergeRefs } from "react-merge-refs"

import { waitForAnimationFrame } from "../../lib/helpers"

// (no-op) clsx removed: className is not managed at group-level for slotted children
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
import { getInitialTransitionState, transitionReducer } from "./transitionReducer"

type SlotTransitionGroupChildProps = {
  component: ReactElementWithKey
  preventMountTransition?: boolean
  shouldRender: boolean
  enterDuration: number
  exitDuration: number
  enterMountDelay?: number
  removeChild: () => void
  ref?: React.Ref<unknown>
} & TransitionGroupChildCallbacks

const SlotTransitionGroupChildInner = ({
  ref,
  component,
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
}: SlotTransitionGroupChildProps) => {
  const [state, dispatch] = useReducer(
    transitionReducer,
    getInitialTransitionState(preventMountTransition || false),
  )
  const preventedMountTransition = useRef<boolean>(false)
  const elementRef = useRef<HTMLDivElement | null>(null)
  const enterDurationRef = useRef<number>(enterDuration)
  enterDurationRef.current = enterDuration
  const exitDurationRef = useRef<number>(exitDuration)
  exitDurationRef.current = exitDuration

  const lastCallbackRef = useRef<CallbackType>(null as unknown as CallbackType)
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

  /**
   * IMPORTANT: `useLayoutEffect()` is used here to avoid race conditions between new SlotTransitionGroupChild components.
   */
  useLayoutEffect(() => {
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
    // This value is immutable after <SlotTransitionGroup> is created, and does not change on re-renders.
    preventMountTransition,
    removeChild,
    triggerCallback,
  ])

  useEffect(() => {
    // Required for <StrictMode>
    return () => {
      preventedMountTransition.current = false
    }
  }, [])

  const original = component

  const mergedRef = mergeRefs<unknown>([
    elementRef as unknown as React.Ref<unknown>,
    ref as unknown as React.Ref<unknown>,
    ((original as unknown as { ref?: React.Ref<unknown> }).ref ?? null) as React.Ref<unknown>,
  ])

  const nextProps = {
    "data-entering": state.enter ? "" : undefined,
    "data-entering-active": state.enterActive ? "" : undefined,
    "data-exiting": state.exit ? "" : undefined,
    "data-exiting-active": state.exitActive ? "" : undefined,
    "data-interrupted": state.interrupted ? "" : undefined,
    "ref": mergedRef,
  }

  return React.isValidElement(original) ? React.cloneElement(original, nextProps) : null
}

const SlotTransitionGroupChild = (props: SlotTransitionGroupChildProps) => {
  const { enterMountDelay, preventMountTransition } = props
  const mountDelay = !preventMountTransition && enterMountDelay != null ? enterMountDelay : null
  const [mounted, setMounted] = useState(mountDelay == null)
  useTimeout(() => setMounted(true), mounted ? null : mountDelay)

  return mounted ? <SlotTransitionGroupChildInner {...props} /> : null
}

export type SlotTransitionGroupProps = {
  /** Components controlled by SlotTransitionGroup rendering */
  children: React.ReactNode
  /** Determines the amount of time that the enter state is applied during mounting */
  enterDuration?: number
  /** Determines the amount of time that the exit state is applied before unmounting */
  exitDuration?: number
  /**
   * Determines if children should have an enter transition applied during mounting of the group.
   * @default true
   */
  preventInitialTransition?: boolean
  /** Delay in MS to wait before mounting a child. `null` for no delay (default). */
  enterMountDelay?: number
  /** Render children changes immediately, bypassing transition timings */
  disableAnimations?: boolean
  /** Determines how new children are added to the children array */
  insertMethod?: "append" | "prepend"
  /** Ref for the SlotTransitionGroup (applied to the single child when possible) */
  ref?: React.Ref<unknown>
} & Partial<TransitionGroupChildCallbacks>

type RenderChild = {
  component: ReactElementWithKey
  shouldRender: boolean
  preventMountTransition?: boolean
  removeChild: () => void
} & TransitionGroupChildCallbacks

export const SlotTransitionGroup = (props: SlotTransitionGroupProps) => {
  const {
    ref,
    children,
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
  Children.forEach(children, (child) => {
    // @ts-expect-error - We know `key` might not exist on certain types, that's why we're checking
    if (child && !child.key) {
      throw new Error("Child elements of <SlotTransitionGroup /> must include a `key`")
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
      // Lock this value to whatever the value was on initial render of the group.
      preventMountTransition: preventInitialTransition,
    }))
  })

  // IMPORTANT: useLayoutEffect is required to satisfy render timings for prop updates to input elements
  useLayoutEffect(() => {
    setRenderChildren((currentRenderChildren): RenderChild[] => {
      const propChildrenArray = ChildrenWithKeys(children, false, "SlotTransitionGroup")
      return computeNextRenderChildren(
        propChildrenArray,
        currentRenderChildren,
        createDefaultRenderChildProps,
        insertMethod,
      )
    })
  }, [children, insertMethod, createDefaultRenderChildProps])

  // Prevent mistakes with forwardRef() by ensuring single child usage within the group.
  assertSingleChildWhenRef("SlotTransitionGroup", ref, Children.count(children))

  if (disableAnimations) {
    // Fast path: when animations are disabled and no ref is provided, render children as-is.
    if (!ref) {
      return <>{children}</>
    }

    // If a ref is provided, attach it to the (single) child by cloning.
    return (
      <>
        {Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child
          const original = child as ReactElementWithKey
          const merged = mergeRefs<unknown>([
            ref as unknown as React.Ref<unknown>,
            ((original as unknown as { ref?: React.Ref<unknown> }).ref ??
              null) as React.Ref<unknown>,
          ])
          const nextProps = { ref: merged }
          return React.cloneElement(original, nextProps)
        })}
      </>
    )
  }

  return (
    <>
      {renderChildren.map(({ component, ...restProps }) => (
        <SlotTransitionGroupChild
          key={component.key}
          {...restProps}
          component={component}
          enterDuration={enterDuration}
          exitDuration={exitDuration}
          enterMountDelay={enterMountDelay}
          ref={ref}
        />
      ))}
    </>
  )
}
