import type { SVGProps } from "react"
const PlayTriangle = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M7 7.638v8.724c0 1.294 1.464 2.075 2.577 1.376l6.94-4.363a1.615 1.615 0 0 0 0-2.75l-6.94-4.363C8.464 5.562 7 6.344 7 7.638Z"
      clipRule="evenodd"
    />
  </svg>
)
export default PlayTriangle
