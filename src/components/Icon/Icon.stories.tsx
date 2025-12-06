import { type Meta } from "@storybook/react"
import { type ComponentProps } from "react"
import { ArrowRight, Check, Copy, Robot, Search, Settings } from "./"

type IconProps = ComponentProps<typeof Search>

const meta = {
  title: "Components/Icon",
  component: Search,
  args: {
    width: 24,
    height: 24,
  },
  argTypes: {
    className: { control: false },
  },
} satisfies Meta<typeof Search>

export default meta

export const Base = (args: IconProps) => <Search {...args} />

export const Sizing = () => (
  <div className="flex items-center gap-6">
    <div className="flex flex-col items-center gap-2">
      <Search width={16} height={16} />
      <span className="text-sm text-tertiary">16px</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Search width={24} height={24} />
      <span className="text-sm text-tertiary">24px</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Search width={32} height={32} />
      <span className="text-sm text-tertiary">32px</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Search width={48} height={48} />
      <span className="text-sm text-tertiary">48px</span>
    </div>
  </div>
)

export const Colors = () => (
  <div className="flex items-center gap-6">
    <Search className="text-primary" width={24} height={24} />
    <Search className="text-success" width={24} height={24} />
    <Search className="text-warning" width={24} height={24} />
    <Search className="text-danger" width={24} height={24} />
    <Search className="text-tertiary" width={24} height={24} />
  </div>
)

export const CommonIcons = () => (
  <div className="flex items-center gap-4">
    <Search width={20} height={20} />
    <Settings width={20} height={20} />
    <Check width={20} height={20} />
    <Copy width={20} height={20} />
    <ArrowRight width={20} height={20} />
    <Robot width={20} height={20} />
  </div>
)

export const WithText = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <Search width={18} height={18} />
      <span>Search</span>
    </div>
    <div className="flex items-center gap-2">
      <Settings width={18} height={18} />
      <span>Settings</span>
    </div>
    <div className="flex items-center gap-2">
      <Check width={18} height={18} />
      <span>Complete</span>
    </div>
  </div>
)
