import { useEffect, useState, type ReactNode } from "react"

import clsx from "clsx"
import s from "./ShimmerText.module.css"

// If text will always shimmer, use the simpler interface
export const ShimmerText = ({
  as: Tag = "div",
  children,
  className,
}: {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"
  children: ReactNode
  className?: string
}) => {
  return <Tag className={clsx(s.Shimmer, className)}>{children}</Tag>
}

// If text may end shimmering after playing for a time, or resume, use shimmerable text
export const ShimmerableText = ({
  as: Tag = "div",
  children,
  className,
  shimmer = false,
  ...restProps
}: {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"
  children: ReactNode
  className?: string
  shimmer?: boolean
}) => {
  const [paused, setPaused] = useState(!shimmer)

  // Pauses the animation at the start of (what would be) the next iteration.
  const handleAnimationIteration = () => {
    setPaused(true)
  }

  useEffect(() => {
    if (shimmer) {
      // Ensure pause is cleared if shimmer is re-enabled
      setPaused(false)
    }
  }, [shimmer])

  return (
    <Tag
      {...restProps}
      className={clsx(s.Shimmer, className)}
      onAnimationIteration={shimmer ? undefined : handleAnimationIteration}
      data-idle={paused ? "" : undefined}
    >
      {children}
    </Tag>
  )
}
