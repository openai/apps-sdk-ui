import clsx from "clsx"
import { type ComponentProps, useState } from "react"
import s from "./Image.module.css"

const loadedSrcs = new Set<string>()

export const Image = ({
  src,
  className,
  draggable = false,
  onLoad,
  onError,
  forceRenderAfterLoadFail = false,
  ...restProps
}: ComponentProps<"img"> & {
  /** Force the image tag to be placed in the DOM even if load failed (resulting in broken image display) */
  forceRenderAfterLoadFail?: boolean
}) => {
  const [loaded, setLoaded] = useState(() => src && loadedSrcs.has(src))
  const [failed, setFailed] = useState(false)
  const considerLoaded = loaded || (failed && forceRenderAfterLoadFail)

  if (!src || (!forceRenderAfterLoadFail && failed)) {
    return null
  }

  return (
    <img
      {...restProps}
      src={src}
      className={clsx(s.Image, className)}
      onLoad={(evt) => {
        setLoaded(true)
        loadedSrcs.add(src)
        onLoad?.(evt)
      }}
      onError={(evt) => {
        setFailed(true)
        onError?.(evt)
      }}
      data-loaded={considerLoaded ? "" : undefined}
      draggable={draggable}
    />
  )
}
