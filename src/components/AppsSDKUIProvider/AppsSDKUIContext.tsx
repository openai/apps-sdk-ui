import { type ComponentType, createContext, type ForwardRefExoticComponent } from "react"

type AppsSDKUIContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkComponent: ComponentType<any> | ForwardRefExoticComponent<any> | "a"
}

export const AppsSDKUIContext = createContext<AppsSDKUIContextValue | null>(null)
