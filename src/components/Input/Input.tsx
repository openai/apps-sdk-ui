import clsx from "clsx"
import { useEffect, useId, useRef, useState } from "react"
import { mergeRefs } from "react-merge-refs"
import { type ControlSize, type Sizes, type Variants } from "../../types"
import s from "./Input.module.css"

export type InputProps = {
  /**
   * Visual style of the input
   * @default outline
   */
  variant?: Variants<"outline" | "soft">
  /**
   * Controls the size of the input
   *
   * | 3xs     | 2xs     | xs      | sm      | md      | lg      | xl      | 2xl     | 3xl     |
   * | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
   * | `22px`  | `24px`  | `26px`  | `28px`  | `32px`  | `36px`  | `40px`  | `44px`  | `48px`  |
   *
   * @default md
   */
  size?: ControlSize
  /**
   * Controls gutter on the edges of the input, defaults to value from `size`.
   *
   * | 2xs    | xs     | sm     | md     | lg     | xl     |
   * | ------ | ------ | ------ | ------ | ------ | ------ |
   * | `6px`  | `8px`  | `10px` | `12px` | `14px` | `16px` |
   */
  gutterSize?: Sizes<"2xs" | "xs" | "sm" | "md" | "lg" | "xl">
  /**
   * Disables the select visually and from interactions
   * @default false
   */
  disabled?: boolean
  /**
   * Mark the input as invalid
   * @default false
   */
  invalid?: boolean
  /**
   * Allow autofill extensions to appear in the input
   * @default false
   */
  allowAutofillExtensions?: boolean
  /**
   * Select all contents of the input when mounted.
   * @default false
   */
  autoSelect?: boolean
  /** Callback invoked when the input is autofilled by the browser */
  onAutofill?: () => void
  /** Content rendered at the start of the input */
  startAdornment?: React.ReactNode
  /** Content rendered at the end of the input */
  endAdornment?: React.ReactNode
  /**
   * Determines if the button should be a fully rounded pill shape
   * @default false
   */
  pill?: boolean
  /**
   * Applies a negative margin using the current gutter to optically align the input
   * with surrounding content.
   */
  opticallyAlign?: "start" | "end"
  /** Ref for the input */
  ref?: React.Ref<HTMLInputElement | null>
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "size">

export const Input = (props: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputIdSuffix = useId()
  // Prevent 1Password from appearing: 1Password won't display if it thinks this field is for searching
  // Allow user to override this for connecting to labels.
  const onePasswordPreventionId = `search-ui-input-${inputIdSuffix}`
  const {
    id,
    name,
    type = "text",
    variant = "outline",
    size = "md",
    gutterSize,
    className,
    autoComplete,
    disabled = false,
    readOnly = false,
    invalid = false,
    // Default to `true` when type="password" or presence of `name`
    allowAutofillExtensions = type === "password" || !!name,
    onFocus,
    onBlur,
    onAnimationStart,
    onAutofill,
    autoSelect,
    startAdornment: StartAdornment,
    endAdornment: EndAdornment,
    pill,
    opticallyAlign,
    ref,
    ...restProps
  } = props
  // Redirect clicks on the container and adornments
  const handleMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    const input = inputRef.current
    // Bail out if the target is not an element or the textarea is not found
    if (!evt.target || !(evt.target instanceof Element) || !input) {
      return
    }
    // Bail out if the target is inside the textarea
    if (input.contains(evt.target)) {
      return
    }
    // Bail out if the target is a button
    if (evt.target.closest("button, [type='button'], [role='button'], [role='menuitem']")) {
      return
    }

    evt.preventDefault()
    // If the textarea is not focused, focus it
    if (document.activeElement !== input) {
      input.focus()
    }

    const { left, top } = input.getBoundingClientRect()
    const { clientX, clientY } = evt
    // "Before" the input: top/left
    const isBefore = clientY < top || clientX < left

    // If this is the first click, clear the selection.
    if (evt.detail === 1) {
      if (isBefore) {
        input.setSelectionRange(0, 0)
      } else {
        const length = input.value.length
        input.setSelectionRange(length, length)
      }
    }
    // If this is the second click, select the first or last word
    else if (evt.detail === 2) {
      // Split the textarea value into words and non-word characters
      const words = input.value.match(/\w+|[^\w\s]/g) || []
      const selectedWord = isBefore ? words.at(0) : words.at(-1)
      if (selectedWord) {
        const wordIndex = isBefore
          ? input.value.indexOf(selectedWord)
          : input.value.lastIndexOf(selectedWord)
        input.setSelectionRange(wordIndex, wordIndex + selectedWord.length)
      }
    }
    // If this is the third click or greater, select the entire input
    else {
      input.select()
    }
  }

  const [focused, setFocused] = useState<boolean>(false)

  useEffect(() => {
    if (autoSelect) {
      inputRef.current?.select()
    }
  }, [autoSelect])

  const handleAnimationStart = (evt: React.AnimationEvent<HTMLInputElement>) => {
    onAnimationStart?.(evt)
    if (evt.animationName === "native-autofill-in") {
      onAutofill?.()
    }
  }

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
      data-pill={pill ? "" : undefined}
      data-optically-align={opticallyAlign}
      data-has-start-adornment={StartAdornment ? "" : undefined}
      data-has-end-adornment={EndAdornment ? "" : undefined}
      onMouseDown={handleMouseDown}
    >
      {StartAdornment}
      <input
        {...restProps}
        ref={mergeRefs([ref, inputRef])}
        id={id || (allowAutofillExtensions ? undefined : onePasswordPreventionId)}
        className={s.Input}
        type={type}
        name={name}
        readOnly={readOnly}
        disabled={disabled}
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
      {EndAdornment}
    </div>
  )
}
