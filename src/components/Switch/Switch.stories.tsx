import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Switch, type SwitchProps } from "./"

const meta: Meta<SwitchProps> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    label: { control: "text" },
    onCheckedChange: { control: false },
    className: { control: false },
    id: { control: false },
    name: { control: false },
    value: { control: false },
    onBlur: { control: false },
    onFocus: { control: false },
  },
} satisfies Meta<typeof Switch>

export default meta

export const Base = (args: SwitchProps) => <Switch {...args} />

export const WithLabel = (args: SwitchProps) => <Switch {...args} />
WithLabel.args = {
  label: "Notifications",
}

export const LabelPositionStart = (args: SwitchProps) => <Switch {...args} />
LabelPositionStart.args = {
  label: "Right aligned",
  labelPosition: "start",
}

export const Disabled = (args: SwitchProps) => (
  <div className="flex gap-6">
    <Switch {...args} />
    <Switch {...args} checked />
  </div>
)
Disabled.args = {
  disabled: true,
}

export const DefaultChecked = (args: SwitchProps) => <Switch {...args} />
DefaultChecked.args = {
  name: "field-set-as-default",
  defaultChecked: true,
}

export const Controlled = () => {
  const [checked, setChecked] = useState(false)
  return <Switch checked={checked} onCheckedChange={setChecked} />
}

Controlled.parameters = {
  docs: {
    source: {
      code: `const [checked, setChecked] = useState(false)

<Switch checked={checked} onCheckedChange={setChecked} />`,
    },
  },
}
