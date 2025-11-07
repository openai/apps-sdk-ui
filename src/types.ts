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
