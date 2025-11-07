import clsx from "clsx"
import { type ReactNode } from "react"
import { type SemanticColors, type Sizes } from "../../types"
import s from "./EmptyMessage.module.css"

export type EmptyMessageProps = {
  children: ReactNode
  className?: string
  /**
   * Determines how the container fills available space
   * @default static
   */
  fill?: "static" | "absolute" | "none"
}

export const EmptyMessage = ({ children, className, fill = "static" }: EmptyMessageProps) => {
  return (
    <div className={clsx(s.EmptyMessage, className)} data-fill={fill}>
      {children}
    </div>
  )
}

export type EmptyMessageIconProps = {
  /**
   * @default sm
   */
  size?: Sizes<"sm" | "md">
  /**
   * @default secondary
   */
  color?: SemanticColors<"secondary" | "danger" | "warning">
  children: ReactNode
  className?: string
}

const Icon = ({ size = "md", color = "secondary", children, className }: EmptyMessageIconProps) => {
  return (
    <div className={clsx(s.IconBadge, className)} data-size={size} data-color={color}>
      {children}
    </div>
  )
}

export type EmptyMessageTitleProps = {
  children: ReactNode
  className?: string
  /**
   * @default secondary
   */
  color?: SemanticColors<"secondary" | "danger" | "warning">
}

const Title = ({ children, className, color = "secondary" }: EmptyMessageTitleProps) => {
  return (
    <div className={clsx(s.Title, className)} data-color={color}>
      {children}
    </div>
  )
}

const Description = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={clsx(s.Description, className)}>{children}</div>
}

const ActionRow = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={clsx(s.ActionRow, className)}>{children}</div>
}

EmptyMessage.Icon = Icon
EmptyMessage.Title = Title
EmptyMessage.Description = Description
EmptyMessage.ActionRow = ActionRow
