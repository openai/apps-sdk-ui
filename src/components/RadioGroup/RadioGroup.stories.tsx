import type { Meta } from "@storybook/react"
import { useState } from "react"
import { TextLink } from "../TextLink"
import { Tooltip } from "../Tooltip"
import { RadioGroup, type RadioGroupItemProps, type RadioGroupProps } from "./"

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  args: {
    disabled: false,
  },
  argTypes: {
    defaultValue: { control: false },
    value: { control: false },
    onChange: { control: false },
    ["aria-label"]: { control: false },
  },
} satisfies Meta<typeof RadioGroup>

export default meta

export const Base = () => {
  const [frequency, setFrequency] = useState("daily")

  return (
    <div>
      <h3 className="font-semibold text-sm mb-3">Notification frequency</h3>
      <RadioGroup
        direction="col"
        value={frequency}
        onChange={setFrequency}
        aria-label="Notification frequency"
      >
        <RadioGroup.Item value="daily">Daily</RadioGroup.Item>
        <RadioGroup.Item value="weekly">Weekly</RadioGroup.Item>
        <RadioGroup.Item value="monthly">Monthly</RadioGroup.Item>
        <RadioGroup.Item value="never">Never</RadioGroup.Item>
      </RadioGroup>
    </div>
  )
}

export const Direction = (args: RadioGroupProps<string>) => (
  <RadioGroup {...args} aria-label="Sample options">
    <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
    <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
    <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
  </RadioGroup>
)

Direction.args = {
  direction: "col",
}

Direction.argTypes = {
  direction: { control: "select" },
}

Direction.parameters = {
  controls: { include: ["direction"] },
}

export const GroupDisabled = (args: RadioGroupProps<string>) => (
  <RadioGroup {...args}>
    <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
    <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
    <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
  </RadioGroup>
)

GroupDisabled.args = {
  "disabled": true,
  "defaultValue": "option1",
  "aria-label": "Sample options",
}

GroupDisabled.parameters = {
  controls: { include: ["disabled"] },
  docs: {
    source: {
      code: `<RadioGroup disabled>
  ...
</RadioGroup>`,
    },
  },
}

export const ItemDisabled = (args: RadioGroupItemProps<string>) => (
  <RadioGroup aria-label="Sample options" className="max-w-[320px] m-auto" direction="col">
    <RadioGroup.Item {...args} value="option1">
      Option 1
    </RadioGroup.Item>
    <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
    <RadioGroup.Item value="option3">
      This is long content that will wrap multiple lines to demonstrate how line-height affects
      rendering of the radio group
    </RadioGroup.Item>
  </RadioGroup>
)

ItemDisabled.args = {
  "disabled": true,
  "defaultValue": "option1",
  "aria-label": "Sample options",
}

ItemDisabled.parameters = {
  controls: { include: ["disabled"] },
  docs: {
    source: {
      code: `<RadioGroup>
  <RadioGroup.Item disabled>
  ...
</RadioGroup>`,
    },
  },
}

export const CustomLayout = () => (
  <RadioGroup className="flex-col w-[390px] gap-4" onChange={() => {}} aria-label="Sample options">
    <RadioGroup.Item className="gap-2.5" value="basic">
      <div>
        <h4 className="font-semibold mb-1">Basic Plan</h4>
        <p className="text-secondary text-sm">5 GB storage • Email support • Free</p>
      </div>
    </RadioGroup.Item>
    <hr className="border-default" />
    <RadioGroup.Item className="gap-2.5" value="standard">
      <div>
        <h4 className="font-semibold mb-1">Standard Plan</h4>
        <p className="text-secondary text-sm">100 GB storage • Priority email support • $9.99/m</p>
      </div>
    </RadioGroup.Item>
    <hr className="border-default" />
    <Tooltip
      maxWidth={258}
      content={
        <>
          Contact our <TextLink href="#">support team</TextLink> for more information on enterprise
          plans.
        </>
      }
      interactive
    >
      <Tooltip.Trigger>
        <RadioGroup.Item className="gap-2.5" value="enterprise" disabled>
          <div>
            <h4 className="font-semibold mb-1">Enterprise Plan</h4>
            <p className="text-secondary text-sm">
              Unlimited storage • 24/7 phone support • Custom pricing
            </p>
          </div>
        </RadioGroup.Item>
      </Tooltip.Trigger>
    </Tooltip>
  </RadioGroup>
)
