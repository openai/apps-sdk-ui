import type { SVGProps } from "react"
const Timer = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 2h6m-3 8v4m0 8a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
    />
  </svg>
)
export default Timer
