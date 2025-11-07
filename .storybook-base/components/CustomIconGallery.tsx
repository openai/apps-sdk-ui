import { IconGallery, IconItem, Unstyled } from "@storybook/blocks"
import { useMemo, useState } from "react"
import { EmptyMessage } from "../../src/components/EmptyMessage"
import * as Icons from "../../src/components/Icon"
import s from "./CustomIconGallery.module.css"

export const CustomIconGallery = () => {
  const [search, setSearch] = useState<string>("")
  const iconList = useMemo(
    () =>
      Object.entries(Icons).filter(([name]) =>
        name.toLowerCase().includes(search.toLocaleLowerCase().trim()),
      ),
    [search],
  )

  return (
    <Unstyled>
      <div className={s.StickyContainer}>
        <div className={s.Container}>
          <Icons.Search className={s.InputIcon} />
          <input
            className={s.Input}
            value={search}
            onChange={(evt) => setSearch(evt.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      {iconList.length === 0 ? (
        <EmptyMessage className={s.EmptyMessage} fill="none">
          <EmptyMessage.Icon size="sm">
            <Icons.Search />
          </EmptyMessage.Icon>
          <EmptyMessage.Description>
            No icons found matching <span className={s.SearchTerm}>"{search}"</span>
          </EmptyMessage.Description>
        </EmptyMessage>
      ) : (
        <IconGallery>
          {iconList.map(([name, Icon]) => (
            <IconItem key={name} name={name}>
              <Icon />
            </IconItem>
          ))}
        </IconGallery>
      )}
    </Unstyled>
  )
}
