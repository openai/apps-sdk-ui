import { Unstyled } from "@storybook/blocks"
import s from "./Hero.module.css"

export const Hero = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <Unstyled>
      <div className={s.Container}>
        <div className={className}>{children}</div>
      </div>
    </Unstyled>
  )
}
