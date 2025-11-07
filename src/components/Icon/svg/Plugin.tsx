import type { SVGProps } from "react"
const Plugin = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M15.465 19a3.501 3.501 0 0 1-6.93 0H6a3 3 0 0 1-3-3v-2.5a1 1 0 0 1 1-1h.5a1.5 1.5 0 0 0 0-3H4a1 1 0 0 1-1-1V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2.535ZM12 20a1.5 1.5 0 0 0 1.5-1.5V18a1 1 0 0 1 1-1H18a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v1.535a3.5 3.5 0 0 1 0 6.93V16a1 1 0 0 0 1 1h3.5a1 1 0 0 1 1 1v.5A1.5 1.5 0 0 0 12 20Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Plugin
