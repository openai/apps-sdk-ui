import { type Meta } from "@storybook/react"
import { type ComponentProps } from "react"
import { Image } from "./"

type ImageProps = ComponentProps<"img"> & {
  forceRenderAfterLoadFail?: boolean
}

const meta = {
  title: "Components/Image",
  component: Image,
  args: {
    src: "https://picsum.photos/400/300",
    draggable: false,
    forceRenderAfterLoadFail: false,
  },
  argTypes: {
    src: { control: "text" },
    className: { control: false },
    onLoad: { control: false },
    onError: { control: false },
  },
} satisfies Meta<typeof Image>

export default meta

export const Base = (args: ImageProps) => <Image {...args} />

export const Loading = () => (
  <div className="w-[400px]">
    <Image src="https://picsum.photos/400/300?random=1" alt="Example image" />
  </div>
)

Loading.parameters = {
  docs: {
    source: {
      code: `<Image src="https://picsum.photos/400/300" alt="Example image" />`,
    },
  },
}

export const Error = () => (
  <div className="w-[400px]">
    <Image
      src="https://invalid-url-that-does-not-exist.com/image.jpg"
      alt="This will fail to load"
    />
  </div>
)

Error.parameters = {
  docs: {
    source: {
      code: `<Image src="https://invalid-url-that-does-not-exist.com/image.jpg" alt="This will fail to load" />`,
    },
    description: {
      story: "When an image fails to load, the component returns `null` and nothing is rendered.",
    },
  },
}

export const ForceRenderOnError = () => (
  <div className="w-[400px]">
    <Image
      src="https://invalid-url-that-does-not-exist.com/image.jpg"
      alt="This will fail to load"
      forceRenderAfterLoadFail
    />
  </div>
)

ForceRenderOnError.parameters = {
  docs: {
    source: {
      code: `<Image
  src="https://invalid-url-that-does-not-exist.com/image.jpg"
  alt="This will fail to load"
  forceRenderAfterLoadFail
/>`,
    },
    description: {
      story:
        "Use `forceRenderAfterLoadFail` to display the broken image icon when an image fails to load.",
    },
  },
}

export const Draggable = (args: ImageProps) => (
  <div className="w-[400px]">
    <Image {...args} draggable alt="Draggable image" />
  </div>
)

Draggable.args = {
  draggable: true,
}

Draggable.parameters = {
  docs: {
    source: {
      code: `<Image src="https://picsum.photos/400/300" draggable alt="Draggable image" />`,
    },
  },
}
