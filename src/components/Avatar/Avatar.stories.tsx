import { type Meta } from "@storybook/react"
import { Fragment } from "react"
import { Robot } from "../Icon"
import { Avatar, type AvatarProps } from "./Avatar"

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  args: {
    name: "Jane",
    size: 48,
  },
  argTypes: {
    size: {
      control: {
        type: "range",
        min: 14,
        max: 80,
        step: 2,
      },
    },
    Icon: {
      options: ["none", "Robot"],
      mapping: {
        none: undefined,
        Robot,
      },
    },
    className: { control: false },
  },
} satisfies Meta<typeof Avatar>

export default meta

export const Base = (args: AvatarProps) => <Avatar {...args} />

export const Text = (args: AvatarProps) => <Avatar {...args} />

Text.args = {
  name: "David",
  imageUrl: undefined,
  size: 48,
  variant: undefined,
}

export const Image = (args: AvatarProps) => <Avatar {...args} />

Image.args = {
  name: "Tyler",
  imageUrl:
    "https://gravatar.com/avatar/9531b260b9693f3394bea8646c6ea141ce58fe5a138b7db7729d60a4c5dde552",
  size: 48,
  variant: undefined,
}

Image.argTypes = {
  Icon: { table: { disable: true } },
}

export const Icon = (args: AvatarProps) => <Avatar {...args} Icon={Robot} />

Icon.args = {
  name: "Assistant",
  imageUrl: undefined,
  size: 48,
}

Icon.argTypes = {
  imageUrl: { table: { disable: true } },
  Icon: { table: { disable: true } },
}

export const Sizing = (args: AvatarProps) => <Avatar {...args} />

Sizing.args = {
  name: "David",
  imageUrl: undefined,
  size: 48,
  variant: undefined,
}

Sizing.parameters = {
  controls: { include: ["size"] },
}

export const Rounding = (args: AvatarProps) => <Avatar {...args} className="rounded-lg" />

Rounding.args = {
  name: "Acme, co.",
  color: "primary",
  variant: "solid",
  imageUrl: undefined,
}

export const Overflow = (args: AvatarProps) => <Avatar {...args} />

Overflow.args = {
  name: undefined,
  imageUrl: undefined,
  overflowCount: 9,
}

export const Interactive = (args: AvatarProps) => {
  const saySup = () => alert("sup")

  return (
    <div className="flex items-center gap-4">
      <Avatar {...args} onClick={saySup} />
      <Avatar
        {...args}
        imageUrl="https://gravatar.com/avatar/9531b260b9693f3394bea8646c6ea141ce58fe5a138b7db7729d60a4c5dde552"
        onClick={saySup}
      />
      <Avatar {...args} name="Tech support" Icon={Robot} onClick={saySup} color="info" />
    </div>
  )
}

Interactive.args = {
  name: "Will",
  size: 48,
}

Interactive.argTypes = {
  name: { table: { disable: true } },
  imageUrl: { table: { disable: true } },
  Icon: { table: { disable: true } },
}

const COLORS = ["primary", "secondary", "success", "danger", "info", "discovery"] as const
const VARIANTS = ["soft", "solid"] as const

const RANDOM_LETTERS = Array.from({ length: COLORS.length }, () =>
  String.fromCharCode(97 + Math.floor(Math.random() * 26)),
)

export const Colors = (args: AvatarProps) => (
  <div className="pt-1 pb-6">
    <Matrix
      rowLabels={VARIANTS}
      columnLabels={COLORS}
      renderCell={(row, col) => (
        <Avatar
          {...args}
          name={RANDOM_LETTERS[col] ?? "A"}
          color={COLORS[col]}
          variant={VARIANTS[row]}
        />
      )}
    />
  </div>
)

Colors.parameters = { layout: "padded" }

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
