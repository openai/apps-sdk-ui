import { type CSSProperties } from "react"
import type { Pretty } from "./utilityTypes"

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export const handlePressableMouseEnter = (evt: React.MouseEvent) => {
  const target = evt.currentTarget

  // Safely coerce type to HTMLElement so TS is peaceful with `evt.target`
  if (!(target instanceof HTMLElement)) {
    return
  }

  const elementWidth = target.offsetWidth

  let scale = 0.985

  if (elementWidth <= 80) {
    scale = 0.96
  } else if (elementWidth <= 150) {
    scale = 0.97
  } else if (elementWidth <= 220) {
    scale = 0.98
  } else if (elementWidth > 600) {
    scale = 0.995
  }

  target.style.setProperty("--scale", scale.toString())
}

interface CancelAnimationFrame {
  (): void
}

export const waitForAnimationFrame = (
  cb: () => void,
  options?: { frames: number },
): CancelAnimationFrame => {
  // Browsers will sometimes decide to pause execution of animation frames
  // when the window is hidden. In these cases, bypass requestAnimationFrame.
  if (document.visibilityState === "hidden") {
    // Run callback immediately, at the end of the next tick
    const id = setTimeout(cb)
    return () => {
      clearTimeout(id)
    }
  }

  let frames = options?.frames ?? 2
  let animationFrame = requestAnimationFrame(function recurse() {
    frames -= 1
    if (frames === 0) {
      cb()
    } else {
      animationFrame = requestAnimationFrame(recurse)
    }
  })

  return () => {
    cancelAnimationFrame(animationFrame)
  }
}

export const toCssVariables = (
  variables: Record<string, string | number | undefined>,
): CSSProperties => {
  const formattedVariables = Object.keys(variables).reduce(
    (acc, variable) => {
      // Ensure value is truthy
      const value = variables[variable]
      // Accept 0 as a valid value
      if (value || value === 0) {
        // Add the prefix if it wasn't already provided
        const prefix = variable.startsWith("--") ? "" : "--"
        const formattedValue = typeof value === "number" ? `${value}px` : value

        acc[`${prefix}${variable}`] = formattedValue
      }

      return acc
    },
    {} as Record<string, string>,
  )

  // Safe casting because we know we've formatted an object of CSS Variable strings
  return formattedVariables as CSSProperties
}

export const toAngle = (value: number | string): string =>
  typeof value === "number" ? `${value}deg` : value

export const toOpacityProperty = (opacity: number): string => String(opacity)

export const toMsDurationProperty = (duration: number): string => `${duration}ms`

export const toTransformProperty = ({
  x,
  y,
  scale,
  rotate,
  skewX,
  skewY,
}: {
  x?: number
  y?: number
  scale?: number
  rotate?: number | string
  skewX?: number | string
  skewY?: number | string
} = {}): string => {
  const transforms = [
    x == null ? null : `translateX(${x}px)`,
    y == null ? null : `translateY(${y}px)`,
    scale == null ? null : `scale(${scale})`,
    rotate == null ? null : `rotate(${toAngle(rotate)})`,
    skewX == null ? null : `skewX(${toAngle(skewX)})`,
    skewY == null ? null : `skewY(${toAngle(skewY)})`,
  ].filter(Boolean)

  return transforms.length ? transforms.join(" ") : "none"
}

export const toFilterProperty = ({ blur }: { blur?: number | undefined } = {}) => {
  // Maybe add more support in the future
  const filters = [blur == null ? null : `blur(${blur}px)`].filter(Boolean)

  return filters.length ? filters.join(" ") : "none"
}

export const preventDefaultHandler = (evt: Event) => {
  evt.preventDefault()
}

/*
 * Intentionally simple selector string. Purposeful exclusions: (for now)
 * - select, because our selects are better recognized as button
 * - unused selectors like iframe, object, .etc.
 * - states like [inert]
 */
export const focusableElements = (element: HTMLElement) =>
  element.querySelectorAll<HTMLElement>(
    'a[href], input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex^="-"]), [contenteditable]',
  )

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms))

/**
 * Group an array of objects by a property, preserving the *first-seen* order
 * of each group.
 *
 * @example
 * groupByOrdered(people, "team")
 * // => [ { team: "infra", items:[...] }, { team:"design", items:[...] }, ... ]
 */
export function groupByProperty<T extends object, K extends keyof T, F = T[K]>(
  items: T[],
  key: K,
  format: (raw: T[K], item: T) => F = (raw) => raw as F,
) {
  const groups: Pretty<{ [P in K]: F } & { items: T[] }>[] = []
  const indexMap = new Map<unknown, number>() // maps group value -> index in groups array

  for (const item of items) {
    const value = format(item[key], item)

    // Add to existing group
    const existing = indexMap.get(value)
    if (existing !== undefined) {
      groups[existing].items.push(item)
      continue
    }

    // Create new group
    const group = { [key]: value, items: [item] } as { [P in K]: F } & { items: T[] }
    indexMap.set(value, groups.length)
    groups.push(group)
  }

  return groups
}
