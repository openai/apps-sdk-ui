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
}

export {}
