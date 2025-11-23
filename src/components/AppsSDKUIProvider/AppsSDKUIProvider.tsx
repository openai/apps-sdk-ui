"use client"

import { type ComponentType, type ForwardRefExoticComponent, type ReactNode } from "react"
import { AppsSDKUIContext } from "./AppsSDKUIContext"

/// <reference path="../../global.d.ts" />

interface DefaultConfig {
  LinkComponent: "a"
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AppsSDKUIConfig {}
}

// Utility type to merge defaults with overrides. The override keys take precedence.
type MergeOverrides<Defaults, Overrides> = Omit<Defaults, keyof Overrides> & Overrides

export type Config = MergeOverrides<DefaultConfig, AppsSDKUIConfig>

export type LinkComponent = Config["LinkComponent"]

/**
 * Shared context for all Apps SDK UI components - wrap your app in this
 * provider to use Apps SDK UI components.
 *
 * It's pretty thin right now, we only use it to hold onto the component you
 * use for rendering Links, but it could be expanded in the future.
 */
export function AppsSDKUIProvider({
  children,
  linkComponent,
}: {
  children: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent: ComponentType<any> | ForwardRefExoticComponent<any> | "a"
}) {
  return <AppsSDKUIContext.Provider value={{ linkComponent }}>{children}</AppsSDKUIContext.Provider>
}
