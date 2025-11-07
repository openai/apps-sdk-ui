import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useOnClickOutside } from "usehooks-ts"
import { useLatestValue } from "../../hooks/useLatestValue"
import { toCssVariables } from "../../lib/helpers"
import type { Sizes } from "../../types"
import { X } from "../Icon"
import s from "./TagInput.module.css"

export type Tag = {
  value: string
  valid: boolean
}

export type TagInputProps = {
  /**
   * The state of the tag input when it is initially rendered, used when uncontrolled
   */
  defaultValue?: Tag[]
  /**
   * The value of the tag input, used to control the tag input
   */
  value?: Tag[]
  /**
   * Allows the tag input to be targeted with htmlFor
   */
  id?: string
  /**
   * Corresponds with Input height when rows=1
   * @default xl
   */
  size?: Sizes<"md" | "lg" | "xl" | "2xl" | "3xl">
  /**
   * Callback function invoked when the tag list changes
   */
  onChange?: (tags: Tag[]) => void
  /**
   * Placeholder text for the input
   */
  placeholder?: string
  /**
   * A function that returns whether a given value is a valid tag.
   * Invalid tags are highlighted in red.
   * Tags are evaluated for validity only on creation; changing the validator function later has no effect
   */
  validator?: (value: string) => boolean
  /**
   * The maximum number of tags allowed before the input is disabled; displays a counter below the input
   */
  maxTags?: number
  /**
   * Whether to focus this input on mount
   * @default false
   */
  autoFocus?: boolean
  /**
   * The minimum number of rows for the tag input
   * @default 1
   */
  rows?: number
  /**
   * Controls what characters will count towards creating a new tag
   * @default [",", " "]
   */
  delimiters?: string[]
  /**
   * Disables the tag input visually and from interactions
   */
  disabled?: boolean
}

// How many pixels to reserve on the right of the input as a buffer before wrapping to the next line
const INPUT_CURSOR_TOLERANCE_PX = 10
// The total space reserved on either side of the input for padding
const CONTAINER_PADDING_PX = 24
const SHAKE_ANIMATION_DURATION_MS = 500

export const TagInput = (props: TagInputProps) => {
  const {
    defaultValue: defaultValueProp = [],
    value: controlledValue,
    size = "xl",
    onChange,
    validator,
    maxTags,
    placeholder = "",
    autoFocus = false,
    rows = 1,
    delimiters = [",", " "],
    disabled,
    id,
  } = props

  const [internalTags, setInternalTags] = useState(defaultValueProp)

  const value = controlledValue ?? internalTags
  const isControlled = controlledValue !== undefined

  const tags = useMemo(() => new Map(value.map((tag) => [tag.value, tag])), [value])

  const [currentInput, setCurrentInput] = useState("")
  const [focused, setFocused] = useState(autoFocus)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [duplicateTags, setDuplicateTags] = useState<Set<string>>(new Set())
  const [inputWidth, setInputWidth] = useState<number>(0)
  const validatorLatest = useLatestValue(validator)
  const onChangeLatest = useLatestValue(onChange)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)

  const showInput = !maxTags || tags.size < maxTags

  // Handle focusing the correct part of the tag input
  useEffect(() => {
    if (!focused || !containerRef.current) {
      return
    }
    const defaultFocusEl = inputRef.current ?? containerRef.current
    if (selectedTag === null) {
      defaultFocusEl.focus()
    } else {
      const selectedTagElement = containerRef.current.querySelector(
        `[data-tag="${selectedTag}"]`,
      ) as HTMLElement | null
      if (selectedTagElement) {
        selectedTagElement.focus()
      } else {
        defaultFocusEl.focus()
      }
    }
  }, [focused, selectedTag, showInput]) // Include showInput so we focus the container when we hide the input

  const placeholderText = tags.size === 0 ? placeholder : undefined

  // Handle positioning the real input inside of the container
  // Use useLayoutEffect to avoid flashing during width calculation
  useLayoutEffect(() => {
    if (containerRef.current && measureRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const tagElements = Array.from(
        containerRef.current.querySelectorAll("[data-tag]"),
      ) as HTMLDivElement[]

      // Grab the right edge of the last tag if it exists, otherwise the left edge of the container
      const leftBound =
        tagElements.length > 0
          ? tagElements[tagElements.length - 1].getBoundingClientRect().right
          : containerRect.left

      measureRef.current.textContent = currentInput || placeholderText || ""

      // By padding the text width, we ensure the input wraps to the next line
      // before we get to the point where we start to overflow
      const textWidth = measureRef.current.getBoundingClientRect().width + INPUT_CURSOR_TOLERANCE_PX

      // Calculate the remaining space based on the last tag's right edge (or container's left if no tags)
      const remainingSpace = containerRect.right - leftBound - CONTAINER_PADDING_PX

      if (textWidth <= remainingSpace) {
        setInputWidth(remainingSpace)
      } else {
        // We are going to flow to a new line, so recalculate remaining space based on the container size
        const width = containerRect.right - containerRect.left - CONTAINER_PADDING_PX
        setInputWidth(width)
      }
    }
  }, [currentInput, placeholderText, tags]) // Include tags so we reflow the container when we delete a tag

  // ============================================
  // Tag lifecycle functions
  // ============================================

  const addTag = (tagValue: string) => {
    const trimmed = tagValue.trim()
    if (!trimmed) {
      return
    }
    if (tags.has(trimmed)) {
      setDuplicateTags((prevTags) => new Set(prevTags).add(trimmed))
      setTimeout(
        () =>
          setDuplicateTags((prevTags) => {
            const newTags = new Set(prevTags)
            newTags.delete(trimmed)
            return newTags
          }),
        SHAKE_ANIMATION_DURATION_MS,
      )
      return
    }
    const validTag = validatorLatest.current?.(trimmed) ?? true
    const newSet = new Map(tags)
    newSet.set(trimmed, { value: trimmed, valid: validTag })
    const newTags = Array.from(newSet.values())
    onChangeLatest.current?.(newTags)

    if (!isControlled) {
      setInternalTags(newTags)
    }
  }

  const removeTag = (tag: string) => {
    const newSet = new Map(tags)
    newSet.delete(tag)
    const newTags = Array.from(newSet.values())
    onChangeLatest.current?.(newTags)
    if (!isControlled) {
      setInternalTags(newTags)
    }
    if (selectedTag === tag) {
      setSelectedTag(null)
    }
  }

  const selectPreviousTag = () => {
    if (tags.size === 0) {
      return
    }
    const tagList = Array.from(tags.keys())
    if (selectedTag === null) {
      setSelectedTag(tagList[tagList.length - 1])
    } else {
      const prevIndex = tagList.indexOf(selectedTag)
      const index = Math.max(0, prevIndex - 1)
      setSelectedTag(tagList[index])
    }
  }

  const selectNextTag = () => {
    if (selectedTag === null) {
      return
    }
    const tagList = Array.from(tags.keys())
    const prevIndex = tagList.indexOf(selectedTag)
    const index = prevIndex + 1
    if (index < tagList.length) {
      setSelectedTag(tagList[index])
    } else {
      setSelectedTag(null)
    }
  }

  // ============================================
  // Helper functions
  // ============================================

  const isEmptyStartingSelection = () => {
    const input = inputRef.current
    if (!input) {
      return true
    }
    return input.selectionStart === 0 && input.selectionEnd === 0
  }

  const handleContainerBlur = () => {
    setFocused(false)
    setSelectedTag(null)
    if (currentInput) {
      addTag(currentInput)
      setCurrentInput("")
    }
  }

  // ============================================
  // Event handlers
  // ============================================

  const handleContainerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      if (isEmptyStartingSelection()) {
        e.preventDefault()
        selectPreviousTag()
      }
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      if (selectedTag !== null) {
        e.preventDefault()
        selectNextTag()
      }
    } else if (e.key === "Backspace") {
      if (selectedTag !== null) {
        removeTag(selectedTag)
      } else if (isEmptyStartingSelection()) {
        selectPreviousTag()
      }
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || delimiters.includes(e.key)) {
      e.preventDefault()
      if (currentInput) {
        addTag(currentInput)
        setCurrentInput("")
      }
    } else if (e.key === "Tab") {
      if (currentInput) {
        e.preventDefault()
        addTag(currentInput)
        setCurrentInput("")
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("Text")
    let parts = [text]

    // Split by all delimiters
    for (const delimiter of delimiters) {
      const newParts = []
      for (const segment of parts) {
        newParts.push(...segment.split(delimiter))
      }
      parts = newParts
    }

    // Remove empty parts
    parts = parts.filter(Boolean)

    if (parts.length > 1) {
      e.preventDefault()
      parts.forEach((part) => addTag(part))
    }
  }

  const handleContainerMouseDown = (e: React.MouseEvent) => {
    // All clicks in the container focus the container
    setFocused(true)

    // If the click is on a tag pill, we are done. The click handler
    // for the specific tag will handle focusing it
    if (e.target && e.target instanceof Element && e.target.closest("[data-tag]")) {
      return
    }

    // Since we know we didn't click a tag, clear any selected tag
    setSelectedTag(null)

    // If this click is outside of the input, prevent it from "stealing" focus from the input
    if (
      e.target &&
      e.target instanceof Element &&
      inputRef.current &&
      !inputRef.current.contains(e.target)
    ) {
      e.preventDefault()

      const { left, right, top, bottom } = inputRef.current.getBoundingClientRect()
      const { clientX, clientY } = e

      // If this is the first click, clear the selection. Otherwise, select the input contents
      if (e.detail === 1) {
        if (clientY < top || clientX < left) {
          // "Before" the input: top/left
          inputRef.current.setSelectionRange(0, 0)
        } else if (clientY > bottom || clientX > right) {
          // "After" the input: bottom/right
          const length = inputRef.current.value.length
          inputRef.current.setSelectionRange(length, length)
        }
      } else {
        inputRef.current.select()
      }
    }
  }

  const handleFocus = (e: React.FocusEvent) => {
    // If the focus is on a tag pill, do not trigger input focus logic
    // The click handler for the specific tag will handle it instead
    if (e.target && e.target instanceof Element && e.target.closest("[data-tag]")) {
      return
    }
    setFocused(true)
  }

  const handleBlur = (e: React.FocusEvent) => {
    // If there is no related target, don't remove focus.
    // This occurs on a click inside the container but not on any element.
    // The handleClickOutside handler handles other cases
    if (!e.relatedTarget || !(e.relatedTarget instanceof Node)) {
      return
    }
    // Don't clear focus if focus is only moved elsewhere within the container
    if (containerRef.current && containerRef.current.contains(e.relatedTarget)) {
      // If we just tabbed into the input, clear the selected tag
      if (inputRef.current && inputRef.current.contains(e.relatedTarget)) {
        setSelectedTag(null)
      }
      return
    }
    handleContainerBlur()
  }

  // @ts-expect-error - Fix once usehooks-ts is updated https://github.com/juliencrn/usehooks-ts/pull/675
  useOnClickOutside(containerRef, handleContainerBlur)

  return (
    <>
      <div
        className={s.Container}
        ref={containerRef}
        onKeyDown={handleContainerKeyDown}
        onMouseDown={handleContainerMouseDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-size={size}
        data-focused={focused ? "" : undefined}
        data-empty={tags.size === 0 ? "" : undefined}
        tabIndex={-1}
        style={toCssVariables({ "min-rows": String(rows) })}
        data-disabled={disabled ? "" : undefined}
      >
        <div className={s.TagInput}>
          {Array.from(tags.values()).map((tag) => (
            <div
              key={tag.value}
              className={s.Tag}
              tabIndex={-1}
              onClick={() => setSelectedTag(tag.value)}
              data-tag={tag.value}
              data-invalid={!tag.valid ? "" : undefined}
              data-duplicate={duplicateTags.has(tag.value) ? "" : undefined}
            >
              <span className="overflow-hidden text-ellipsis" title={tag.value}>
                <span className={s.TagValue}>{tag.value}</span>
              </span>
              <div
                className={s.TagRemove}
                onClick={() => removeTag(tag.value)}
                role="button"
                aria-label="Remove item"
              >
                <X height={14} width={14} />
              </div>
            </div>
          ))}
          {showInput && (
            <div className={s.InputContainer}>
              {/* Hidden element to measure input width */}
              <span ref={measureRef} className={s.InputMeasure} />
              <div className={s.InputWrapper}>
                <input
                  id={id}
                  className={s.Input}
                  ref={inputRef}
                  value={currentInput}
                  onChange={(e) => {
                    setCurrentInput(e.target.value)
                  }}
                  onPaste={handlePaste}
                  onKeyDown={handleInputKeyDown}
                  placeholder={placeholderText}
                  style={{ width: inputWidth }}
                  disabled={disabled}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {maxTags && (
        <div className={s.Limit}>
          {tags.size}
          <span className="mx-px">/</span>
          {maxTags}
        </div>
      )}
    </>
  )
}
