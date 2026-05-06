import { type Meta } from "@storybook/react"
import { useState } from "react"
import { Plus, User, UserLock, Workspace } from "../Icon"
import { type Option, Select, type SelectProps } from "./"

const meta = {
  title: "Components/Select",
  component: Select,
  args: {
    disabled: false,
    loading: false,
    pill: false,
    clearable: false,
    block: true,
    multiple: true,
  },
  argTypes: {
    listMinWidth: {
      control: {
        type: "range",
        min: 100,
        max: 400,
        step: 5,
      },
    },
    listWidth: {
      control: {
        type: "range",
        min: 100,
        max: 400,
        step: 5,
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
    value: { control: false },
    // Undesirable for the controllable examples
    multiple: { control: false },
    options: { control: false },
    onChange: { control: false },
    actions: { control: false },
    searchEmptyMessage: { control: false },
    onSearchTermChange: { control: false },
    searchPredicate: { control: false },
    triggerClassName: { control: false },
    TriggerView: { control: false },
    OptionView: { control: false },
    // No one should customize this
    avoidCollisions: { table: { disable: true } },
  },
} satisfies Meta<typeof Select>

export default meta

export const Base = (
  args: Omit<SelectProps<Option>, "multiple" | "value" | "onChange" | "TriggerView">,
) => {
  const [fruit, setFruit] = useState<string>("")

  return (
    <div style={{ width: 200 }}>
      <Select
        placeholder="Select a fruit..."
        {...args}
        multiple={false}
        value={fruit}
        options={fruitsOptions}
        name="fruits"
        onChange={(params) => {
          setFruit(params.value)
        }}
      />
    </div>
  )
}

Base.parameters = {
  docs: {
    source: {
      code: `
<Select
  value={fruit}
  options={fruits}
  onChange={handleChange}
  placeholder="Select a fruit..."
  variant="solid"
/>
  `,
    },
  },
}

export const Actions = () => {
  const [value, setValue] = useState<string>(() => "")

  return (
    <div style={{ width: 150 }}>
      <Select
        variant="soft"
        value={value}
        block
        options={items}
        placeholder="Select..."
        align="start"
        listMinWidth={240}
        onChange={(v) => setValue(v.value)}
        triggerClassName="font-semibold"
        actions={[
          {
            id: "create",
            label: "Create project",
            Icon: Plus,
            onSelect: () => {},
          },
          {
            id: "overview",
            label: "Organization overview",
            Icon: Workspace,
            onSelect: () => {},
          },
        ]}
      />
    </div>
  )
}

Actions.parameters = {
  docs: {
    source: {
      code: `
<Select
  value={value}
  onChange={handleChange}
  options={items}
  placeholder="Select..."
  align="start"
  listMinWidth={240}
  triggerClassName="font-semibold"
  actions={[
    {
      id: "create",
      label: "Create project",
      Icon: Plus,
      onSelect: () => {},
    },
    {
      id: "overview",
      label: "Organization overview",
      Icon: Workspace,
      onSelect: () => {},
    },
  ]}
/>`,
    },
  },
}

export const CustomViews = () => {
  const [role, setRole] = useState<string>("reader")

  return (
    <div style={{ width: 200 }}>
      <Select
        value={role}
        options={roles}
        placeholder="Select role..."
        align="start"
        listMinWidth={260}
        variant="ghost"
        size="lg"
        onChange={({ value }) => setRole(value)}
        TriggerStartIcon={role === "owner" ? UserLock : User}
        triggerClassName="font-semibold"
        optionClassName="font-semibold"
      />
    </div>
  )
}

CustomViews.parameters = {
  docs: {
    source: {
      code: `
const RoleOptionDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal text-secondary py-px text-[0.935em] leading-[1.45]">
    {children}
  </div>
);

const roles: Role[] = [
  {
    value: "owner",
    label: "Owner",
    description: (
      <RoleOptionDescription>
        Can modify project information and manage project members
      </RoleOptionDescription>
    ),
  },
  {
    value: "reader",
    label: "Reader",
    description: (
      <RoleOptionDescription>
        Can make API requests that read or modify data
      </RoleOptionDescription>
    ),
  },
];

const CustomSelect = () => (
  <Select
    value={role}
    options={roles}
    placeholder="Select role..."
    align="start"
    listMinWidth={260}
    variant="ghost"
    size="lg"
    onChange={({ value }) => setRole(value)}
    TriggerStartIcon={role === "owner" ? UserLock : User}
    triggerClassName="font-semibold"
    optionClassName="font-semibold"
  />
)
`,
    },
  },
}

export const GroupedOptions = () => {
  const [valueFour, setValueFour] = useState<string>(() => items[0].value)
  return (
    <div style={{ width: 200 }}>
      <Select
        variant="outline"
        value={valueFour}
        side="bottom"
        size="lg"
        options={groupedItems}
        listMinWidth={300}
        searchPlaceholder="Select a model..."
        clearable
        onChange={(v) => {
          const val = v.value
          if (!val) {
            setValueFour(val)
          } else {
            setValueFour(val)
          }
        }}
      />
    </div>
  )
}

GroupedOptions.parameters = {
  docs: {
    source: {
      code: `
const groupedItems = [
  {
    label: "Models",
    options: [
      ...
    ],
    // Custom limits
    optionsLimit: {
      limit: 7,
      label: "Show all models",
    },
  },
  {
    label: "Fine-tunes",
    options: [
      ...
    ],
    // Default
    optionsLimit: {
      limit: 100,
      label: "Show all",
    },
  },
];

const GroupedOptions = () => {
  const [value, setValue] = useState<string>("");

  return (
    <Select
      value={value}
      options={groupedItems}
      onChange={(v) => setValue(v.value)}
      variant="outline"
      size="lg"
      side="bottom"
      listMinWidth={300}
      searchPlaceholder="Select a model..."
      clearable
    />
  );
};`,
    },
  },
}

const MultiFruitTriggerView = ({
  values,
  selectedAll,
}: {
  values: { label: string }[]
  selectedAll: boolean
}) => {
  const displayValue = selectedAll
    ? "All fruits"
    : values.length === 1
      ? values[0].label
      : `${values.length} fruits`

  return <>{displayValue}</>
}

export const MultiSelect = () => {
  const [fruits, setFruits] = useState<string[]>([])

  return (
    <div style={{ width: 200 }}>
      <Select
        variant="soft"
        placeholder="Select fruits..."
        options={fruitsOptions}
        name="fruits"
        multiple
        clearable
        value={fruits}
        onChange={(values) => {
          setFruits(values.map(({ value }) => value))
        }}
        TriggerView={MultiFruitTriggerView}
      />
    </div>
  )
}

MultiSelect.parameters = {
  docs: {
    source: {
      code: `
const MultiFruitTriggerView = ({
  values,
  selectedAll,
}: {
  values: { label: string }[];
  selectedAll: boolean;
}) => {
  const displayValue = selectedAll
    ? "All fruits"
    : values.length === 1
    ? values[0].label
    : \`\${values.length} fruits\`;

  return <>{displayValue}</>;
};

const MultiFruitSelect = () => {
  const [fruits, setFruits] = useState<string[]>([]);

  return (
    <Select
      variant="solid"
      placeholder="Select fruits..."
      options={fruitsOptions}
      name="fruits"
      multiple
      clearable
      value={fruits}
      onChange={(values) => {
          setFruits(values.map(({ value }) => value));
      }}
      TriggerView={MultiFruitTriggerView}
    />
  );
};`,
    },
  },
}

const fruitsOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Watermelon", value: "watermelon" },
]

const items = [
  { label: "List item 1", value: "1" },
  { label: "List item 2", value: "2" },
  { label: "List item 3", value: "3", disabled: true },
  { label: "List item 4", value: "4" },
  { label: "List item 5", value: "5" },
  { label: "List item 6", value: "6" },
  { label: "List item 7", value: "7" },
  { label: "List item 8", value: "8" },
]

const groupedItems = [
  {
    label: "Models",
    options: [
      {
        label: "gpt-4o",
        value: "1",
        tooltip: {
          content: "Our high-intelligence flagship model for complex, multi‑step tasks",
          maxWidth: 248,
        },
      },
      {
        label: "gpt-4o-mini",
        value: "1o",
        tooltip: {
          content: "Our affordable and intelligent small model for fast, lightweight tasks",
          maxWidth: 248,
        },
      },
      { label: "gpt-4-turbo", value: "2" },
      { label: "gpt-4-32k", value: "3" },
      { label: "gpt-4", value: "4" },
      { label: "gpt-3.5-turbo-16k", value: "5" },
      { label: "gpt-3.5-turbo-0125", value: "6" },
      { label: "gpt-3.5-turbo", value: "7" },
      // More
      { label: "gpt-4a", value: "4a" },
      { label: "gpt-4b", value: "4b" },
      { label: "gpt-4c", value: "4c" },
      { label: "gpt-4d", value: "4d" },
      { label: "gpt-4e", value: "4e" },
      { label: "gpt-4f", value: "4f" },
      { label: "gpt-4g", value: "4g" },
      { label: "gpt-4h", value: "4h" },
      { label: "gpt-4-omega", value: "4omega" },
      { label: "gpt-4-ultra", value: "4ultra" },
    ],
    optionsLimit: {
      limit: 7,
      label: "Show all models",
    },
  },
  {
    label: "Fine-tunes",
    options: [
      { label: "ft:gpt-3.5-turbo-0125-alpha:openai::8nu8CTNj", value: "ft1" },
      { label: "ft:gpt-3.5-turbo-0125-alpha:openai::8oz5FXdb", value: "ft2" },
      { label: "ft:gpt-3.5-turbo-0125-alpha:openai::8ozVmSUp", value: "ft3" },
      { label: "ft:gpt-3.5-turbo-0125-alpha:openai::8pMlpiKm", value: "ft4" },
      { label: "ft:gpt-3.5-turbo-0125:openai", value: "ft5" },
    ],
    // Implied default
    optionsLimit: {
      limit: 100,
      label: "Show all",
    },
  },
]

const RoleOptionDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal text-secondary py-px text-[0.935em] leading-[1.45]">{children}</div>
)

type Role = {
  value: string
  label: string
  description: React.ReactNode
}

const roles: Role[] = [
  {
    value: "owner",
    label: "Owner",
    description: (
      <RoleOptionDescription>
        Can modify project information and manage project members
      </RoleOptionDescription>
    ),
  },
  {
    value: "reader",
    label: "Reader",
    description: (
      <RoleOptionDescription>Can make API requests that read or modify data</RoleOptionDescription>
    ),
  },
]
