"use client"

import { DropdownMenu } from "radix-ui"
import React, {
  type ComponentProps,
  type ComponentType,
  createContext,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"

import clsx from "clsx"
import { useEscCloseStack } from "../../hooks/useEscCloseStack"
import { useLatestValue } from "../../hooks/useLatestValue"
import { preventDefaultHandler, toCssVariables } from "../../lib/helpers"
import { useLinkComponent } from "../AppsSDKUIProvider/internal"
import { Button } from "../Button"
import { Check, ChevronRight } from "../Icon"
import { TransitionGroup } from "../Transition"
import s from "./Menu.module.css"

type MenuContextValue = {
  open: boolean
  setOpen: (next: boolean) => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

const useMenuContext = () => {
  const context = useContext(MenuContext)

  if (!context) {
    throw new Error("Menu components must be wrapped in <Menu />")
  }

  return context
}

export type MenuProps = {
  children: React.ReactNode
  /** Force the menu to remain open or closed */
  forceOpen?: boolean
  /** Callback triggered when the modal is opened */
  onOpen?: () => void
  /** Callback triggered when the modal is closed */
  onClose?: () => void
  /**
   * When set to `true`, interaction with outside elements will be disabled and only menu content will be visible to screen readers.
   * @default false
   */
  modal?: boolean
}

export const Menu = ({ children, forceOpen, onOpen, onClose, modal = false }: MenuProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const isOpen = forceOpen ?? open

  const latestOnOpen = useLatestValue(onOpen)
  const latestOnClose = useLatestValue(onClose)

  const handleOpenChange = useCallback(
    (nextState: boolean) => {
      setOpen(nextState)
      if (nextState) {
        latestOnOpen.current?.()
      } else {
        latestOnClose.current?.()
      }
    },
    [latestOnOpen, latestOnClose],
  )

  useEscCloseStack(open, () => {
    handleOpenChange(false)
  })

  const store = useMemo<MenuContextValue>(
    () => ({
      open: isOpen,
      setOpen: handleOpenChange,
    }),
    [isOpen, handleOpenChange],
  )

  return (
    <MenuContext.Provider value={store}>
      <DropdownMenu.Root open={isOpen} onOpenChange={handleOpenChange} modal={modal}>
        {children}
      </DropdownMenu.Root>
    </MenuContext.Provider>
  )
}

export type MenuItemProps = {
  className?: string
  children: React.ReactNode
  /** Callback triggered when the item is pressed */
  onSelect?: DropdownMenu.DropdownMenuItemProps["onSelect"]
  /** Callback triggered when the item is clicked */
  onClick?: DropdownMenu.DropdownMenuItemProps["onClick"]
  /** Disables the menu item */
  disabled?: boolean
}

const Item = ({ className, children, disabled, onSelect, onClick }: MenuItemProps) => {
  const { open } = useMenuContext()

  // This handler patches over focus races with core Radix primitives
  // https://github.com/radix-ui/primitives/blob/main/packages/react/menu/src/Menu.tsx#L712-L734
  const handlePreventAfterClose = (evt: React.PointerEvent<HTMLDivElement>) => {
    // Prevent default behavior when we're always known to be closing
    if (!open) {
      evt.preventDefault()
    }
  }

  // Custom click handlers
  if (onSelect) {
    return (
      <DropdownMenu.Item
        className={clsx(s.MenuItem, className)}
        onSelect={onSelect}
        onClick={onClick}
        disabled={disabled}
        onPointerMove={handlePreventAfterClose}
        onPointerLeave={handlePreventAfterClose}
      >
        <div className={s.PressableInner}>{children}</div>
      </DropdownMenu.Item>
    )
  }

  // Read-only content - will not appear interactive.
  return <div className={clsx(s.MenuItemContent, className)}>{children}</div>
}

const ItemActions = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <div className={clsx(s.ItemActions, className)}>{children}</div>
}

const ItemAction = ({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: (evt: MouseEvent) => void
}) => {
  const { setOpen } = useMenuContext()

  return (
    <Button
      className="rounded-sm"
      color="secondary"
      size="xs"
      uniform
      iconSize="sm"
      variant="ghost"
      onClick={(evt) => {
        evt.stopPropagation()
        setOpen(false)
        onClick(evt)
      }}
    >
      {children}
    </Button>
  )
}

type MenuLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
  /** Content rendered inside the Link */
  children: React.ReactNode
  /** Disables the menu item */
  disabled?: boolean
}

type MenuLink = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any> | "a" = AppsSDKUI.LinkComponent,
>(
  props: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
    MenuLinkProps & {
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

const Link = ((
  props: MenuLinkProps & { href?: string; to?: string; as?: AppsSDKUI.LinkComponent },
) => {
  const { className, children, href, to, disabled, as: OverrideComponent, ...restProps } = props
  const { open } = useMenuContext()

  const propPath = href || to
  // When a path is not provided, default to an anchor
  const isExternal = propPath ? /^https?:\/\//.test(propPath) : true
  const DefaultComponent = useLinkComponent()
  const Component = OverrideComponent || (isExternal ? "a" : DefaultComponent)

  // This handler patches over focus races with core Radix primitives
  // https://github.com/radix-ui/primitives/blob/main/packages/react/menu/src/Menu.tsx#L712-L734
  const handlePreventAfterClose = (evt: React.PointerEvent<HTMLDivElement>) => {
    // Prevent default behavior when we're always known to be closing
    if (!open) {
      evt.preventDefault()
    }
  }

  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer", href: href ?? to }
    : { href, to }

  return (
    <DropdownMenu.Item
      asChild
      className={clsx(s.MenuItem, className)}
      disabled={disabled}
      onPointerMove={isExternal ? undefined : handlePreventAfterClose}
      onPointerLeave={isExternal ? undefined : handlePreventAfterClose}
    >
      <Component {...linkProps} {...restProps}>
        <span className={s.PressableInner}>{children}</span>
      </Component>
    </DropdownMenu.Item>
  )
}) as MenuLink

const Separator = ({ className }: { className?: string }) => {
  return <DropdownMenu.Separator className={clsx(s.Separator, className)} role="separator" />
}

export type MenuContentProps = {
  children: React.ReactNode
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
   * @default bottom
   */
  side?: DropdownMenu.DropdownMenuContentProps["side"]
  /**
   * The distance in pixels from the trigger.
   * @default 5
   */
  sideOffset?: DropdownMenu.DropdownMenuContentProps["sideOffset"]
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default center
   */
  align?: DropdownMenu.DropdownMenuContentProps["align"]
  /**
   * An offset in pixels from the "start" or "end" alignment options.
   * @default 0
   */
  alignOffset?: DropdownMenu.DropdownMenuContentProps["alignOffset"]
  /**
   * Defines the `width` property of the content
   * @default auto
   */
  width?: number | "auto"
  /**
   * Defines the `min-width` property of the content, in pixels.
   * @default 300
   */
  minWidth?: number | "auto"
  /**
   * Defines the `max-width` property of the content, in pixels.
   */
  maxHeight?: number
}

const Content = ({
  children,
  side,
  sideOffset = 5,
  align,
  alignOffset,
  width,
  minWidth,
  maxHeight,
}: MenuContentProps) => {
  const { open } = useMenuContext()

  return (
    <DropdownMenu.Portal forceMount>
      <TransitionGroup className={s.Menu} enterDuration={350} exitDuration={200} disableAnimations>
        {open && (
          <DropdownMenu.Content
            key="dropdown"
            forceMount
            className={s.MenuList}
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset ?? (align === "center" ? 0 : -5)}
            avoidCollisions
            collisionPadding={{ bottom: 30, top: 30, left: 12, right: 12 }}
            onEscapeKeyDown={preventDefaultHandler}
            style={toCssVariables({
              "menu-width": width,
              "menu-min-width": minWidth,
              "menu-max-height": maxHeight,
            })}
          >
            {children}
          </DropdownMenu.Content>
        )}
      </TransitionGroup>
    </DropdownMenu.Portal>
  )
}

const Trigger = ({ children, disabled }: DropdownMenu.DropdownMenuTriggerProps) => {
  return (
    <DropdownMenu.Trigger asChild disabled={disabled}>
      {children}
    </DropdownMenu.Trigger>
  )
}

type SubmenuContextValue = {
  open: boolean
  setOpen: (next: boolean) => void
  triggerRef: React.RefObject<HTMLDivElement | null>
}

const SubmenuContext = createContext<SubmenuContextValue | null>(null)

const useSubmenuContext = () => {
  const context = useContext(SubmenuContext)

  if (!context) {
    throw new Error("Submenu components must be wrapped in <Sub />")
  }

  return context
}

export type SubmenuProps = {
  children: React.ReactNode
  /** Force the menu to remain open or closed */
  forceOpen?: boolean
  /** Callback triggered when the modal is opened */
  onOpen?: () => void
  /** Callback triggered when the modal is closed */
  onClose?: () => void
}

const Sub = ({ children, forceOpen, onOpen, onClose }: SubmenuProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const isOpen = forceOpen ?? open

  const latestOnOpen = useLatestValue(onOpen)
  const latestOnClose = useLatestValue(onClose)

  const handleOpenChange = useCallback(
    (nextState: boolean) => {
      setOpen(nextState)
      if (nextState) {
        latestOnOpen.current?.()
      } else {
        latestOnClose.current?.()
      }
    },
    [latestOnOpen, latestOnClose],
  )

  useEscCloseStack(open, () => {
    handleOpenChange(false)
    // Ensure trigger is focused
    triggerRef.current?.focus()
  })

  const store = useMemo<SubmenuContextValue>(
    () => ({
      open: isOpen,
      setOpen: handleOpenChange,
      triggerRef,
    }),
    [isOpen, handleOpenChange],
  )

  return (
    <SubmenuContext.Provider value={store}>
      <DropdownMenu.Sub open={isOpen} onOpenChange={handleOpenChange}>
        {children}
      </DropdownMenu.Sub>
    </SubmenuContext.Provider>
  )
}

const SubTrigger = ({
  className,
  children,
  disabled,
}: {
  className?: string
  children: ReactNode
  disabled?: boolean
}) => {
  const { open } = useMenuContext()
  const { triggerRef } = useSubmenuContext()

  // This handler patches over focus races with core Radix primitives
  // https://github.com/radix-ui/primitives/blob/main/packages/react/menu/src/Menu.tsx#L712-L734
  const handlePreventAfterClose = (evt: React.PointerEvent<HTMLDivElement>) => {
    // Prevent default behavior when we know the outer menu is closing
    if (!open) {
      evt.preventDefault()
    }
  }

  return (
    <DropdownMenu.SubTrigger
      ref={triggerRef}
      className={clsx(s.MenuItem, s.SubMenuItem, className)}
      disabled={disabled}
      onPointerMove={handlePreventAfterClose}
      onPointerLeave={handlePreventAfterClose}
    >
      <div className={s.PressableInner}>
        {children}
        <ChevronRight width="16" height="16" className={s.SubTriggerIcon} />
      </div>
    </DropdownMenu.SubTrigger>
  )
}

type SubContentProps = {
  children: ReactNode
  sideOffset?: DropdownMenu.DropdownMenuSubContentProps["sideOffset"]
  alignOffset?: DropdownMenu.DropdownMenuSubContentProps["alignOffset"]
  width?: number | "auto"
  minWidth?: number | "auto"
  maxHeight?: number
}

const SubContent = ({
  children,
  sideOffset = 4,
  alignOffset = -6,
  width = "auto",
  minWidth = "auto",
  maxHeight,
}: SubContentProps) => {
  const { open } = useSubmenuContext()

  return (
    <DropdownMenu.Portal forceMount>
      <TransitionGroup className={s.Menu} enterDuration={350} exitDuration={200} disableAnimations>
        {open && (
          <DropdownMenu.SubContent
            key="submenu"
            className={s.MenuList}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            avoidCollisions
            collisionPadding={{ bottom: 30, top: 30, left: 12, right: 12 }}
            onEscapeKeyDown={preventDefaultHandler}
            style={toCssVariables({
              "menu-width": width,
              "menu-min-width": minWidth,
              "menu-max-height": maxHeight,
            })}
          >
            {children}
          </DropdownMenu.SubContent>
        )}
      </TransitionGroup>
    </DropdownMenu.Portal>
  )
}

export type MenuRadioGroupProps<T extends string> = {
  /** Controlled value */
  value: T
  /** Fired when selection changes */
  onChange: (value: T) => void
  children: ReactNode
  /**
   * The orientation of the indicator within the radio item.
   * @default end
   */
  indicatorPosition?: "start" | "end"
}

const RadioGroup = <T extends string>({
  children,
  value,
  onChange,
  indicatorPosition = "end",
  ...props
}: MenuRadioGroupProps<T>) => (
  <DropdownMenu.RadioGroup
    {...props}
    value={value}
    onValueChange={(v: string) => onChange(v as T)}
    data-indicator-position={indicatorPosition}
  >
    {children}
  </DropdownMenu.RadioGroup>
)

export type MenuRadioItemProps<T extends string> = {
  value: T
  /** Class applied to the radio item */
  className?: string
  children: ReactNode
  /** Callback triggered when the radio item is pressed */
  onSelect?: DropdownMenu.DropdownMenuItemProps["onSelect"]
  /** Disables the radio item */
  disabled?: boolean
}

const RadioItem = <T extends string>({ className, children, ...props }: MenuRadioItemProps<T>) => (
  <DropdownMenu.RadioItem className={clsx(s.MenuItem, s.RadioItem, className)} {...props}>
    <div className={s.PressableInner}>
      <div className={s.RadioIndicator}>
        <DropdownMenu.ItemIndicator className={s.RadioIndicatorActive} />
      </div>
      {children}
    </div>
  </DropdownMenu.RadioItem>
)

export type MenuCheckboxItemProps = {
  /** Controlled checked state of the checkbox item */
  checked?: DropdownMenu.DropdownMenuCheckboxItemProps["checked"]
  /** Event handler called when the checked state changes */
  onCheckedChange?: DropdownMenu.DropdownMenuCheckboxItemProps["onCheckedChange"]
  /** Class applied to the checkbox item */
  className?: string
  children: ReactNode
  /** Callback triggered when the checkbox item is pressed */
  onSelect?: DropdownMenu.DropdownMenuItemProps["onSelect"]
  /** Disables the checkbox item */
  disabled?: boolean
  /**
   * The orientation of the indicator within the checkbox item.
   * @default end
   */
  indicatorPosition?: "start" | "end"
  /**
   * Visual treatment for the checkbox indicator.
   * @default solid
   */
  indicatorVariant?: "solid" | "ghost"
}
const CheckboxItem = ({
  className,
  children,
  indicatorPosition = "end",
  indicatorVariant = "solid",
  ...props
}: MenuCheckboxItemProps) => (
  <DropdownMenu.CheckboxItem
    className={clsx(s.MenuItem, s.CheckboxItem, className)}
    {...props}
    data-indicator-position={indicatorPosition}
    data-indicator-variant={indicatorVariant}
  >
    <div className={s.PressableInner}>
      <div className={s.CheckboxIndicator}>
        <DropdownMenu.ItemIndicator>
          {indicatorVariant === "ghost" ? (
            <Check className="size-4" />
          ) : (
            <div className={s.CheckboxCircle}>
              <Check className="size-4" />
            </div>
          )}
        </DropdownMenu.ItemIndicator>
      </div>
      {children}
    </div>
  </DropdownMenu.CheckboxItem>
)

Menu.Content = Content
Menu.Item = Item
Menu.ItemActions = ItemActions
Menu.ItemAction = ItemAction
Menu.Link = Link
Menu.Separator = Separator
Menu.Trigger = Trigger
Menu.Sub = Sub
Menu.SubTrigger = SubTrigger
Menu.SubContent = SubContent
Menu.CheckboxItem = CheckboxItem
Menu.RadioGroup = RadioGroup
Menu.RadioItem = RadioItem
