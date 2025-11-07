import { Unstyled } from "@storybook/blocks"
import { type ReactNode } from "react"
import s from "./CustomTable.module.css"

export const CustomTable = ({ children }: { children: ReactNode }) => {
  return (
    <Unstyled>
      <table className={s.Table}>{children}</table>
    </Unstyled>
  )
}

export const Value = ({ children }: { children: ReactNode }) => {
  return <span className={s.Value}>{children}</span>
}
