"use client"

import clsx from "clsx"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import { mergeRefs } from "react-merge-refs"
import { toCssVariables } from "../../lib/helpers"
import { type ControlSize, type Sizes, type Variants } from "../../types"
import s from "./Textarea.module.css"

export type TextareaProps = {
  /**
   * Visual style of the textarea
   * @default outline
   */
  variant?: Variants<"outline" | "soft" | "ghost">  /**
   * Controls the size of the textarea
   *
   * | 3xs     | 2xs     | xs      | sm      | md      | lg      | xl      | 2xl     | 3xl     |
   * | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
   * | `22px`  | `24px`  | `26px`  | `28px`  | `32px`  | `36px`  | `40px`  | `44px`  | `48px`  |
   *
   * @default md
   */
  size?: ControlSize
  /**
   * Controls gutter on the edges of the textarea, defaults to value from `size`.
   *
   * | 2xs    | xs     | sm     | md     | lg     | xl     |
   * | ------ | ------ | ------ | ------ | ------ | ------ |
   * | `6px`  | `8px`  | `10px` | `12px` | `14px` | `16px` |
   */
  gutterSize?: Sizes<"2xs" | "xs" | "sm" | "md" | "lg" | "xl">
  /**
   * Disables the textarea visually and from interactions
   * @default false
   */
  disabled?: boolean
  /**
   * Mark the textarea as invalid
   * @default false
   */
  invalid?: boolean
  /**
   * Allow autofill extensions to appear in the textarea
   * @default false
   */
  allowAutofillExtensions?: boolean
  /**
   * Select all contents of the textarea when mounted.
   * @default false
   */
  autoSelect?: boolean
  /** Callback invoked when the textarea is autofilled by the browser */
  onAutofill?: () => void
  /**
   * Default number of rows to display
   * @default 3
   */
  rows?: number
  /**
   * Automatically adjust the height of the textarea based on its contents.
   * @default false
   */
  autoResize?: boolean
  /**
   * Maximum number of rows that can be displayed when autoResize is enabled.
   * @default Math.max(rows, 10)
   */
  maxRows?: number
  /** Ref for the textarea */
  ref?: React.Ref<HTMLTextAreaElement | null>
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "disabled" | "size">

export const Textarea = (props: TextareaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const inputIdSuffix = useId()
  // Prevent 1Password from appearing: 1Password won't display if it thinks this field is for searching
  // Allow user to override this for connecting to labels.
  const onePasswordPreventionId = `search-ui-input-${inputIdSuffix}`
  const {
    id,
    name,
    variant = "outline",
    size = "md",
    gutterSize,
    className,
    autoComplete,
    disabled = false,
    readOnly = false,
    invalid = false,
    // Default to `true` when presence of `name`
    allowAutofillExtensions = !!name,
    onFocus,
    onBlur,
    onAnimationStart,
    onAutofill,
    autoSelect,
    rows = 3,
    maxRows,
    autoResize,
    ref,
    onChange,
    ...restProps
  } = props

  const [focused, setFocused] = useState<boolean>(false)
  const computedMaxRows = autoResize ? Math.max(maxRows ?? 10, rows) : rows

  useEffect(() => {
    if (autoSelect) {
      textAreaRef.current?.select()
    }
  }, [autoSelect])

  const handleAnimationStart = (evt: React.AnimationEvent<HTMLTextAreaElement>) => {
    onAnimationStart?.(evt)
    if (evt.animationName === "native-autofill-in") {
      onAutofill?.()
    }
  }

  const autosizeTextarea = useCallback(() => {
    if (!autoResize || !textAreaRef.current || computedMaxRows === undefined) return
    textAreaRef.current.style.height = "0px"
    const scrollHeight = textAreaRef.current.scrollHeight
    textAreaRef.current.style.height = scrollHeight + "px"
  }, [autoResize, computedMaxRows])

  // Resize if value changes outside of user input - e.g. form reset
  useEffect(() => {
    autosizeTextarea()
  }, [props.value, rows, autosizeTextarea])

  return (
    <div
      className={clsx(s.Container, className)}
      data-variant={variant}
      data-size={size}
      data-gutter-size={gutterSize}
      data-focused={focused}
      data-disabled={disabled ? "" : undefined}
      data-readonly={readOnly ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
      style={toCssVariables({
        "textarea-min-rows": `${rows}`,
        "textarea-max-rows": `${computedMaxRows}`,
      })}
    >
      <textarea
        {...restProps}
        onChange={(evt) => {
          onChange?.(evt)
          autosizeTextarea()
        }}
        ref={mergeRefs([textAreaRef, ref])}
        id={id || (allowAutofillExtensions ? undefined : onePasswordPreventionId)}
        className={s.Textarea}
        name={name}
        readOnly={readOnly}
        disabled={disabled}
        rows={rows}
        onFocus={(evt) => {
          setFocused(true)
          onFocus?.(evt)
        }}
        onBlur={(evt) => {
          setFocused(false)
          onBlur?.(evt)
        }}
        onAnimationStart={handleAnimationStart}
        // Prevent LastPass and 1Password from appearing
        data-lpignore={allowAutofillExtensions ? undefined : true}
        data-1p-ignore={allowAutofillExtensions ? undefined : true}
      />
    </div>
  )
}
