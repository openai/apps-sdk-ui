import type { Meta } from "@storybook/react"
import { useState } from "react"
import { Link, Tag, WriteAlt } from "./components/Icon"
import { type Option, Select } from "./components/Select"

const meta: Meta = {
  title: "Foundations/Typography",
  component: () => null,
}
export default meta

export const Sizes = () => (
  <>
    <h5 className="text-secondary mb-1">Get started</h5>
    <h2 className="heading-xl mb-3">Building your first app</h2>
    <p className="text-md">
      Inline cards in Apps SDK UI keep copy short and actionable. Provide just enough context for
      the task, then pair it with a clear next step.
    </p>
  </>
)

export const Weights = () => (
  <>
    <p className="font-normal">font-normal</p>
    <p className="font-medium">font-medium</p>
    <p className="font-semibold">font-semibold</p>
    <p className="font-bold">font-bold</p>
  </>
)

export const Colors = () => (
  <>
    <p className="text-default">text-default</p>
    <p className="text-secondary">text-secondary</p>
    <p className="text-tertiary">text-tertiary</p>
  </>
)

const FONT_SIZES = [
  { label: "text-3xs", value: "3xs" },
  { label: "text-2xs", value: "2xs" },
  { label: "text-xs", value: "xs" },
  { label: "text-sm", value: "sm" },
  { label: "text-md", value: "md" },
  { label: "text-lg", value: "lg" },
]

const ICON_SIZE: Record<string, number> = {
  "lg": 24,
  "md": 18,
  "sm": 18,
  "xs": 16,
  "2xs": 14,
  "3xs": 12,
} as const

export const LineHeight = () => {
  const [size, setSize] = useState<string>("md")
  const iconSize = ICON_SIZE[size] ?? 20

  return (
    <div style={{ maxWidth: 560 }}>
      <div className="mb-6 max-w-[120px]">
        <Select
          block
          value={size}
          options={FONT_SIZES}
          onChange={(v: Option) => setSize(v.value)}
          placeholder="Font size"
        />
      </div>
      <div
        style={{
          fontSize: `var(--font-text-${size}-size)`,
          lineHeight: `var(--font-text-${size}-line-height)`,
          letterSpacing: `var(--font-text-${size}-tracking)`,
        }}
      >
        <div className="mb-8">
          <div>
            <p className="text-secondary mb-2">Prose</p>
            <p>
              Typography is the silent art that shapes how we experience written language. Beyond
              mere letters, it orchestrates rhythm, hierarchy, and emotion—guiding the reader’s eye
              and setting the tone before a single word is read. The beauty of typography lies in
              its subtlety: the careful balance of space and form, the harmony between font size and
              line height, and the way thoughtfully chosen type can make content feel effortless,
              inviting, and human. When typography is done well, it disappears, letting the message
              shine—yet its influence is always felt, elevating both clarity and aesthetic pleasure.
            </p>
          </div>
        </div>
        <p className="text-secondary mb-3">Icon &amp; text</p>
        <p className="flex items-center gap-2 mb-1.5">
          <WriteAlt width={iconSize} height={iconSize} />
          Writing style
        </p>
        <p className="flex items-center gap-2 mb-1.5">
          <Link width={iconSize} height={iconSize} />
          Hyperlink
        </p>
        <p className="flex items-center gap-2">
          <Tag width={iconSize} height={iconSize} />
          Label
        </p>
      </div>
    </div>
  )
}

LineHeight.parameters = {
  layout: "padded",
}
