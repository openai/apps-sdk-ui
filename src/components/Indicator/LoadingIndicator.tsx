import clsx from "clsx"
import type { ComponentProps } from "react"
import { toCssVariables } from "../../lib/helpers"
import s from "./LoadingIndicator.module.css"

export type LoadingIndicatorProps = {
  /** Classname applied to the indicator */
  className?: string
  /** Size of the indicator, in pixels
   * @default 1em
   */
  size?: number | string
  /** Stroke width of the indicator, in pixels
   * @default 2
   */
  strokeWidth?: number
} & Omit<ComponentProps<"div">, "children">

export const LoadingIndicator = ({
  className,
  size,
  strokeWidth,
  style,
  ...restProps
}: LoadingIndicatorProps) => {
  return (
    <div
      {...restProps}
      className={clsx(s.LoadingIndicator, className)}
      style={
        style ||
        toCssVariables({
          "indicator-size": size,
          "indicator-stroke": strokeWidth,
        })
      }
    />
  )
}
