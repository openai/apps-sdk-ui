import { type Meta } from "@storybook/react"
import { Robot } from "../Icon"
import { Avatar, AvatarGroup, type AvatarGroupProps } from "./"

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  args: {
    stack: "start",
    size: 42,
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
  },
} satisfies Meta<typeof AvatarGroup>

export default meta

export const Base = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar
      name="Tyler"
      imageUrl="https://gravatar.com/avatar/9531b260b9693f3394bea8646c6ea141ce58fe5a138b7db7729d60a4c5dde552"
    />
    <Avatar name="Jane" color="primary" variant="solid" />
    <Avatar name="Tech support" Icon={Robot} variant="solid" />
    <Avatar overflowCount={5} />
  </AvatarGroup>
)

Base.parameters = {
  docs: {
    source: {
      code: `
<AvatarGroup size={42}>
  <Avatar name="Tyler" imageUrl="https://gravatar.com/avatar/xyz" />
  <Avatar name="Jane" color="primary" variant="solid" />
  <Avatar name="Tech support" Icon={Robot} variant="solid" />
  <Avatar overflowCount={5} />
</AvatarGroup>
`,
    },
  },
}

export const Direction = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar
      name="Tyler"
      imageUrl="https://gravatar.com/avatar/9531b260b9693f3394bea8646c6ea141ce58fe5a138b7db7729d60a4c5dde552"
    />
    <Avatar name="Will" />
    <Avatar name="Tech support" Icon={Robot} variant="solid" />
    <Avatar overflowCount={5} variant="soft" />
  </AvatarGroup>
)

Direction.parameters = {
  controls: { include: ["stack"] },
}

Direction.args = {
  stack: "end",
  size: 42,
}

Direction.argTypes = {
  stack: { control: "select" },
}

export const Sizing = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar name="Tyler" color="info" />
    <Avatar name="Jane" color="discovery" />
    <Avatar name="Will" color="danger" />
    <Avatar overflowCount={5} />
  </AvatarGroup>
)

Sizing.args = {
  size: 48,
}

Sizing.parameters = {
  controls: { include: ["size"] },
}
