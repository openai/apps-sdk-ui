import { type Meta } from "@storybook/react"
import type { ComponentProps, ReactNode } from "react"
import { Fragment } from "react"
import { ArrowRight, ArrowUpRight, Globe, Key } from "../Icon"
import { ButtonLink } from "./"

type ButtonLinkProps = ComponentProps<typeof ButtonLink>

const meta = {
  title: "Components/ButtonLink",
  component: ButtonLink,
  args: {
    children: "View API Keys",
    color: "primary",
    size: "md",
    href: "https://platform.openai.com",
    block: false,
    disabled: false,
    pill: false,
  },
} satisfies Meta<typeof ButtonLink>

export default meta

export const Base = (args: ButtonLinkProps) => (
  <ButtonLink as="a" {...args}>
    {args.children} <ArrowRight />
  </ButtonLink>
)

Base.parameters = {
  docs: {
    source: {
      code: `<ButtonLink
  color="primary"
  href="https://platform.openai.com"
>
  View API Keys
  <ArrowRight />
</ButtonLink>  
    `,
    },
  },
}

export const Internal = () => (
  <ButtonLink href="/some-path" color="primary">
    Internal link <ArrowRight />
  </ButtonLink>
)

export const External = () => (
  <ButtonLink href="https://openai.com" color="primary">
    External link <ArrowUpRight />
  </ButtonLink>
)

export const Sizing = (args: ButtonLinkProps) => (
  <div className="flex flex-col gap-2 justify-start items-start">
    <ButtonLink {...args}>
      View account <ArrowRight />
    </ButtonLink>
    <ButtonLink {...args}>View account</ButtonLink>
  </div>
)

Sizing.args = {
  color: "primary",
  size: "lg",
  pill: false,
}

Sizing.parameters = {
  controls: { include: ["size", "pill"] },
}

export const Icon = (args: ButtonLinkProps) => (
  <ButtonLink {...args}>
    <Globe /> View website
  </ButtonLink>
)

Icon.args = {
  color: "info",
  size: "lg",
  uniform: false,
  variant: "soft",
}

Icon.parameters = {
  controls: { include: ["size", "iconSize"] },
}

Icon.argTypes = {
  size: { control: "select" },
  iconSize: { control: "select" },
}

export const Block = (args: ButtonLinkProps) => (
  <div className="w-[290px] text-center p-2 border border-dashed border-alpha/20 rounded-md">
    <ButtonLink as="a" {...args} />
  </div>
)

Block.args = {
  children: "Continue to dashboard",
  size: "lg",
  block: true,
}

Block.parameters = {
  controls: { include: ["block"] },
}

export const Disabled = (args: ButtonLinkProps) => (
  <ButtonLink {...args}>
    <Key /> View API Keys
  </ButtonLink>
)

Disabled.args = {
  disabled: true,
  onClick: () => alert("Not disabled"),
}

Disabled.parameters = {
  controls: { include: ["disabled"] },
  docs: {
    source: {
      code: `<ButtonLink
  href="https://platform.openai.com"
  color="primary"
  disabled
  onClick={alertMsg}
>
  <Key />
  View API Keys
</ButtonLink>`,
    },
  },
}

const VARIANTS = ["soft", "solid", "outline", "ghost"] as const
const COLORS = [
  "primary",
  "secondary",
  "danger",
  "info",
  "discovery",
  "success",
  "caution",
  "warning",
] as const

export const Colors = (args: ButtonLinkProps) => (
  <div className="pt-1 pb-6 min-w-[820px]">
    <Matrix
      rowLabels={VARIANTS}
      columnLabels={COLORS}
      renderCell={(row, col) => (
        <ButtonLink as="a" {...args} size={args.size} color={COLORS[col]} variant={VARIANTS[row]} />
      )}
    />
  </div>
)

Colors.args = {
  children: "Button",
  size: "lg",
}

Colors.parameters = {
  layout: "padded",
}

const Matrix = ({
  rowLabels,
  columnLabels,
  renderCell,
}: {
  rowLabels: Readonly<string[]>
  columnLabels: Readonly<string[]>
  renderCell: (rowIndex: number, colIndex: number) => ReactNode
}) => {
  const template = `auto repeat(${columnLabels.length}, min-content)`

  return (
    <div
      className="grid gap-6 items-center justify-center"
      style={{ gridTemplateColumns: template }}
    >
      {/* top‐left corner spacer */}
      <div />
      {columnLabels.map((col, i) => (
        <div key={i} className="text-center text-tertiary text-sm mb-1">
          {col}
        </div>
      ))}

      {rowLabels.map((row, ri) => (
        <Fragment key={ri}>
          <div className="text-right text-tertiary text-sm mr-3 -ml-3">{row}</div>
          {columnLabels.map((_, ci) => (
            <div key={ci} className="text-center">
              {renderCell(ri, ci)}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  )
}
