"use client"

import { useContext } from "react"
import { AppsSDKUIContext } from "./AppsSDKUIContext"

export function useLinkComponent() {
  const context = useContext(AppsSDKUIContext)
  return context?.linkComponent ?? "a"
}
