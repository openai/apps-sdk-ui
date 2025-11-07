import { useState } from "react"
import { Button } from "../Button"
import {
  ChevronDown,
  Code,
  Functions,
  Globe,
  History,
  ImageSquare,
  Search,
  Tools,
  Trash,
} from "../Icon"
import { Menu } from "../Menu"
import type { MenuCheckboxItemProps, MenuRadioGroupProps } from "./Menu"

export default {
  title: "Components/Menu",
}

export const Base = () => (
  <Menu>
    <Menu.Trigger>
      <Button color="primary" size="lg" variant="ghost">
        Sample menu <ChevronDown />
      </Button>
    </Menu.Trigger>
    <Menu.Content width={210} minWidth={210}>
      <Menu.Item>
        <p className="font-semibold">Sam Smith</p>
        <p className="text-secondary">sam.smith@gmail.com</p>
      </Menu.Item>
      <Menu.Separator />
      <Menu.Link href="/settings">Your profile</Menu.Link>
      <Menu.Link href="https://openai.com/policies/">Terms & policies</Menu.Link>
      <Menu.Item disabled onSelect={() => {}}>
        Feature flags
      </Menu.Item>
      <Menu.Separator />
      <Menu.Item onSelect={() => {}}>Logout</Menu.Item>
    </Menu.Content>
  </Menu>
)

export const NaturalSizing = () => (
  <Menu>
    <Menu.Trigger>
      <Button color="primary" size="lg" variant="ghost" className="font-semibold gap-1.5">
        <Tools /> Tools
      </Button>
    </Menu.Trigger>
    <Menu.Content minWidth="auto">
      <Menu.Item onSelect={() => {}}>
        <Functions height={18} width={18} /> Function
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <Search height={18} width={18} /> File Search
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <Globe height={18} width={18} /> Web Search
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <Code height={18} width={18} /> Code Interpreter
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <ImageSquare height={18} width={18} /> Image Generation
      </Menu.Item>
    </Menu.Content>
  </Menu>
)

NaturalSizing.parameters = {
  docs: {
    source: {
      code: `<Menu.Content minWidth="auto">
  <Menu.Item onSelect={handleSelect}>
    <Functions height={16} width={16} /> Function
  </Menu.Item>
  ...
</Menu.Content>`,
    },
  },
}

export const ItemActions = () => (
  <Menu>
    <Menu.Trigger>
      <Button color="primary" size="lg" variant="ghost" className="font-semibold gap-1.5">
        <History /> Conversations
      </Button>
    </Menu.Trigger>
    <Menu.Content width={270}>
      <Menu.Item onSelect={() => {}}>
        <span className="flex-1 truncate">Sample thread title</span>
        <Menu.ItemActions>
          <Menu.ItemAction onClick={() => {}}>
            <Trash />
          </Menu.ItemAction>
        </Menu.ItemActions>
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <span className="flex-1 truncate">Another sample thread title</span>
        <Menu.ItemActions>
          <Menu.ItemAction onClick={() => {}}>
            <Trash />
          </Menu.ItemAction>
        </Menu.ItemActions>
      </Menu.Item>
      <Menu.Item onSelect={() => {}}>
        <span className="flex-1 truncate">Long thread title that is going to be clipped off</span>
        <Menu.ItemActions>
          <Menu.ItemAction onClick={() => {}}>
            <Trash />
          </Menu.ItemAction>
        </Menu.ItemActions>
      </Menu.Item>
    </Menu.Content>
  </Menu>
)

ItemActions.parameters = {
  docs: {
    source: {
      code: `<Menu.Content>
  <Menu.Item onSelect={handleSelect}>
    <span className="flex-1 truncate">Sample thread title</span>
    <Menu.ItemActions>
      <Menu.ItemAction>
        <Edit />
      </Menu.ItemAction>
      <Menu.ItemAction>
        <Delete />
      </Menu.ItemAction>
    </Menu.ItemActions>
  </Menu.Item>
  ...
</Menu.Content>`,
    },
  },
}

export const WithSubmenu = () => (
  <Menu>
    <Menu.Trigger>
      <Button color="primary" size="lg" variant="ghost">
        Options <ChevronDown />
      </Button>
    </Menu.Trigger>
    <Menu.Content minWidth={180}>
      <Menu.Item onSelect={() => {}}>Edit</Menu.Item>
      <Menu.Item onSelect={() => {}}>Duplicate</Menu.Item>
      <Menu.Separator />
      <Menu.Sub>
        <Menu.SubTrigger>More</Menu.SubTrigger>
        <Menu.SubContent>
          <Menu.Item onSelect={() => {}}>Move to project…</Menu.Item>
          <Menu.Item onSelect={() => {}}>Move to folder…</Menu.Item>
          <Menu.Separator />
          <Menu.Item onSelect={() => {}}>Advanced options…</Menu.Item>
        </Menu.SubContent>
      </Menu.Sub>
      <Menu.Separator />
      <Menu.Item onSelect={() => {}}>Share</Menu.Item>
      <Menu.Item onSelect={() => {}}>Add to favorites</Menu.Item>
      <Menu.Separator />
      <Menu.Item onSelect={() => {}}>Delete</Menu.Item>
    </Menu.Content>
  </Menu>
)

type MenuCheckboxStoryArgs = Pick<MenuCheckboxItemProps, "indicatorPosition" | "indicatorVariant">

export const WithCheckboxes = (args: MenuCheckboxStoryArgs) => {
  const [settings, setSettings] = useState({
    showGrid: true,
    showLabels: false,
    enableShadows: false,
  })

  return (
    <Menu>
      <Menu.Trigger>
        <Button variant="ghost" color="primary">
          Checkbox menu <ChevronDown />
        </Button>
      </Menu.Trigger>
      <Menu.Content minWidth={200}>
        <Menu.CheckboxItem
          checked={settings.showGrid}
          onCheckedChange={(checked) => setSettings((s) => ({ ...s, showGrid: checked }))}
          onSelect={(evt) => evt.preventDefault()}
          indicatorPosition={args.indicatorPosition}
          indicatorVariant={args.indicatorVariant}
        >
          Show grid lines
        </Menu.CheckboxItem>
        <Menu.CheckboxItem
          checked={settings.showLabels}
          onCheckedChange={(checked) => setSettings((s) => ({ ...s, showLabels: checked }))}
          onSelect={(evt) => evt.preventDefault()}
          indicatorPosition={args.indicatorPosition}
          indicatorVariant={args.indicatorVariant}
        >
          Display labels
        </Menu.CheckboxItem>
        <Menu.CheckboxItem
          checked={settings.enableShadows}
          onCheckedChange={(checked) => setSettings((s) => ({ ...s, enableShadows: checked }))}
          onSelect={(evt) => evt.preventDefault()}
          indicatorPosition={args.indicatorPosition}
          indicatorVariant={args.indicatorVariant}
        >
          Enable shadows
        </Menu.CheckboxItem>
      </Menu.Content>
    </Menu>
  )
}

WithCheckboxes.args = {
  indicatorPosition: "end",
  indicatorVariant: "solid",
}

WithCheckboxes.argTypes = {
  indicatorPosition: { control: "select", options: ["start", "end"] },
  indicatorVariant: { control: "select", options: ["solid", "ghost"] },
}

WithCheckboxes.parameters = {
  controls: { include: ["indicatorPosition", "indicatorVariant"] },
  docs: {
    source: {
      code: `const [settings, setSettings] = useState({
  showGrid: true,
  showLabels: false,
  enableShadows: false,
})

return (
  <Menu>
    <Menu.Trigger>
      <Button variant="ghost" color="primary">
        Checkbox menu <ChevronDown />
      </Button>
    </Menu.Trigger>
    <Menu.Content minWidth={200}>
      <Menu.CheckboxItem
        checked={settings.showGrid}
        onCheckedChange={(checked) => setSettings((s) => ({ ...s, showGrid: checked }))}
        onSelect={(evt) => evt.preventDefault()}
        indicatorPosition="end"
        indicatorVariant="filled"
      >
        Show grid lines
      </Menu.CheckboxItem>
      <Menu.CheckboxItem
        checked={settings.showLabels}
        onCheckedChange={(checked) => setSettings((s) => ({ ...s, showLabels: checked }))}
        onSelect={(evt) => evt.preventDefault()}
        indicatorPosition="end"
        indicatorVariant="filled"
      >
        Display labels
      </Menu.CheckboxItem>
      <Menu.CheckboxItem
        checked={settings.enableShadows}
        onCheckedChange={(checked) => setSettings((s) => ({ ...s, enableShadows: checked }))}
        onSelect={(evt) => evt.preventDefault()}
        indicatorPosition="end"
        indicatorVariant="filled"
      >
        Enable shadows
      </Menu.CheckboxItem>
    </Menu.Content>
  </Menu>
)`,
    },
  },
}

export const WithRadioItems = (args: MenuRadioGroupProps<string>) => {
  const [value, setValue] = useState("any")

  return (
    <Menu>
      <Menu.Trigger>
        <Button color="primary" variant="ghost">
          Radio menu <ChevronDown />
        </Button>
      </Menu.Trigger>
      <Menu.Content align="start" minWidth="auto" width="auto">
        <Menu.RadioGroup
          indicatorPosition={args.indicatorPosition}
          value={value}
          onChange={setValue}
        >
          <Menu.RadioItem value="any">Any time</Menu.RadioItem>
          <Menu.RadioItem value="today" disabled>
            Today
          </Menu.RadioItem>
          <Menu.RadioItem value="last7d">Last 7 days</Menu.RadioItem>
          <Menu.RadioItem value="last30d">Last 30 days</Menu.RadioItem>
          <Menu.RadioItem value="last3m">Last 3 months</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu>
  )
}

WithRadioItems.args = {
  indicatorPosition: "end",
}

WithRadioItems.argTypes = {
  indicatorPosition: { control: "select", options: ["start", "end"] },
}

WithRadioItems.parameters = {
  controls: { include: ["indicatorPosition"] },
  docs: {
    source: {
      code: `<Menu>
  <Menu.Trigger>
    <Button color="primary" variant="ghost">
      Radio menu <ChevronDown />
    </Button>
  </Menu.Trigger>
  <Menu.Content align="start" minWidth="auto" width="auto">
    <Menu.RadioGroup
      indicatorPosition="end"
      value={value}
      onChange={setValue}
    >
      <Menu.RadioItem value="any">Any time</Menu.RadioItem>
      <Menu.RadioItem value="today">Today</Menu.RadioItem>
      <Menu.RadioItem value="last7d">Last 7 days</Menu.RadioItem>
      <Menu.RadioItem value="last30d">Last 30 days</Menu.RadioItem>
      <Menu.RadioItem value="last3m">Last 3 months</Menu.RadioItem>
    </Menu.RadioGroup>
  </Menu.Content>
</Menu>`,
    },
  },
}
