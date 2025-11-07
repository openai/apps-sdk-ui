import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Cabinet, CalendarAlt, Tools, User } from "../Icon"
import { Menu } from "../Menu"
import { SelectControl, type SelectControlProps } from "./"

const meta = {
  title: "Components/SelectControl",
  component: SelectControl,
  argTypes: {
    opticallyAlign: {
      control: { type: "inline-radio" },
      options: ["start", "end"],
    },
  },
} satisfies Meta<typeof SelectControl>

export default meta

export const Base = (args: SelectControlProps) => {
  const [value, setValue] = useState("")
  const placeholder = "Select date..."

  return (
    // Use any floating UI, like <Menu>, <Popover>, etc.
    <Menu>
      <Menu.Trigger>
        <SelectControl
          {...args}
          className="w-[200px]"
          selected={!!value}
          onClearClick={() => setValue("")}
          StartIcon={CalendarAlt}
        >
          {value || placeholder}
        </SelectControl>
      </Menu.Trigger>
      <Menu.Content minWidth={200} width={200}>
        <Menu.RadioGroup value={value} onChange={setValue}>
          <Menu.RadioItem value="Today">Today</Menu.RadioItem>
          <Menu.RadioItem value="Last week">Last week</Menu.RadioItem>
          <Menu.RadioItem value="Last month">Last month</Menu.RadioItem>
          <Menu.RadioItem value="Last 3 months">Last 3 months</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu>
  )
}

Base.args = {
  variant: "outline",
  pill: true,
  size: "md",
}

Base.parameters = {
  docs: {
    source: {
      code: `
const [value, setValue] = useState("")
const placeholder = "Select date..."

return (
  // Use any floating UI, like <Menu>, <Popover>, etc.
  <Menu>
    <Menu.Trigger>
      <SelectControl
        selected={!!value}
        onClearClick={() => setValue("")}
        StartIcon={CalendarAlt}
      >
        {value || placeholder}
      </SelectControl>
    </Menu.Trigger>
    <Menu.Content>
      <Menu.RadioGroup value={value} onChange={setValue}>
        ...
      </Menu.RadioGroup>
    </Menu.Content>
  </Menu>
)
`,
    },
  },
}

const VARIANT_OPTIONS = ["soft", "outline", "ghost"] as const

export const Variants = (args: SelectControlProps) => (
  <div className="pt-1 pb-6 w-full max-w-[500px] mx-auto">
    <RowMatrix
      rowLabels={VARIANT_OPTIONS}
      renderRow={(row) => (
        <SelectControl
          {...args}
          className="w-[200px]"
          variant={VARIANT_OPTIONS[row]}
          selected
          StartIcon={Cabinet}
          onClearClick={() => {}}
        >
          Sample value
        </SelectControl>
      )}
    />
  </div>
)

Variants.args = {
  invalid: false,
  disabled: false,
  onInteract: () => {},
}

Variants.parameters = {
  controls: { include: ["invalid", "disabled"] },
}

export const Sizing = (args: SelectControlProps) => (
  <div className="flex flex-col gap-2 justify-start items-start">
    <SelectControl {...args} dropdownIconType="none">
      Select...
    </SelectControl>
    <SelectControl {...args} loading>
      Select...
    </SelectControl>
    <SelectControl {...args}>Select...</SelectControl>
    <SelectControl {...args} StartIcon={Tools} dropdownIconType="none">
      Tool calls
    </SelectControl>
    <SelectControl
      {...args}
      onClearClick={() => {}}
      selected
      StartIcon={Tools}
      dropdownIconType="none"
    >
      With tool calls
    </SelectControl>
    <SelectControl
      {...args}
      onClearClick={() => {}}
      selected
      StartIcon={CalendarAlt}
      dropdownIconType="chevronDown"
    >
      Today
    </SelectControl>
    <SelectControl {...args} onClearClick={() => {}} selected StartIcon={CalendarAlt}>
      Today
    </SelectControl>
  </div>
)

Sizing.args = {
  color: "primary",
  size: "md",
  pill: false,
  onInteract: () => {},
}

Sizing.parameters = {
  controls: { include: ["size", "pill", "variant"] },
}

Sizing.argTypes = {
  size: { control: "select" },
  variant: { control: "select" },
}

export const Block = (args: SelectControlProps) => (
  <div className="w-[290px] text-center p-2 border border-dashed border-alpha/20 rounded-md">
    <SelectControl {...args}>Select...</SelectControl>
  </div>
)

Block.args = {
  size: "lg",
  block: true,
}

Block.parameters = {
  controls: { include: ["block"] },
}

export const OpticalAlignment = (args: SelectControlProps) => (
  <div className="flex flex-col gap-3 w-[280px]">
    <div className="border border-dashed border-alpha/20 rounded-md py-4 px-6">
      <div className="mb-2 text-secondary text-sm">Default</div>
      <SelectControl {...{ ...args, opticallyAlign: undefined }}>Ghost control</SelectControl>
    </div>
    <div className="border border-dashed border-alpha/20 rounded-md py-4 px-6">
      <div className="mb-2 text-secondary text-sm">opticallyAlign="start"</div>
      <SelectControl {...args}>Ghost control</SelectControl>
    </div>
  </div>
)

OpticalAlignment.args = {
  selected: true,
  variant: "ghost",
  opticallyAlign: "start",
}

OpticalAlignment.parameters = {
  controls: { include: ["opticallyAlign"] },
}

export const StartIcon = (args: SelectControlProps) => (
  <SelectControl {...args} StartIcon={CalendarAlt}>
    Select date...
  </SelectControl>
)

StartIcon.parameters = {
  docs: {
    source: {
      code: `
<SelectControl StartIcon={CalendarAlt}>
  Reader
</SelectControl>  
  `,
    },
  },
}

export const Disabled = (args: SelectControlProps) => (
  <SelectControl {...args} StartIcon={User}>
    Reader
  </SelectControl>
)

Disabled.args = {
  disabled: true,
  selected: true,
  onInteract: () => alert("Not disabled"),
}

Disabled.parameters = {
  controls: { include: ["disabled"] },
  docs: {
    source: {
      code: `
<SelectControl disabled>
  Reader
</SelectControl>  
  `,
    },
  },
}

export const Selected = (args: SelectControlProps) => (
  <SelectControl {...args}>Select...</SelectControl>
)

Selected.args = {
  selected: false,
}

Selected.parameters = {
  controls: { include: ["selected"] },
}

export const Loading = (args: SelectControlProps) => (
  <SelectControl {...args}>Loading models...</SelectControl>
)

Loading.args = {
  loading: true,
}

Loading.parameters = {
  controls: { include: ["loading"] },
}

export const Invalid = (args: SelectControlProps) => (
  <SelectControl {...args} selected>
    Pineapple on pizza
  </SelectControl>
)

Invalid.args = {
  invalid: true,
}

Invalid.parameters = {
  controls: { include: ["invalid"] },
  docs: {
    source: {
      code: `
<SelectControl invalid>
  Pineapple on pizza
</SelectControl>  
  `,
    },
  },
}

export const DropdownIcon = (args: SelectControlProps) => (
  <SelectControl {...args}>Select...</SelectControl>
)

DropdownIcon.args = {
  dropdownIconType: "dropdown",
}

DropdownIcon.argTypes = {
  dropdownIconType: { control: "select" },
}

DropdownIcon.parameters = {
  controls: { include: ["dropdownIconType"] },
}

export const Clearable = (args: SelectControlProps) => {
  const [value, setValue] = useState("Sample value")
  const placeholder = "Select..."

  return (
    <SelectControl
      {...args}
      selected={!!value}
      onInteract={() => setValue("Sample value")}
      onClearClick={() => setValue("")}
    >
      {value || placeholder}
    </SelectControl>
  )
}

const RowMatrix = ({
  rowLabels,
  renderRow,
}: {
  rowLabels: Readonly<string[]>
  renderRow: (rowIndex: number) => React.ReactNode
}) => (
  <div className="flex flex-col gap-6">
    {rowLabels.map((row, ri) => (
      <div key={ri} className="flex items-center">
        <div className="text-right text-tertiary text-sm mr-8 -ml-3 min-w-[4rem]">{row}</div>
        <div className="flex-1">{renderRow(ri)}</div>
      </div>
    ))}
  </div>
)
