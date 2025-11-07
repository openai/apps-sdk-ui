import { Unstyled } from "@storybook/blocks"
import clsx from "clsx"
import s from "./Card.module.css"

export const Card = ({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  onClick?: () => void
}) => {
  return (
    <div className={s.Card} onClick={onClick} data-interactive={!!onClick}>
      <Unstyled>
        <div className={s.CardInner}>
          <div className={s.Icon}>{icon}</div>
          <h6 className={s.Title}>{title}</h6>
          <p className={s.Subtitle}>{subtitle}</p>
        </div>
      </Unstyled>
    </div>
  )
}

export const FooterCard = ({
  className,
  title,
  subtitle,
  onClick,
}: {
  className?: string
  title: string
  subtitle: string
  onClick?: () => void
}) => {
  return (
    <div
      className={clsx(s.Card, s.FooterCard, className)}
      onClick={onClick}
      data-interactive={!!onClick}
    >
      <Unstyled>
        <div className={s.CardInner}>
          <p className={s.Subtitle}>{subtitle}</p>
          <h6 className={s.Title}>{title}</h6>
        </div>
      </Unstyled>
    </div>
  )
}
