import clsx from "clsx"
import type { ComponentProps } from "react"
import s from "./LoadingDots.module.css"

export type LoadingDotsProps = Omit<ComponentProps<"div">, "children">

export const LoadingDots = ({ className, ...restProps }: LoadingDotsProps) => {
  return (
    <div className={clsx(s.LoadingDots, className)} {...restProps}>
      <div className={s.Dot} />
      <div className={s.Dot} />
      <div className={s.Dot} />
    </div>
  )
}
