"use client"

import clsx from "clsx"
import { Popover } from "radix-ui"
import React, {
  createContext,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useEscCloseStack } from "../../hooks/useEscCloseStack"
import { useLatestValue } from "../../hooks/useLatestValue"
import { preventDefaultHandler, toCssVariables, waitForAnimationFrame } from "../../lib/helpers"
import { Check, Info, Search } from "../Icon"
import { Input } from "../Input"
import { SelectControl, type SelectControlProps } from "../SelectControl"
import { Tooltip } from "../Tooltip"
import { TransitionGroup } from "../Transition"
import s from "./Select.module.css"

export type Option<T extends string = string> = {
  value: T
  label: string
  /** Disable the option */
  disabled?: boolean
  /** Displayed as secondary text below the option `label` */
  description?: React.ReactNode
  tooltip?: {
    content: React.ReactNode
    maxWidth?: number
  }
}

export type OptionGroup<T extends Option> = {
  label: string
  options: T[]
  optionsLimit?: {
    label: string
    limit: number
  }
}

export type Options<T extends Option> = T[] | OptionGroup<T>[]

type CallbackWithOption<T extends Option> = (option: T) => void
type CallbackWithOptions<T extends Option> = (options: T[]) => void
type CallbackWithActionId = (actionId: string) => void
type SearchPredicate<T extends Option> = (option: T, searchTerm: string) => boolean

type Action = {
  /** Unique ID to identify the action with */
  id: string
  /** Label display for the action */
  label: string
  /** Icon displayed to the left of the action */
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  /** Custom class applied to the action container */
  className?: string
  /** Callback invoked when the action is pressed */
  onSelect: CallbackWithActionId
}

type Actions = Action[]

export type PopoverSide = "top" | "bottom"
export type PopoverAlign = "start" | "center" | "end"

type SingleSelectProps<T extends Option> = {
  /**
   * Determines if the select should support multiple selection
   * @default false
   */
  multiple?: false
  value: string
  onChange: CallbackWithOption<T>
  /**
   * Customize the rendered output of the trigger
   * NOTE: Must be passed as a stable reference, not created inline.
   */
  TriggerView?: React.FC<T>
}

type MultiSelectTriggerViewProps<T extends Option> = {
  values: T[]
  selectedAll: boolean
}

type MultiSelectProps<T extends Option> = {
  /**
   * Determines if the select should support multiple selection
   * @default false
   */
  multiple: true
  value: string[]
  onChange: CallbackWithOptions<T>
  /**
   * Customize the rendered output of the trigger
   * NOTE: Must be passed as a stable reference, not created line.
   */
  TriggerView?: React.FC<MultiSelectTriggerViewProps<T>>
}

export type SelectProps<T extends Option> = (SingleSelectProps<T> | MultiSelectProps<T>) & {
  options: Options<T> // Should be passed as a stable reference
  /**
   * Disables the select visually and from interactions
   * @default false
   */
  disabled?: boolean
  /**
   * Allows the select to be targeted with htmlFor
   */
  id?: string
  /**
   * Marks the select as a required field when using native form submission
   */
  required?: boolean
  /**
   * Creates the ability to query the value with `[name="${name}"]`
   */
  name?: string
  /**
   * Placeholder text for the select
   * @default Select...
   */
  placeholder?: string
  /**
   * Placeholder text for the select while loading. Behaves exactly like `placeholder`, and `value` will be shown if provided.
   * @default Loading...
   */
  loadingPlaceholder?: string
  /**
   * Displays loading indicator on top of button contents
   * @default false
   */
  loading?: boolean
  /**
   * Style variant for the select trigger
   * @default outline
   */
  variant?: SelectControlProps["variant"]
  /**
   * Determines if the select trigger should be a fully rounded pill shape
   * @default false
   */
  pill?: boolean
  /**
   * Controls size of the select trigger, and several other aspects of trigger styling.
   *
   * | 3xs     | 2xs     | xs      | sm      | md      | lg      | xl      | 2xl     | 3xl     |
   * | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
   * | `22px`  | `24px`  | `26px`  | `28px`  | `32px`  | `36px`  | `40px`  | `44px`  | `48px`  |
   * @default md
   */
  size?: SelectControlProps["size"]
  /**
   * Icon displayed in the far right of the select trigger
   * @default dropdown
   */
  dropdownIconType?: SelectControlProps["dropdownIconType"]
  /**
   * Actions to display below the options list.
   */
  actions?: Actions // Memoized by length, don't assume dynamic changes are supported
  /** Custom class applied to option containers */
  optionClassName?: string
  /**
   * Customize the rendered output of individual options
   * NOTE: Must be passed as a stable reference, not created line.
   */
  OptionView?: React.FC<T>
  /** Icon displayed at the start of the select trigger */
  TriggerStartIcon?: SelectControlProps["StartIcon"]
  /**
   * Custom class applied to the select trigger
   */
  triggerClassName?: string // If consumers need deep customization of the trigger
  /**
   * Applies a negative margin using the current gutter to optically align the trigger
   * with surrounding content.
   */
  opticallyAlign?: "start" | "end"
  /**
   * Display a clear action that allows the select to be unset.
   * @default false
   */
  clearable?: boolean
  /**
   * Extends select to 100% of available width.
   * @default true
   */
  block?: boolean
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
   * @default bottom
   */
  side?: PopoverSide
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default center
   */
  align?: PopoverAlign
  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: number
  /**
   * Prevents collision detection in the custom menu. Use with caution.
   * @default true
   */
  avoidCollisions?: boolean
  /**
   * Set the width of the custom select menu
   * @default auto
   */
  listWidth?: number | "auto"
  /**
   * Defines the `min-width` property of the custom select menu, in pixels.
   * @default auto
   */
  listMinWidth?: number | "auto"
  /**
   * Defines the `max-width` property of the custom select menu, in pixels.
   * @default auto
   */
  listMaxWidth?: number | "auto"
  /** Predicate used to filter searches */
  searchPredicate?: SearchPredicate<T>
  /** Placeholder of the search input */
  searchPlaceholder?: string
  /**
   * Message displayed when search results are empty. Can be a simple string, or custom JSX.
   */
  searchEmptyMessage?: ReactNode
}

type SingleSelectContextValue<T extends Option> = {
  multiple: false
  value: string
  TriggerView: React.FC<T>
}

type MultiSelectContextValue<T extends Option> = {
  multiple: true
  value: string[]
  TriggerView: React.FC<MultiSelectTriggerViewProps<T>>
}

type SelectContextValue<T extends Option> = (
  | SingleSelectContextValue<T>
  | MultiSelectContextValue<T>
) & {
  triggerId: string
  // Props
  name?: string
  id?: string
  required?: boolean
  options: Options<T>
  disabled: boolean
  variant: SelectControlProps["variant"]
  pill: boolean
  size: SelectControlProps["size"]
  dropdownIconType: SelectControlProps["dropdownIconType"]
  loading: boolean
  clearable: boolean
  placeholder: string
  loadingPlaceholder: string
  searchEmptyMessage: ReactNode
  searchPlaceholder: string
  TriggerStartIcon?: SelectControlProps["StartIcon"]
  triggerClassName?: string
  opticallyAlign?: "start" | "end"
  optionClassName?: string
  OptionView: React.FC<T>
  actions: Actions
  onActionSelect: CallbackWithActionId
  block: boolean
  side: PopoverSide
  align: PopoverAlign
  alignOffset: number
  avoidCollisions: boolean
  listWidth?: number | "auto" // Default when not passed is to match the width of the trigger
  listMinWidth: number | "auto"
  listMaxWidth?: number | "auto"
  // References
  onSelectRef: React.MutableRefObject<(option: T, removeOption?: boolean) => void>
  searchPredicateRef: React.MutableRefObject<SearchPredicate<T>>
  // Derived
  searchable: boolean
}

const SelectContext = createContext<SelectContextValue<Option> | null>(null)

const useSelectContext = () => {
  const context = use(SelectContext)

  if (!context) {
    throw new Error("Select components must be wrapped in <Select />")
  }

  return context
}

const DefaultOptionView = ({ label }: { label: string }) => <>{label}</>
const DefaultSingleTriggerView = ({ label }: { label: string }) => <>{label}</>
const DefaultMultiTriggerView = <T extends Option>({
  values,
  selectedAll,
}: MultiSelectTriggerViewProps<T>) => {
  const displayValue = selectedAll
    ? "All selected"
    : values.length === 0
      ? // NOTE: Zero length is impossible - an empty option with `placeholder` is always returned
        "Select..."
      : values.length === 1
        ? values[0].label
        : `${values.length} selected`

  return <>{displayValue}</>
}

export const Select = <T extends Option>(props: SelectProps<T>) => {
  const {
    id,
    required,
    value,
    name,
    multiple,
    variant = "outline",
    size = "md",
    dropdownIconType = "dropdown",
    loading = false,
    clearable = false,
    disabled = false,
    placeholder = "Select...",
    loadingPlaceholder = "Loading...",
    pill = true,
    listWidth,
    options,
    actions: propActions = [],
    side = "bottom",
    avoidCollisions = true,
    onChange,
    optionClassName,
    OptionView = DefaultOptionView,
    TriggerStartIcon,
    triggerClassName,
    opticallyAlign,
    TriggerView: TriggerViewFromProps,
    searchPlaceholder = "",
    searchPredicate = defaultSearchPredicate,
    searchEmptyMessage = "No results found.",
    listMaxWidth = "auto",
  } = props
  // Block default is dynamic, based on `variant`
  const block = props.block ?? variant !== "ghost"
  // Align default is dynamic, based on `block`
  const align = props.align ?? (block ? "center" : "start")
  const alignOffset = props.alignOffset ?? (align === "center" ? 0 : -5)
  // Default to "auto" for block selects and 300 for inline selects.
  const listMinWidth = props.listMinWidth ?? (block ? "auto" : 300)

  // Create stable, mutable references to avoid memoization requirements from consumers
  const onSelectRef = useLatestValue((selectedOption: T, removeOption?: boolean) => {
    if (multiple) {
      // When clearing values, the value is an
      if (!selectedOption.value) {
        onChange([])
        return
      }

      if (removeOption) {
        const nextValues = value.filter((v) => v !== selectedOption.value)
        const currentSelectedOptions = getOptionsByValues(options, nextValues)
        onChange(currentSelectedOptions)
      } else {
        const currentSelectedOptions = getOptionsByValues(options, value)
        onChange(currentSelectedOptions.concat(selectedOption))
      }
    } else {
      onChange(selectedOption)
    }
  })

  const searchPredicateRef = useRef<SearchPredicate<T>>(searchPredicate)
  searchPredicateRef.current = searchPredicate

  // It should be exceedingly uncommon to change actions dynamically, and they are unlikely to be a stable array reference from consumers
  // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally limiting when this stable value changes to length of actions
  const actions = useMemo<Actions>(() => propActions, [propActions.length])
  // We need to ensure that when action callbacks are called, we have fresh function references, even if the other action details did not change.
  const propActionsRef = useRef<Actions>(propActions)
  propActionsRef.current = propActions
  const onActionSelect = useCallback<CallbackWithActionId>((actionId: string) => {
    propActionsRef.current.find((a) => a.id === actionId)?.onSelect(actionId)
  }, [])

  // Determine when custom selects should be used
  const optionsCount = useMemo(
    () =>
      isOptionGroupArray(options)
        ? options.reduce((acc: number, group) => {
            return acc + group.options.length
          }, 0)
        : options.length,
    [options],
  )

  // Using ID for DOM selection instead of passing around and merging a ref. Pick your poison.
  const internalTriggerId = useId()
  const triggerId = `select-trigger-${internalTriggerId}`

  // Locking down searchable count to a single value. Could make this customizable in the future, but would want guardrails.
  const searchable = optionsCount > 15

  // Narrow known values for context
  const dynamicContextProps = useMemo<
    SingleSelectContextValue<T> | MultiSelectContextValue<T>
  >(() => {
    if (multiple) {
      return {
        multiple: true,
        value: value as string[],
        TriggerView: TriggerViewFromProps ?? DefaultMultiTriggerView,
      }
    }

    return {
      multiple: false,
      value: value as string,
      TriggerView: TriggerViewFromProps ?? DefaultSingleTriggerView,
    }
  }, [multiple, value, TriggerViewFromProps])

  const store = useMemo<SelectContextValue<T>>(
    () => ({
      ...dynamicContextProps,
      triggerId,
      id,
      // Forward props
      name,
      required,
      options,
      placeholder,
      loadingPlaceholder,
      loading,
      clearable,
      variant,
      pill,
      size,
      dropdownIconType,
      block,
      align,
      alignOffset,
      side,
      avoidCollisions,
      listWidth,
      listMinWidth,
      listMaxWidth,
      searchPlaceholder,
      searchEmptyMessage,
      TriggerStartIcon,
      triggerClassName,
      opticallyAlign,
      optionClassName,
      OptionView,
      actions,
      onActionSelect,
      onSelectRef,
      searchPredicateRef,
      // Derived state
      searchable,
      disabled,
    }),
    [
      dynamicContextProps,
      triggerId,
      id,
      required,
      name,
      options,
      placeholder,
      loadingPlaceholder,
      loading,
      clearable,
      variant,
      pill,
      size,
      dropdownIconType,
      block,
      align,
      alignOffset,
      side,
      avoidCollisions,
      listWidth,
      listMinWidth,
      listMaxWidth,
      searchPlaceholder,
      searchEmptyMessage,
      TriggerStartIcon,
      triggerClassName,
      opticallyAlign,
      optionClassName,
      OptionView,
      actions,
      onActionSelect,
      onSelectRef,
      searchable,
      disabled,
    ],
  )

  return (
    // NOTE: Cannot peacefully coerce SelectContextValue into a generic, so casting to any here.
    // This is safe because `store` is strongly typed above.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <SelectContext.Provider value={store as any}>
      <CustomSelect />
    </SelectContext.Provider>
  )
}

// ============================================================
// Trigger
// ============================================================
type SelectTriggerProps = {
  onOpenChange?: (maybeNextState?: boolean) => void
  tabIndex?: number
  ["aria-hidden"]?: "false" | "true"
  ref?: React.Ref<HTMLButtonElement | null>
}

export const SelectTrigger = (props: SelectTriggerProps) => {
  const {
    triggerId,
    id,
    required,
    value,
    multiple,
    options,
    loading,
    disabled,
    clearable,
    name,
    variant,
    pill,
    size,
    dropdownIconType,
    placeholder,
    loadingPlaceholder,
    block,
    opticallyAlign,
    triggerClassName,
    TriggerStartIcon,
    TriggerView,
    onSelectRef,
  } = useSelectContext()
  const {
    onOpenChange,
    // pass along props from Radix
    ...restProps
  } = props
  const firstValue = multiple ? value[0] : value
  const placeholderValue = loading ? loadingPlaceholder : placeholder

  const selectedItem = useMemo<Option>(
    () =>
      getOptionByValue(options, firstValue) || {
        value: "",
        label: placeholderValue,
      },
    [firstValue, options, placeholderValue],
  )
  const hasSelectedValue = multiple ? value.length > 0 : !!value
  const isPlaceholder = loading || !hasSelectedValue

  const typeahead = useMemo(() => createTypeahead(), [])

  const multipleTriggerViewProps = useMemo<MultiSelectTriggerViewProps<Option>>(() => {
    if (!multiple) {
      return { values: [], selectedAll: false }
    }

    const currentSelectedOptions = getOptionsByValues(options, value)
    const flatOptions = options.flatMap((o) => ("options" in o ? o.options : o))

    return {
      values: currentSelectedOptions.length
        ? currentSelectedOptions
        : [
            {
              value: "",
              label: placeholderValue,
            },
          ],
      selectedAll: flatOptions.length <= value.length,
    }
  }, [multiple, options, value, placeholderValue])

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
    const key = evt.key

    // If not a command, check for typeahead
    // NOTE: Typeahead not supported in multi-select
    if (!multiple && isValidTypeaheadChar(key)) {
      const currentTypeaheadValue = typeahead(key)
      // Stop other listeners from reacting
      evt.stopPropagation()

      // Attempt to filter options based on the value
      // NOTE: We don't look at current highlighted value as a means to start the search
      const firstMatchingOption = getTypeaheadOption(options, currentTypeaheadValue, firstValue)

      if (firstMatchingOption) {
        onSelectRef.current(firstMatchingOption)
      }
    }
  }

  const handleClearClick = () => {
    onSelectRef.current({ value: "", label: "" })
    // Ensure open state is closed
    onOpenChange?.(false)
  }

  return (
    <SelectControl
      id={triggerId}
      className={triggerClassName}
      selected={!isPlaceholder}
      variant={variant}
      pill={pill}
      block={block}
      size={size}
      disabled={disabled}
      loading={loading}
      StartIcon={TriggerStartIcon}
      opticallyAlign={opticallyAlign}
      dropdownIconType={dropdownIconType}
      onClearClick={clearable ? handleClearClick : undefined}
      onInteract={onOpenChange}
      onKeyDown={handleKeyDown}
      {...restProps}
    >
      {multiple ? <TriggerView {...multipleTriggerViewProps} /> : <TriggerView {...selectedItem} />}
      {(name || id) && (
        <input
          id={id}
          name={name}
          value={firstValue}
          tabIndex={-1}
          onFocus={() => {
            document.getElementById(triggerId)?.focus()
          }}
          // keep react from complaining - don't make this readOnly because that
          // prevents the value from being required
          onChange={() => {}}
          required={required}
          className="sr-only w-full h-0 left-0 bottom-0 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </SelectControl>
  )
}

// ============================================================
// Custom Select
// ============================================================
const CustomSelect = () => {
  const {
    triggerId,
    loading,
    side,
    align,
    alignOffset,
    avoidCollisions,
    listWidth,
    listMinWidth,
    listMaxWidth,
  } = useSelectContext()
  const [open, setOpen] = useState<boolean>(false)
  const selectContentRef = useRef<HTMLDivElement>(null)

  const handleOpenChange = (maybeNextState?: boolean) => {
    // Toggle the current state when called without a specific state
    const nextState = maybeNextState === undefined ? !open : maybeNextState
    setOpen(nextState)

    // When we're closing, manage focus back to trigger manually
    if (!nextState) {
      // Wait until the next tick to determine if another element has become focused
      setTimeout(() => {
        // This should never happen because TransitionGroup should keep the select content in the DOM long
        // enough for this callback to run. However, in the event that the ref is null, not focusing is safer.
        if (!selectContentRef.current) {
          return
        }

        const activeElement = document.activeElement

        // Don't restore focus to the trigger if focus has moved outside of the select menu
        if (activeElement && !selectContentRef.current.contains(activeElement)) {
          return
        }

        document.getElementById(triggerId)?.focus()
      })
    }
  }

  useEscCloseStack(open, () => {
    handleOpenChange(false)
  })

  return (
    <Popover.Root
      open={open}
      onOpenChange={(nextState) => {
        // Prevent opening while loading
        if (loading && nextState) {
          return
        }

        handleOpenChange(nextState)
      }}
      modal={false}
    >
      <Popover.Trigger asChild>
        <SelectTrigger onOpenChange={handleOpenChange} />
      </Popover.Trigger>
      <Popover.Portal forceMount>
        <TransitionGroup
          className={s.Menu}
          enterDuration={350}
          exitDuration={200}
          disableAnimations
        >
          {open && (
            <Popover.Content
              key="dropdown"
              ref={selectContentRef}
              forceMount
              className={s.MenuList}
              side={side}
              sideOffset={5}
              align={align}
              alignOffset={alignOffset}
              avoidCollisions={avoidCollisions}
              collisionPadding={{ bottom: 30, top: 30 }}
              // Prevent Radix auto focus so we can handle our own from within <CustomSelectMenu />
              onOpenAutoFocus={preventDefaultHandler}
              // Radix waits until the animation completes before directing focus, which is janky.
              onCloseAutoFocus={preventDefaultHandler}
              onEscapeKeyDown={preventDefaultHandler}
              style={toCssVariables({
                "select-list-width": listWidth,
                "select-list-min-width": listMinWidth,
                "select-list-max-width": listMaxWidth,
              })}
            >
              <CustomSelectMenu onOpenChange={handleOpenChange} />
            </Popover.Content>
          )}
        </TransitionGroup>
      </Popover.Portal>
    </Popover.Root>
  )
}

type CustomSelectMenuContextValue = {
  valueRef: React.RefObject<string | null>
  listId: string
  requestCloseRef: React.RefObject<() => void | null>
  listRef: React.RefObject<HTMLDivElement | null>
  // Highlighting
  highlightedValue: string
  setHighlightedValue: React.Dispatch<React.SetStateAction<string>>
  // Search
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  searchInputRef: React.RefObject<HTMLInputElement | null>
}

const CustomSelectMenuContext = createContext<CustomSelectMenuContextValue | null>(null)

const useCustomSelectMenuContext = () => {
  const context = use(CustomSelectMenuContext)

  if (!context) {
    throw new Error("CustomSelectMenu components must be wrapped in <CustomSelectMenu />")
  }

  return context
}

type CustomSelectMenuProps = {
  onOpenChange: (maybeNextState?: boolean) => void
}

const CustomSelectMenu = ({ onOpenChange }: CustomSelectMenuProps) => {
  const { multiple, value, options, searchable, searchPredicateRef } = useSelectContext()
  const requestCloseRef = useRef<() => void>(() => onOpenChange(false))
  const menuRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedValue, setHighlightedValue] = useState<string>(() => {
    const selectedValue = multiple ? value[0] : value
    return (selectedValue || getFirstValidOption(options)?.value) ?? ""
  })
  const typeahead = useMemo(() => createTypeahead(), [])
  const internalListId = useId()
  const listId = `select-list-${internalListId}`

  // Lock `value` for a given open to prevent janky change during close animation
  // NOTE: This ref has no use in MultiSelect cases, set to empty string as a no-op
  const valueRef = useRef<string>(multiple ? "" : value)

  // Trim and lowercase search value
  const literalSearchTerm = useMemo(() => searchTerm.trim().toLocaleLowerCase(), [searchTerm])
  const filteredOptions = useMemo(
    () => filterOptions(options, literalSearchTerm, searchPredicateRef.current),
    [options, literalSearchTerm, searchPredicateRef],
  )
  const firstOption = useMemo(() => getFirstValidOption(filteredOptions), [filteredOptions])

  // Regrettable requirement for running an effect *after* mount
  const isMountStableRef = useRef<boolean>(false)

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    const key = evt.key
    const firstValue = multiple ? value[0] : value
    const targetValue = highlightedValue || firstOption?.value || firstValue
    const isFocusedInSearch = document.activeElement === searchInputRef.current

    const menuElement = menuRef.current

    // Should be generally impossible for menuRef.current to not exist
    // unless we've unmounted and manage to fire this handler.
    if (!menuElement) {
      return
    }

    const triggerHighlightedOption = () => {
      const pointerUpEvent = new PointerEvent("pointerup", {
        bubbles: true,
        cancelable: true,
        pointerType: "mouse",
      })

      // Find the current highlighted option
      const selectedOption = findOptionByValue(highlightedValue, menuElement)
      selectedOption?.dispatchEvent(pointerUpEvent)
    }

    const highlightOption = (val: string, element: Element) => {
      setHighlightedValue(val)
      element.scrollIntoView({ block: "nearest" })
    }

    const highlightSelectedOrFirstOption = () => {
      // Attempt to move highlight to selected item
      const maybeFirstValue = multiple ? value[0] : value

      if (maybeFirstValue) {
        const selectedElement = findOptionByValue(maybeFirstValue, menuElement)

        if (selectedElement) {
          highlightOption(maybeFirstValue, selectedElement)
          return
        }
      }

      // If value isn't set, or the selected node wasn't found in the DOM,
      // attempt to move focus to the first valid option.
      const firstValidOption = getFirstValidOption(options)

      if (firstValidOption) {
        const firstValidOptionElement = findOptionByValue(firstValidOption.value, menuElement)
        if (firstValidOptionElement) {
          highlightOption(firstValidOption.value, firstValidOptionElement)
        }
      }
    }

    // Commands
    switch (key) {
      case "ArrowDown": {
        evt.preventDefault()

        // If there's no highlighted value, or the highlighted value is not in the DOM
        if (!highlightedValue || !findOptionByValue(highlightedValue, menuElement)) {
          // Attempt to move highlight to selected item
          highlightSelectedOrFirstOption()

          // Short-circuit because we have no highlighted value to advance from
          return
        }

        // Otherwise, move to the next option
        const nextElement = findNextOption(highlightedValue, menuElement)
        const nextValue = nextElement?.getAttribute("data-option-id")
        if (nextElement && nextValue) {
          highlightOption(nextValue, nextElement)
        }

        return
      }
      case "ArrowUp": {
        evt.preventDefault()

        // If there's no highlighted value, or the highlighted value is not in the DOM
        if (!highlightedValue || !findOptionByValue(highlightedValue, menuElement)) {
          // Attempt to move highlight to selected item
          highlightSelectedOrFirstOption()

          // Short-circuit because we have no highlighted value to advance from
          return
        }

        const previousElement = findPreviousOption(targetValue, menuElement)
        const previousValue = previousElement?.getAttribute("data-option-id")
        if (previousElement && previousValue) {
          highlightOption(previousValue, previousElement)
        }

        return
      }
      case "Enter":
        // Prevent default enter behavior from the search input, if present
        evt.preventDefault()

        // Send a pointerDown event into the currently highlighted option
        triggerHighlightedOption()

        return
      case " ":
        // Allow spaces in search, and don't treat as enter
        // if there is a valid literalSearchTerm.
        if (literalSearchTerm && isFocusedInSearch) {
          return
        }

        // Prevent space from entering search input
        evt.preventDefault()

        // Send a pointerDown event into the currently highlighted option
        triggerHighlightedOption()

        return
      default:
        break
    }

    // If not a command, check for typeahead
    if (isValidTypeaheadChar(key)) {
      // Skip typeahead logic when we're focused in the search input
      if (isFocusedInSearch) {
        return
      }

      // Extend the current typeahead and get the latest value
      const currentTypeaheadValue = typeahead(key)

      // Stop other listeners from reacting
      evt.stopPropagation()

      // Attempt to filter options based on the value, starting at the highlighted value
      const firstMatchingOption = getTypeaheadOption(
        options,
        currentTypeaheadValue,
        highlightedValue,
      )

      if (firstMatchingOption) {
        const matchedNode = findOptionByValue(firstMatchingOption.value, menuElement)

        // Only change the highlight if we found the actual node
        if (matchedNode) {
          setHighlightedValue(firstMatchingOption.value)
          // Ensure the newly highlighted option is scrolled into view
          matchedNode.scrollIntoView({ block: "nearest" })
        }
      }
    }
  }

  const store = useMemo(
    () => ({
      valueRef,
      listId,
      highlightedValue,
      setHighlightedValue,
      requestCloseRef,
      searchTerm,
      setSearchTerm,
      searchInputRef,
      listRef,
    }),
    [listId, highlightedValue, setHighlightedValue, searchTerm, setSearchTerm],
  )

  // On mount behavior
  useEffect(() => {
    // Ensure initial highlighted option is in view
    // NOTE: Allowing for a render frame ensures content is positioned correctly before scrolling it into view.
    waitForAnimationFrame(() => {
      if (!menuRef.current) {
        return
      }

      // Ensure the highlighted option is in view
      const currentOption = findOptionByValue(highlightedValue, menuRef.current)
      // Scroll the selected item into view, and its bottom edge.
      currentOption?.scrollIntoView({ block: "center" })
    })

    // Send initial focus to the menu container or search input, to capture key events
    const autoFocusTarget = searchInputRef.current || menuRef.current
    autoFocusTarget?.focus({ preventScroll: true })

    // Required for <StrictMode>, because we need to unset this token
    // when the hooks are re-run. It's an imperative effect that we need to manage.
    return () => {
      isMountStableRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Intentionally an onMount effect
  }, [])

  // On search behavior
  useLayoutEffect(() => {
    // This effect will run on mount, but we want to skip it.
    // The on mount effect is responsible for handling mount behavior,
    // but this effect is specifically responsible for handling search changes
    if (!isMountStableRef.current) {
      isMountStableRef.current = true
      return
    }

    // Impossible while mounted, list ref will exist
    if (!listRef.current) {
      return
    }

    // Reset scroll position to the top
    listRef.current.scrollTop = 0

    // Highlight first item in the list
    const maybeFirstOption = getFirstValidOption(filteredOptions)
    if (maybeFirstOption) setHighlightedValue(maybeFirstOption.value)
  }, [filteredOptions])

  return (
    <CustomSelectMenuContext value={store}>
      <div id={listId} className={s.MenuInner} onKeyDown={handleKeyDown} ref={menuRef} tabIndex={0}>
        {searchable && <CustomSelectSearch value={searchTerm} onChange={setSearchTerm} />}
        <CustomSelectList filteredOptions={filteredOptions} />
        <CustomSelectActions />
      </div>
    </CustomSelectMenuContext>
  )
}

type CustomSelectSearchProps = {
  value: string
  onChange: (nextSearchTerm: string) => void
}

const CustomSelectSearch = ({ value, onChange }: CustomSelectSearchProps) => {
  const { searchPlaceholder } = useSelectContext()
  const { listId, searchInputRef } = useCustomSelectMenuContext()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange(evt.target.value)
  }

  return (
    <div className={s.Search}>
      <Input
        startAdornment={<Search width={16} height={16} className="fill-secondary" />}
        ref={searchInputRef}
        value={value}
        placeholder={searchPlaceholder}
        onChange={handleChange}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-autocomplete="list"
        role="combobox"
        aria-controls={listId}
        aria-expanded
      />
    </div>
  )
}

const isOptionGroup = <T extends Option>(
  mixedOption: T | OptionGroup<T>,
): mixedOption is OptionGroup<T> => {
  return "options" in mixedOption
}

const isOptionGroupArray = <T extends Option>(arr: Options<T>): arr is OptionGroup<T>[] => {
  return arr[0] && isOptionGroup(arr[0])
}

const HARD_OPTIONS_LIMIT = 300

const CustomSelectList = <T extends Option>({
  filteredOptions,
}: {
  filteredOptions: Options<T>
}) => {
  const { searchEmptyMessage } = useSelectContext()
  const { listRef } = useCustomSelectMenuContext()

  if (!filteredOptions.length) {
    return typeof searchEmptyMessage === "string" ? (
      <p className={s.SearchEmpty} data-text-only>
        {searchEmptyMessage}
      </p>
    ) : (
      <div className={s.SearchEmpty}>{searchEmptyMessage}</div>
    )
  }

  // We hard limit within groups, so at this level we will only limit flat arrays
  const isGrouped = isOptionGroupArray(filteredOptions)
  const hasHardLimit = !isGrouped && filteredOptions.length > HARD_OPTIONS_LIMIT

  const options = isGrouped
    ? filteredOptions.map((group) => <CustomSelectGroup key={group.label} {...group} />)
    : filteredOptions
        .slice(0, HARD_OPTIONS_LIMIT)
        .map((option) => <CustomSelectOption key={option.value} {...option} />)

  return (
    <div className={s.OptionsList} ref={listRef}>
      {options}
      {hasHardLimit && (
        <CustomSelectHardLimit numHidden={filteredOptions.length - HARD_OPTIONS_LIMIT} />
      )}
    </div>
  )
}

const DEFAULT_OPTIONS_LIMIT = {
  limit: 100,
  label: "Show all",
}

const CustomSelectGroup = <T extends Option>({
  label,
  options,
  optionsLimit = DEFAULT_OPTIONS_LIMIT,
}: OptionGroup<T>) => {
  const groupId = useId()
  const { searchTerm, setHighlightedValue } = useCustomSelectMenuContext()
  const [limitExpanded, setLimitExpanded] = useState<boolean>(false)

  const hasExpandableLimit = optionsLimit.limit < options.length && !searchTerm && !limitExpanded
  const hasHardLimit = HARD_OPTIONS_LIMIT < options.length && !hasExpandableLimit

  let maybeLimitedOptions = options
  if (hasExpandableLimit) {
    maybeLimitedOptions = options.slice(0, optionsLimit.limit)
  } else if (hasHardLimit) {
    maybeLimitedOptions = options.slice(0, HARD_OPTIONS_LIMIT)
  }

  const handleLimitExpanded = () => {
    // Expand options
    setLimitExpanded(true)

    // Set highlight to the first option from the newly expanded list
    setHighlightedValue(options[optionsLimit.limit].value)
  }

  return (
    // NOTE: Important for crawling that groups are flat
    <>
      <div className={s.OptionGroupHeading}>
        <div className={s.OptionIndicatorSlot} />
        {label}
      </div>
      {maybeLimitedOptions.map((limitedOptions) => (
        <CustomSelectOption key={limitedOptions.value} {...limitedOptions} />
      ))}
      {hasExpandableLimit && (
        <CustomSelectExpandableLimit
          value={`group-limit-${groupId}`}
          label={optionsLimit.label}
          onPointerUp={handleLimitExpanded}
        />
      )}
      {hasHardLimit && <CustomSelectHardLimit numHidden={options.length - HARD_OPTIONS_LIMIT} />}
    </>
  )
}

type CustomSelectHardLimitProps = {
  numHidden: number
}

const CustomSelectHardLimit = ({ numHidden }: CustomSelectHardLimitProps) => {
  return (
    <div className={s.OptionHardLimitHeading}>
      <div className={s.OptionIndicatorSlot} />
      {`…and ${numHidden.toLocaleString()} more options. Use search to refine results further.`}
    </div>
  )
}

type CustomSelectExpandableLimitProps = {
  value: string
  label: string
  onPointerUp: () => void
}

const CustomSelectExpandableLimit = ({
  value,
  label,
  onPointerUp,
}: CustomSelectExpandableLimitProps) => {
  const { highlightedValue, setHighlightedValue } = useCustomSelectMenuContext()

  const isHighlighted = value === highlightedValue

  const handlePointerMove = () => {
    if (isHighlighted) {
      return
    }

    setHighlightedValue(value)
  }

  const handlePointerLeave = () => {
    setHighlightedValue((currentHighlightedValue) => {
      // If the current value is not this one, don't do anything
      // Otherwise, clear the value, removing the active highlight on the menu.
      return currentHighlightedValue !== value ? currentHighlightedValue : ""
    })
  }

  // This component acts a LOT like an Option, but has enough bespoke behavior
  // that it cannot literally be one. We copy the important parts of Option for
  // keyboard navigation, UX, etc.
  return (
    <div
      className={clsx(s.Option, s.OptionsLimit)}
      data-option-id={value}
      data-highlight={isHighlighted ? "" : undefined}
      role="option"
      aria-selected={isHighlighted}
      onPointerUp={onPointerUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className={clsx(s.PressableInner, s.OptionInner)}>
        <div className={s.OptionIndicatorSlot} />
        {label}
      </div>
    </div>
  )
}

const INTERNAL_DOM_SELECTION_DATA_ATTR = "data-option-id"

const CustomSelectOption = (option: Option) => {
  const {
    optionClassName,
    OptionView,
    value: propsValue,
    multiple,
    onSelectRef,
  } = useSelectContext()
  const { valueRef, requestCloseRef, highlightedValue, setHighlightedValue } =
    useCustomSelectMenuContext()
  const { value, disabled, tooltip } = option

  // NOTE: SingleSelect mode looks at the ref instead of the live `propValue` intentionally
  // to avoid selecting the item as the select closes.
  const currentValue = valueRef.current
  const isSelected = multiple ? propsValue.includes(value) : value === currentValue
  const isHighlighted = value === highlightedValue

  const handlePointerUp = () => {
    if (multiple) {
      // Trigger the change ref, optionally as a remove
      onSelectRef.current(option, isSelected)
    } else {
      // Trigger the change ref
      onSelectRef.current(option)
      // Request the dropdown to close
      requestCloseRef.current?.()
    }
  }

  const handlePointerMove = () => {
    if (isHighlighted) {
      return
    }

    setHighlightedValue(value)
  }

  const handlePointerLeave = () => {
    setHighlightedValue((currentHighlightedValue) => {
      // If the current value is not this one, don't do anything
      // Otherwise, clear the value, removing the active highlight on the menu.
      return currentHighlightedValue !== value ? currentHighlightedValue : ""
    })
  }

  return (
    <div
      className={clsx(s.Option, optionClassName)}
      data-highlight={isHighlighted ? "" : undefined}
      role="option"
      aria-selected={isHighlighted}
      data-selected={isSelected ? "" : undefined}
      // Internal attribute for selecting DOM nodes
      {...{ [INTERNAL_DOM_SELECTION_DATA_ATTR]: value }}
      // Allow options to behave like a native select, when you can open and select an item in a single click
      onPointerUp={disabled ? undefined : handlePointerUp}
      // Pointer move allows us to prevent contention from keyboard presses and a still mouse
      // which does trigger events like onMouseEnter, creating weird battles with mouse and keyboard focus.
      onPointerMove={disabled ? undefined : handlePointerMove}
      onPointerLeave={disabled ? undefined : handlePointerLeave}
      aria-disabled={disabled}
      data-disabled={disabled ? "" : undefined}
    >
      <div className={s.PressableInner}>
        <div className={s.OptionInner}>
          <div className={s.OptionIndicatorSlot}>
            {isSelected && <Check className={s.OptionCheck} />}
          </div>
          <OptionView {...option} />
          {tooltip && (
            <Tooltip content={tooltip.content} maxWidth={tooltip.maxWidth} side="right">
              <Info />
            </Tooltip>
          )}
        </div>
        {option.description && (
          <div className={s.OptionInner}>
            <div className={s.OptionIndicatorSlot} />
            {option.description}
          </div>
        )}
      </div>
    </div>
  )
}

const CustomSelectActions = () => {
  const { actions } = useSelectContext()

  if (actions.length === 0) {
    return null
  }

  return (
    <div className={s.ActionsContainer}>
      {actions.map((action) => (
        <CustomSelectAction key={action.id} {...action} />
      ))}
    </div>
  )
}

const CustomSelectAction = ({ id, label, Icon, className }: Action) => {
  const { onActionSelect } = useSelectContext()
  const { requestCloseRef } = useCustomSelectMenuContext()

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const key = evt.key

    switch (key) {
      case "Tab":
        // Allow tabbing to pass propagation as normal,
        // which bubbles up to the focus trap of Radix Popover
        break
      case "Enter":
      case " ":
        evt.stopPropagation()
        handlePointerUp()
        break
      default:
        evt.stopPropagation()
    }
  }

  const handlePointerUp = () => {
    // Trigger the action's through our context helper, not the method on this action (it may be a stale reference)
    onActionSelect(id)
    // Request to close the dropdown
    requestCloseRef.current?.()
  }

  return (
    <div className={s.Action} onPointerUp={handlePointerUp} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={clsx(s.ActionInner, className)}>
        {Icon && <Icon role="presentation" />}
        {label}
      </div>
    </div>
  )
}

// ============================================================
// Utilities
// ============================================================
const defaultSearchPredicate = (option: Option, searchTerm: string) =>
  option.label.toLowerCase().includes(searchTerm)

const filterOptions = <T extends Option>(
  options: Options<T>,
  searchTerm: string,
  searchIterator: SearchPredicate<T>,
): Options<T> => {
  const searchValue = searchTerm.trim().toLocaleLowerCase()

  if (!searchValue) {
    return options
  }

  const filterOption = (option: T): boolean => searchIterator(option, searchValue)

  if (isOptionGroupArray(options)) {
    return options.reduce((acc, group) => {
      const filtered = group.options.filter(filterOption)

      if (filtered.length) {
        acc.push({
          ...group,
          options: filtered,
        })
      }
      return acc
    }, [] as OptionGroup<T>[])
  } else {
    return options.reduce((acc, option) => {
      if (filterOption(option)) acc.push(option)
      return acc
    }, [] as T[])
  }
}

const getFirstValidOption = <T extends Option>(options: Options<T>): T | undefined => {
  if (!options.length) {
    return undefined
  }

  let found: T | undefined

  for (const opt of options) {
    if (isOptionGroup(opt)) {
      const firstNonDisabled = opt.options.find((i) => !i.disabled)
      if (firstNonDisabled) {
        found = firstNonDisabled
        break
      }
    } else {
      if (!opt.disabled) {
        found = opt
        break
      }
    }
  }

  return found
}

const getOptionByValue = <T extends Option>(options: Options<T>, value: string): T | undefined => {
  let found: T | undefined

  for (const opt of options) {
    if (isOptionGroup(opt)) {
      const exists = opt.options.find((i) => i.value === value)
      if (exists) {
        found = exists
        break
      }
    } else {
      if (opt.value === value) {
        found = opt
        break
      }
    }
  }

  return found
}

const getOptionsByValues = <T extends Option>(options: Options<T>, values: string[]): T[] => {
  let found: T[] = []
  const lookup = new Set(values)

  for (const opt of options) {
    if (isOptionGroup(opt)) {
      const exists = opt.options.filter((i) => lookup.has(i.value))
      found = found.concat(exists)
    } else {
      if (lookup.has(opt.value)) {
        found.push(opt)
      }
    }
  }

  return found
}

const MAX_DOM_CRAWLS = 40

const findOptionByValue = (currentValue: string, container: HTMLElement) =>
  container.querySelector(`[data-option-id="${currentValue}"]`)

const isValidOptionNode = (node: Element) => node.matches("[data-option-id]:not([data-disabled])")

const findNextOption = (currentValue: string, container: HTMLElement) => {
  const currentOption = findOptionByValue(currentValue, container)

  let nextNode = currentOption?.nextElementSibling
  let maxSteps = 0

  while (nextNode && maxSteps < MAX_DOM_CRAWLS) {
    if (isValidOptionNode(nextNode)) {
      return nextNode
    }

    nextNode = nextNode.nextElementSibling
    maxSteps += 1
  }
}

const findPreviousOption = (currentValue: string, container: HTMLElement) => {
  const currentOption = findOptionByValue(currentValue, container)

  let nextNode = currentOption?.previousElementSibling
  let maxSteps = 0

  while (nextNode && maxSteps < MAX_DOM_CRAWLS) {
    if (isValidOptionNode(nextNode)) {
      return nextNode
    }

    nextNode = nextNode.previousElementSibling
    maxSteps += 1
  }
}

const createTypeahead = () => {
  let currentValue: string = ""
  let timeoutId: ReturnType<typeof setTimeout>

  return (char: string) => {
    // Searching is case-insensitive
    char = char.toLowerCase()

    // Add the new character to the current value
    currentValue += char

    // Clear the previous timeout if there was one
    if (timeoutId) clearTimeout(timeoutId)

    // Reset the value after a brief delay
    timeoutId = setTimeout(() => {
      currentValue = ""
    }, 500)

    // When a user is typing the same value, like "llll", assume they are cycling through items starting with "l"
    // We continue to build up the string in case another letter is typed, and then release the full value.
    // For example, if the user types "ooog", it will return "o", until "g" is typed, and then return the "ooog".
    const isCycling = char.repeat(currentValue.length) === currentValue

    // Return the typeahead value
    return isCycling ? char : currentValue
  }
}

const isValidTypeaheadChar = (char: string): boolean => /^[a-zA-Z0-9]$/.test(char)

const getTypeaheadOption = <T extends Option>(
  options: Options<T>,
  typeaheadValue: string,
  currentHighlightValue?: string,
): T | undefined => {
  // Ensure options actually exist
  if (!options.length) {
    return undefined
  }

  let matchBeforeHighlight: T | undefined
  let matchAfterHighlight: T | undefined
  // If we' aren't provided a highlighted value, start from the top (e.g., act like it's found)
  let foundHighlightedValue: boolean = !currentHighlightValue

  const optionValidAndMatches = ({ disabled, label, value }: T) => {
    // Side effect of looping
    if (value === currentHighlightValue) {
      foundHighlightedValue = true
      // Don't return highlighted value
      return false
    }

    return !disabled && label.toLowerCase().startsWith(typeaheadValue)
  }

  for (const opt of options) {
    if (isOptionGroup(opt)) {
      for (const option of opt.options) {
        if (optionValidAndMatches(option)) {
          if (foundHighlightedValue) {
            matchAfterHighlight = option
            // We're done after we've found an after match
            break
          } else {
            // Keep the first found "before" match
            matchBeforeHighlight = matchBeforeHighlight || option
          }
        }
      }
    } else {
      if (optionValidAndMatches(opt)) {
        if (foundHighlightedValue) {
          matchAfterHighlight = opt
          // We're done after we've found an after match
          break
        } else {
          // Keep the first found "before" match
          matchBeforeHighlight = matchBeforeHighlight || opt
        }
      }
    }
  }

  return matchAfterHighlight || matchBeforeHighlight
}
