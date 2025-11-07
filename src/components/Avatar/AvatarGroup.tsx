import clsx from "clsx"
import { Children, cloneElement, isValidElement, type ReactNode } from "react"
import { toCssVariables } from "../../lib/helpers"
import s from "./AvatarGroup.module.css"

export type AvatarGroupProps = {
  /** Class name passed to the group container */
  className?: string
  /**
   * Determines stacking layer order
   * @default start
   */
  stack?: "start" | "end"
  /** Size all avatars in the group, in pixels. */
  size?: number
  children: ReactNode
}

export const AvatarGroup = ({ className, stack = "start", size, children }: AvatarGroupProps) => {
  const childrenArray = Children.toArray(children)
  // Conditionally reverse the array depending on desired stacking priority
  const maybeReversedChildren = stack === "start" ? childrenArray.slice().reverse() : childrenArray

  return (
    <div
      className={clsx(s.Group, className)}
      data-stack={stack}
      style={toCssVariables({
        "avatar-size": size,
      })}
    >
      {maybeReversedChildren.map((child) => (isValidElement(child) ? cloneElement(child) : child))}
    </div>
  )
}
