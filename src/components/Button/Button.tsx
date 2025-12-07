"use client"

import clsx from "clsx"
import {
  type ButtonHTMLAttributes,
  type ComponentProps,
  type ComponentType,
  type MouseEventHandler,
  type ReactNode,
  useCallback,
} from "react"
import { handlePressableMouseEnter } from "../../lib/helpers"
import { wrapTextNodeSiblings } from "../../lib/renderHelpers"
import { type ControlSize, type SemanticColors, type Sizes, type Variants } from "../../types"
import { useLinkComponent } from "../AppsSDKUIProvider/internal"
import { LoadingIndicator } from "../Indicator"
import { TransitionGroup } from "../Transition/TransitionGroup"
import s from "./Button.module.css"

type CommonProps = {
  /**
   * Color for the button
   * @default secondary
   */
  color: SemanticColors<
    "primary" | "secondary" | "danger" | "success" | "info" | "discovery" | "caution" | "warning"
  >
  /**
   * Style variant for the Button
   * @default "solid"
   */
  variant?: Variants<"solid" | "soft" | "outline" | "ghost">
  /**
   * Determines if the button should be a fully rounded pill shape
   * @default true
   */
  pill?: boolean
  /**
   * Disables the button visually and from interactions
   * @default false
   */
  disabled?: boolean
  /**
   * Controls the visual tone when the button is disabled. "relaxed" will use a default cursor instead of not-allowed.
   */
  disabledTone?: "relaxed"
  /**
   * Determines if the button should take up 100% of available width
   * @default false
   */
  block?: boolean
  /**
   * Applies a negative margin using the current gutter to optically align the button
   * with surrounding content.
   */
  opticallyAlign?: "start" | "end"
  /**
   * Controls size of the button, specifically height, but also includes defaults for `gutterSize`, `iconSize`, `font-size`, etc.
   *
   * | 3xs     | 2xs     | xs      | sm      | md      | lg      | xl      | 2xl     | 3xl     |
   * | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
   * | `22px`  | `24px`  | `26px`  | `28px`  | `32px`  | `36px`  | `40px`  | `44px`  | `48px`  |
   * @default md
   */
  size?: ControlSize
  /**
   * Controls the size of icons within the button, defaults to value from `size`.
   *
   * | xs     | sm     | md     | lg     | xl     | 2xl    |
   * | ------ | ------ | ------ | ------ | ------ | ------ |
   * | `14px` | `16px` | `18px` | `20px` | `22px` | `24px` |
   */
  iconSize?: Sizes<"sm" | "md" | "lg" | "xl" | "2xl">
  /**
   * Controls gutter on the edges of the button, defaults to value from `size`.
   *
   * | 3xs    | 2xs    | xs     | sm     | md     | lg     | xl     |
   * | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
   * | `4px`  | `6px`  | `8px`  | `10px` | `12px` | `14px` | `16px` |
   */
  gutterSize?: Sizes<"3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl">
  /** Custom class applied to the Button element */
  className?: string
  /** Content rendered inside of the Button */
  children: React.ReactNode
}

export type ButtonProps = CommonProps & {
  /**
   * Determines if the button should have matching width and height, based on the `size`.
   * @default false
   */
  uniform?: boolean
  /**
   * Displays selected styles on the button, varying by `variant
   * @default false
   */
  selected?: boolean
  /**
   * Displays loading indicator on top of button contents
   * @default false
   */
  loading?: boolean
  /**
   * Determines whether the button should be made inert, without introducing visual change.
   * @default false
   */
  inert?: boolean
  /** Ref for the button */
  ref?: React.Ref<HTMLButtonElement | null>
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
  const {
    type = "button",
    color = "primary",
    variant = "solid",
    pill = true,
    uniform = false,
    size = "md",
    iconSize,
    gutterSize,
    loading,
    selected,
    block,
    opticallyAlign,
    children,
    className,
    onClick,
    disabled,
    disabledTone,
    // Defaults to `loading` state
    inert = loading,
    ...restProps
  } = props

  const isInert = disabled || inert

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (disabled) {
        return
      }
      onClick?.(e)
    },
    [onClick, disabled],
  )

  return (
    <button
      type={type}
      className={clsx(s.Button, className)}
      data-color={color}
      data-variant={variant}
      data-pill={pill ? "" : undefined}
      data-uniform={uniform ? "" : undefined}
      data-size={size}
      data-gutter-size={gutterSize}
      data-icon-size={iconSize}
      data-loading={loading ? "" : undefined}
      data-selected={selected ? "" : undefined}
      data-block={block ? "" : undefined}
      data-optically-align={opticallyAlign}
      onPointerEnter={handlePressableMouseEnter}
      // Non-visual, accessible disablement
      // NOTE: Do not use literal `inert` because that is incorrect semantically
      disabled={isInert}
      aria-disabled={isInert}
      tabIndex={isInert ? -1 : undefined}
      // Visual disablement
      data-disabled={disabled ? "" : undefined}
      data-disabled-tone={disabled ? disabledTone : undefined}
      onClick={handleClick}
      {...restProps}
    >
      <TransitionGroup className={s.ButtonLoader} enterDuration={250} exitDuration={150}>
        {loading && <LoadingIndicator key="loader" />}
      </TransitionGroup>
      <span className={s.ButtonInner}>{wrapTextNodeSiblings(children)}</span>
    </button>
  )
}

type ButtonLink = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any> | "a" = AppsSDKUI.LinkComponent,
>(
  props: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
    CommonProps & {
      /**
       * Explicity specify that the link is an external link. This should be
       * automatically detected based on the URL, but in some cases (e.g.
       * my-app://foo) you may want to explicitly set this.
       */
      external?: boolean
      /**
       * Override the default component used for the link. This is useful for
       * using a routing library, or SSR rendering.
       * purposes.
       *
       * @default 'a'
       */
      as?: T
    } & ComponentProps<T>,
) => ReactNode

export const ButtonLink = ((
  props: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
    CommonProps & {
      href?: string
      to?: string
      external?: boolean
      as?: AppsSDKUI.LinkComponent
    },
) => {
  const {
    color = "primary",
    variant = "solid",
    pill = true,
    size = "md",
    gutterSize,
    iconSize,
    external,
    block,
    opticallyAlign,
    children,
    className,
    disabled,
    disabledTone,
    onClick,
    onPointerEnter,
    as: OverrideComponent,
    href,
    to,
    ...restProps
  } = props

  const isExternal = external ?? /^https?:\/\//.test(href ?? to ?? "")
  const DefaultComponent = useLinkComponent()
  const LinkComponent = OverrideComponent || (isExternal ? "a" : DefaultComponent)

  const sharedProps = {
    "className": clsx(s.Button, className),
    disabled,
    "aria-disabled": disabled,
    "tabIndex": disabled ? -1 : undefined,
    // Visual disablement (inert not supported in links, always applied)
    "data-disabled": disabled ? "" : undefined,
    "data-disabled-tone": disabled ? disabledTone : undefined,
    "data-color": color,
    "data-variant": variant,
    "data-pill": pill ? "" : undefined,
    "data-block": block ? "" : undefined,
    "data-optically-align": opticallyAlign,
    "data-size": size,
    "data-gutter-size": gutterSize,
    "data-icon-size": iconSize,
    "onClick": disabled ? undefined : onClick,
    "onPointerEnter": (evt: React.PointerEvent<HTMLAnchorElement>) => {
      handlePressableMouseEnter(evt)
      onPointerEnter?.(evt)
    },
  }

  if (disabled) {
    // Don't thread down stuff that isn't valid for a span - just keep the event handlers
    const eventProps = Object.fromEntries(
      Object.entries(restProps).filter(
        ([key, value]) => key.startsWith("on") && typeof value === "function",
      ),
    )
    return (
      <span role="link" {...sharedProps} {...eventProps}>
        <span className={s.ButtonInner}>{wrapTextNodeSiblings(children)}</span>
      </span>
    )
  }

  const linkProps = {
    ...(isExternal
      ? { target: "_blank", rel: "noopener noreferrer", href: href ?? to }
      : { href, to }),
    ...sharedProps,
    ...restProps,
  }

  return (
    <LinkComponent {...linkProps}>
      <span className={s.ButtonInner}>{wrapTextNodeSiblings(children)}</span>
    </LinkComponent>
  )
}) as ButtonLink
