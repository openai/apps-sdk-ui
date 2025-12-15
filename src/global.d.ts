/**
 * Global oai object injected by the web sandbox for communicating with chatgpt host page.
 */
import type { API, OpenAiGlobals, type SET_GLOBALS_EVENT_TYPE, type SetGlobalsEvent } from "./types"
declare global {
  interface DefaultConfig {
    LinkComponent: "a"
    Breakpoint: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AppsSDKUIOverrides {}

  // Utility type to merge defaults with overrides. The override keys take precedence.
  type MergeOverrides<Defaults, Overrides> = Omit<Defaults, keyof Overrides> & Overrides

  type Config = MergeOverrides<DefaultConfig, AppsSDKUIOverrides>

  namespace AppsSDKUI {
    export type LinkComponent = Config["LinkComponent"]
    export type Breakpoint = Config["Breakpoint"]
  }
  interface Window {
    openai: API & OpenAiGlobals
  }

  interface WindowEventMap {
    [SET_GLOBALS_EVENT_TYPE]: SetGlobalsEvent
  }
}

export {}
