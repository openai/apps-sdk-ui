import clsx from "clsx"
import { type ComponentProps, type ComponentType, type ReactNode } from "react"
import { useLinkComponent } from "../AppsSDKUIProvider/internal"
import s from "./TextLink.module.css"

export type TextLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  /** Content rendered inside the Link */
  children: React.ReactNode
  /**
   * Applies a primary color to the link and removes the default `underline`.
   * @default false
   */
  primary?: boolean
  /**
   * Apply `text-decoration: underline` to the Link
   * @default true
   */
  underline?: boolean
  /** Force external link behavior, which is automatically detected based on the URL. */
  forceExternal?: boolean
}

type MakeOptional<P, K extends keyof P> = Omit<P, K> & Partial<Pick<P, Extract<keyof P, K>>>

type TextLink = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any> | "a" = AppsSDKUI.LinkComponent,
>(
  props: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
    TextLinkProps & {
      /**
       * Override the default component used for the link. This is useful for
       * using a different routing library (e.g. React Router) or for testing
       * purposes.
       *
       * @default 'a'
       */
      as?: T
    } & MakeOptional<ComponentProps<T>, "href" | "to">,
) => ReactNode

export const TextLink = ((
  props: TextLinkProps & { href?: string; to?: string; as?: AppsSDKUI.LinkComponent },
) => {
  const {
    children,
    primary = false,
    underline = !primary,
    className,
    target,
    forceExternal,
    as: OverrideComponent,
    href,
    to,
    ...restProps
  } = props

  const isExternal = forceExternal ?? /^https?:\/\//.test(href ?? to ?? "")
  const DefaultComponent = useLinkComponent()
  const Component = OverrideComponent || (isExternal ? "a" : DefaultComponent)

  const sharedProps = {
    ...restProps,
    "className": clsx(s.TextLink, className),
    "data-primary": primary ? "" : undefined,
    "data-underline": underline ? "" : undefined,
  }

  // Visible link, but non-anchor element. Useful if you want a visual link
  // that cannot be naturally meta-clicked (e.g., inadvertently open a new tab)
  if (!href && !to) {
    return (
      // the forwardedRef is lying here, but should be fine. :innocent:
      <span {...sharedProps} role="button">
        {children}
      </span>
    )
  }

  const linkProps = {
    ...(isExternal
      ? { target: "_blank", rel: "noopener noreferrer", href: href ?? to }
      : { href, to }),
    ...sharedProps,
  }

  return <Component {...linkProps}>{children}</Component>
}) as TextLink
