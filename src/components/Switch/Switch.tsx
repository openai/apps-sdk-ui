"use client"

import clsx from "clsx"
import { Switch as RadixSwitch } from "radix-ui"
import { type FocusEventHandler, type ReactNode, useId } from "react"
import s from "./Switch.module.css"

export type SwitchProps = {
  /** The `id` of the switch. */
  id?: string
  /** The state of the switch when it is initially rendered. Use when you do not need to control its state. */
  defaultChecked?: boolean
  /** The controlled state of the switch. Must be used in conjunction with `onCheckedChange`. */
  checked?: boolean
  /** Optional accessible label rendered to the right of the checkbox. */
  label?: ReactNode
  /** Event handler called when the state of the switch changes. */
  onCheckedChange?: (nextState: boolean) => void
  /** Event handler called when the checkbox looses focus. */
  onBlur?: FocusEventHandler<HTMLButtonElement>
  /** Event handler called when the checkbox gains focus. */
  onFocus?: FocusEventHandler<HTMLButtonElement>
  /** When `true`, prevents the user from interacting with the switch. */
  disabled?: boolean
  /** When `true`, indicates that the user must check the switch before the owning form can be submitted. */
  required?: boolean
  /** The name of the switch. Submitted with its owning form as part of a name/value pair. */
  name?: string
  /** The value given as data when submitted with a `name`. */
  value?: string
  /** CSS classes applied to wrapper node */
  className?: string
  /**
   * The position of the label relative to the switch.
   * @default end
   */
  labelPosition?: "start" | "end"
}

export const Switch = ({
  className,
  label,
  id: propsId,
  disabled,
  labelPosition = "end",
  ...restProps
}: SwitchProps) => {
  const reactId = useId()
  const id = propsId ?? reactId

  return (
    <div
      className={clsx(s.Container, className)}
      data-disabled={disabled ? "" : undefined}
      data-has-label={label ? "" : undefined}
      data-label-position={labelPosition}
    >
      <RadixSwitch.Root id={id} className={s.Track} disabled={disabled} {...restProps}>
        <RadixSwitch.Thumb className={s.Thumb} />
      </RadixSwitch.Root>

      {label && (
        <label htmlFor={id} className={s.Label}>
          {label}
        </label>
      )}
    </div>
  )
}
