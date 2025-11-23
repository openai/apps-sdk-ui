"use client"

import clsx from "clsx"
import { useState, type ComponentProps } from "react"
import { useSimulatedProgress } from "../../hooks/useSimulatedProgress"

import { toCssVariables } from "../../lib/helpers"
import s from "./CircularProgress.module.css"

export type CircularProgressProps = Omit<ComponentProps<"div">, "children"> & {
  /**
   * Maximum duration to use for simulated upload progress in ms
   * @default 15000
   */
  maxDuration?: number
  /**
   * Sets the progress to full and resolves the simulated timer
   * @default false
   */
  done?: boolean
  /**
   * Sets the progress to full and resolves the simulated timer
   * @default false
   */
  progress?: number
  /** Size of the indicator, in pixels
   * @default 28px
   */
  size?: number | string
  /** Stroke width of the indicator, in pixels, between 1 and 4
   * @default 2
   */
  strokeWidth?: number
  /** Color of the active progress track (stroke) */
  trackActiveColor?: string
  /** Color of the base track (background stroke) */
  trackColor?: string
}

export const CircularProgress = ({
  maxDuration = 15000, // 15 seconds
  done = false,
  className,
  progress: propProgress,
  size,
  strokeWidth,
  trackActiveColor,
  trackColor,
  style,
  ...restProps
}: CircularProgressProps) => {
  const [currentTime] = useState(new Date())
  const simulatedProgressDone = propProgress !== undefined || done
  const simulatedProgress = useSimulatedProgress(+currentTime, maxDuration, simulatedProgressDone)
  const progress = propProgress ?? simulatedProgress

  return (
    <div
      {...restProps}
      className={clsx(s.Container, className)}
      style={
        style ||
        toCssVariables({
          "circular-progress-size": size,
          "circular-progress-stroke": strokeWidth ? Math.min(4, strokeWidth) : undefined,
          "circular-progress-track-active-color": trackActiveColor,
          "circular-progress-track-color": trackColor,
        })
      }
    >
      <svg viewBox="0 0 20 20" className={s.Track} data-no-autosize>
        <circle cx="10" cy="10" r="8" fill="none" />
      </svg>
      <svg
        viewBox="0 0 20 20"
        className={s.TrackProgress}
        style={{
          strokeDashoffset: 50 - 50 * (progress / 100),
        }}
        data-no-autosize
      >
        <circle cx="10" cy="10" r="8" fill="none" />
      </svg>
    </div>
  )
}
