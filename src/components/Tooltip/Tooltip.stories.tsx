import { type Meta } from "@storybook/react"
import { Button } from "../Button"
import { Tooltip, type TooltipProps } from "../Tooltip"

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  args: {
    content: "This is additional context that appears when the trigger is hovered or focused",
    compact: false,
    interactive: false,
  },
  argTypes: {
    content: { control: "text" },
    maxWidth: {
      control: {
        type: "range",
        min: 100,
        max: 400,
        step: 5,
      },
    },
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
} satisfies Meta<typeof Tooltip>

export default meta

export const Base = (args: TooltipProps) => (
  <Tooltip {...args}>
    <Tooltip.TriggerDecorator>Simple text with tooltip</Tooltip.TriggerDecorator>
  </Tooltip>
)

export const Triggers = (args: TooltipProps) => (
  <div className="flex items-center gap-4">
    <Tooltip {...args}>
      <Button color="primary" size="lg">
        Sample button
      </Button>
    </Tooltip>
    <Tooltip {...args}>
      <span>Inaccessible trigger</span>
    </Tooltip>
  </div>
)

export const Conditional = ({ disabled }: { disabled: boolean }) => (
  <Tooltip content={disabled ? "This action is disabled for reasons" : null}>
    <Button color="primary" size="lg" disabled={disabled}>
      Sample button
    </Button>
  </Tooltip>
)

Conditional.args = {
  disabled: true,
}

Conditional.argTypes = {
  disabled: { control: "boolean" },
  // Disable everything else
  content: { table: { disable: true } },
  compact: { table: { disable: true } },
  interactive: { table: { disable: true } },
  maxWidth: { table: { disable: true } },
  forceOpen: { table: { disable: true } },
  openDelay: { table: { disable: true } },
  align: { table: { disable: true } },
  alignOffset: { table: { disable: true } },
  side: { table: { disable: true } },
  sideOffset: { table: { disable: true } },
  gutterSize: { table: { disable: true } },
  preventUnintentionalClickToClose: { table: { disable: true } },
  ref: { table: { disable: true } },
  contentClassName: { table: { disable: true } },
}
