import { type Meta } from "@storybook/react"
import { CopyTooltip, type CopyTooltipProps, Tooltip } from "./"

const meta = {
  title: "Components/CopyTooltip",
  component: CopyTooltip,
  args: {
    copyValue: "Very cool content to copy",
  },
  argTypes: {
    copyValue: { control: false },
    openDelay: {
      control: {
        type: "range",
        min: 0,
        max: 1500,
        step: 50,
      },
    },
    sideOffset: {
      control: {
        type: "range",
        min: 0,
        max: 40,
        step: 1,
      },
    },
    alignOffset: {
      control: {
        type: "range",
        min: 0,
        max: 40,
        step: 1,
      },
    },
  },
} satisfies Meta<typeof CopyTooltip>

export default meta

export const Base = (args: CopyTooltipProps) => (
  <CopyTooltip {...args}>
    <Tooltip.TriggerDecorator>sess_12345abcdefg</Tooltip.TriggerDecorator>
  </CopyTooltip>
)
