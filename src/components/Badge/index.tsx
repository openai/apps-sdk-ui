import clsx from "clsx"
import { type ReactNode } from "react"
import { wrapTextNodeSiblings } from "../../lib/renderHelpers"
import { type SemanticColors, type Sizes, type Variants } from "../../types"
import s from "./Badge.module.css"

export type BadgeProps = {
  /** Content rendered inside the badge */
  children: ReactNode
  /** Class applied to the badge */
  className?: string
  /**
   * Visual style of the badge
   * @default soft
   */
  variant?: Variants<"solid" | "soft" | "outline">
  /**
   * Size scale of the badge
   *
   * | sm      | md      | lg      |
   * | ------- | ------- | ------- |
   * | `18px`  | `22px`  | `24px`  |
   * @default sm
   */
  size?: Sizes<"sm" | "md" | "lg">
  /**
   * Determines if the badge should be a fully rounded pill shape
   * @default false
   */
  pill?: boolean
  /**
   * Color of the badge, related to its meaning or intent
   * @default secondary
   */
  color?: SemanticColors<"secondary" | "success" | "danger" | "warning" | "info" | "discovery">
}

export const Badge = ({
  children,
  className,
  variant = "soft",
  color = "secondary",
  size = "sm",
  pill,
  ...restMaybeAsChildProps
}: BadgeProps) => {
  return (
    <div
      className={clsx(s.Badge, className)}
      data-color={color}
      data-size={size}
      data-pill={pill ? "" : undefined}
      data-variant={variant}
      {...restMaybeAsChildProps}
    >
      {wrapTextNodeSiblings(children)}
    </div>
  )
}
