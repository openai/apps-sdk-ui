import clsx from "clsx"
import { type ReactNode, type Ref, useEffect, useRef, useState } from "react"
import { mergeRefs } from "react-merge-refs"
import { useResizeObserver } from "usehooks-ts"
import { type SemanticColors, type Variants } from "../../types"
import { CheckCircle, Info, Warning } from "../Icon"
import s from "./Alert.module.css"

export type AlertProps = {
  /**
   * Color for the button
   * @default primary
   */
  color?: SemanticColors<
    "primary" | "danger" | "success" | "info" | "discovery" | "caution" | "warning"
  >
  /**
   * Style variant for the Button
   * @default fill
   */
  variant?: Variants<"solid" | "soft" | "outline">
  /** Title displayed in the alert. */
  title?: ReactNode
  /** Description text displayed in the alert */
  description?: ReactNode
  /** Actions associated with the Alert. */
  actions?: ReactNode
  /** Sets the placement of `actions` always on the end or the bottom. Default behavior is automatic placement based on sizing. */
  actionsPlacement?: "end" | "bottom"
  /** Optional override for the default indicator of the alert. When `false`, no indicator is shown. */
  indicator?: ReactNode | false
  /** Class applied to the alert container */
  className?: string
  /** Class applied to the actions container */
  actionsClassName?: string
  /** Ref applied to the alert container */
  ref?: Ref<HTMLDivElement>
}

export const Alert = ({
  color = "primary",
  variant = "outline",
  title,
  description,
  actions,
  actionsPlacement,
  indicator,
  className,
  actionsClassName,
  ref,
  ...restProps
}: AlertProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const [actionsAutoPlacement, setActionsAutoPlacement] = useState<"end" | "bottom">("end")
  // @ts-expect-error -- Type issue in usehooks-ts
  const { width: containerWidth } = useResizeObserver({ ref: containerRef })

  useEffect(() => {
    const actionsWidth = actionsRef.current?.clientWidth ?? 0

    if (actionsWidth && containerWidth) {
      // If actions are larger than a third of the container width, wrap them.
      const placement = actionsWidth > containerWidth / 3 ? "bottom" : "end"
      setActionsAutoPlacement(placement)
    }
  }, [containerWidth])

  return (
    <div
      ref={mergeRefs([ref, containerRef])}
      className={clsx(s.Alert, className)}
      data-variant={variant}
      data-color={color}
      role={color === "danger" ? "alert" : undefined}
      data-actions-placement={actionsPlacement ?? actionsAutoPlacement}
      {...restProps}
    >
      {indicator === false ? null : (
        <div className={s.Indicator}>{indicator ?? <Indicator color={color} />}</div>
      )}
      <div className={s.Content}>
        <div className={s.Message}>
          {title && <div className={s.Title}>{title}</div>}
          {description && <div className={s.Description}>{description}</div>}
        </div>
        {actions && (
          <div className={clsx(s.Actions, actionsClassName)} ref={actionsRef}>
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

export const Indicator = ({ color }: { color: AlertProps["color"] }) => {
  // Choose a default icon based on the color (which signals intention)
  switch (color) {
    case "warning":
    case "caution":
    case "danger":
      return <Warning />
    case "success":
      return <CheckCircle />
    default:
      return <Info />
  }
}
