// reference is needed instead of import so consumer projects can compile properly
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./global.d.ts" />

export type Size =
  | "5xs"
  | "4xs"
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
export type Sizes<T extends Size = Size> = T

export type ControlSize = Sizes<"3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl">

export type Radius = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
export type Radii<T extends Radius = Radius> = T

export type TextColor = "base" | "emphasis" | "secondary" | "tertiary"
export type TextColors<T extends TextColor = TextColor> = T

export type SemanticColor =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "caution"
  | "discovery"
  | "info"
export type SemanticColors<T extends SemanticColor = SemanticColor> = T

export type Variant = "solid" | "soft" | "outline" | "ghost"
export type Variants<T extends Variant = Variant> = T

export type Alignment = "start" | "center" | "end"
export type Alignments<T extends Alignment = Alignment> = T

export type FontWeight = "inherit" | "normal" | "medium" | "semibold" | "bold"
export type FontWeights<T extends FontWeight = FontWeight> = T

export type OpenAiGlobals<
  ToolInput = UnknownObject,
  ToolOutput = UnknownObject,
  ToolResponseMetadata = UnknownObject,
  WidgetState = UnknownObject,
> = {
  // visuals
  theme: Theme

  userAgent: UserAgent
  locale: string

  // layout
  maxHeight: number
  displayMode: DisplayMode
  safeArea: SafeArea

  // state
  toolInput: ToolInput
  toolOutput: ToolOutput | null
  toolResponseMetadata: ToolResponseMetadata | null
  widgetState: WidgetState | null
  setWidgetState: (state: WidgetState) => Promise<void>
}

export type API = {
  callTool: CallTool
  sendFollowUpMessage: (args: { prompt: string }) => Promise<void>
  openExternal(payload: { href: string }): void

  // Layout controls
  requestDisplayMode: RequestDisplayMode
  requestModal: (args: { title?: string; params?: UnknownObject }) => Promise<unknown>
  requestClose: () => Promise<void>
}

export type UnknownObject = Record<string, unknown>

export type Theme = "light" | "dark"

export type SafeAreaInsets = {
  top: number
  bottom: number
  left: number
  right: number
}

export type SafeArea = {
  insets: SafeAreaInsets
}

export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown"

export type UserAgent = {
  device: { type: DeviceType }
  capabilities: {
    hover: boolean
    touch: boolean
  }
}

/** Display mode */
export type DisplayMode = "pip" | "inline" | "fullscreen"
export type RequestDisplayMode = (args: { mode: DisplayMode }) => Promise<{
  /**
   * The granted display mode. The host may reject the request.
   * For mobile, PiP is always coerced to fullscreen.
   */
  mode: DisplayMode
}>

export type CallToolResponse = {
  result: string
}

/** Calling APIs */
export type CallTool = (name: string, args: Record<string, unknown>) => Promise<CallToolResponse>

/** Extra events */
export const SET_GLOBALS_EVENT_TYPE = "openai:set_globals"
export class SetGlobalsEvent extends CustomEvent<{
  globals: Partial<OpenAiGlobals>
}> {
  readonly type = SET_GLOBALS_EVENT_TYPE
}
