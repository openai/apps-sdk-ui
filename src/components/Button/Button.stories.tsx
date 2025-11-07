import { type Meta } from "@storybook/react"
import { Fragment, useState } from "react"
import { ArrowRight, ArrowUp, Mail, PlusLg } from "../Icon"
import { Popover } from "../Popover"
import { ShimmerText } from "../ShimmerText"
import { Button, type ButtonProps } from "./Button"

const meta = {
  title: "Components/Button",
  args: {
    children: "Submit",
  },
  component: Button,
} satisfies Meta<typeof Button>

export default meta

export const Base = (args: ButtonProps) => <Button {...args} />

Base.args = {
  variant: "solid",
  color: "primary",
  size: "md",
}

export const Sizing = (args: ButtonProps) => (
  <div className="flex flex-col gap-2 justify-start items-start">
    <Button {...args}>
      <Mail /> Button <ArrowRight />
    </Button>
    <Button {...args}>
      Button <ArrowRight />
    </Button>
    <Button {...args}>
      <Mail /> Button
    </Button>
    <Button {...args}>Button</Button>
  </div>
)

Sizing.args = {
  color: "primary",
  size: "xl",
  pill: true,
}

Sizing.parameters = {
  controls: { include: ["size", "pill"] },
}

Sizing.argTypes = {
  size: { control: "select" },
  gutterSize: { control: "select" },
}

export const Icon = (args: ButtonProps) => (
  <Button {...args}>
    <PlusLg />
  </Button>
)

Icon.args = {
  color: "secondary",
  size: "lg",
  uniform: true,
  variant: "ghost",
}

Icon.parameters = {
  controls: { include: ["size", "gutterSize", "iconSize", "uniform", "variant"] },
}

Icon.argTypes = {
  size: { control: "select" },
  gutterSize: { control: "select" },
  iconSize: { control: "select" }, //, options: [undefined, "sm", "md", "lg", "xl", "2xl"] },
  variant: { control: "select" },
}

export const Block = (args: ButtonProps) => (
  <div className="w-[290px] text-center p-2 border border-dashed border-alpha/20 rounded-md">
    <Button {...args} />
  </div>
)

Block.args = {
  children: "Continue",
  size: "lg",
  block: true,
}

Block.parameters = {
  controls: { include: ["block"] },
}

export const OpticalAlignment = (args: ButtonProps) => (
  <div className="flex flex-col gap-3">
    <div className="border border-dashed border-alpha/20 rounded-md py-4 px-6">
      <div className="mb-2 text-secondary text-sm">Default gutters</div>
      <Button {...{ ...args, opticallyAlign: undefined }}>{args.children}</Button>
    </div>
    <div className="border border-dashed border-alpha/20 rounded-md py-4 px-6">
      <div className="mb-2 text-secondary text-sm">opticallyAlign="start"</div>
      <Button {...args} />
    </div>
  </div>
)

OpticalAlignment.args = {
  children: "Ghost button",
  variant: "ghost",
  opticallyAlign: "start",
}

export const Disabled = (args: ButtonProps) => <Button {...args} />

Disabled.args = {
  disabled: true,
  onClick: () => alert("Not disabled"),
}

Disabled.parameters = {
  controls: { include: ["disabled"] },
}

export const Inert = (args: ButtonProps) => <Button {...args} />

Inert.args = {
  inert: true,
  onClick: () => alert("Not inert"),
}

Inert.parameters = {
  controls: { include: ["inert"] },
}

export const Selected = (args: ButtonProps) => (
  <Popover>
    <Popover.Trigger>
      <Button {...args} />
    </Popover.Trigger>
    <Popover.Content minWidth="auto" className="p-4 text-sm">
      <ShimmerText className="font-medium text-secondary">Button should look selected</ShimmerText>
    </Popover.Content>
  </Popover>
)

Selected.args = {
  children: "Click to open",
  selected: false,
  variant: "ghost",
}

Selected.parameters = {
  controls: { include: ["selected", "variant"] },
  docs: {
    source: {
      code: `<Button selected {...restProps} />`,
    },
  },
}

Selected.argTypes = {
  variant: { control: "select" },
}

export const Loading = (args: ButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Button
      {...args}
      loading={loading}
      onClick={() => {
        setLoading(!loading)
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }}
    >
      <ArrowUp /> Click to load
    </Button>
  )
}

Loading.args = {
  size: "xl",
  pill: true,
}

Loading.parameters = {
  docs: {
    source: {
      code: `<Button loading {...restProps} />`,
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

export const Colors = (args: ButtonProps) => (
  <div className="pt-1 pb-6 min-w-[820px]">
    <Matrix
      rowLabels={VARIANTS}
      columnLabels={COLORS}
      renderCell={(row, col) => (
        <Button {...args} size={args.size} color={COLORS[col]} variant={VARIANTS[row]} />
      )}
    />
  </div>
)

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
  renderCell: (rowIndex: number, colIndex: number) => React.ReactNode
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
