import type { SVGProps } from "react"
const PlayCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM9.5 9.332v5.336a1 1 0 0 0 1.54.841l4.152-2.668a1 1 0 0 0 0-1.682L11.04 8.49a1 1 0 0 0-1.541.842Z"
      clipRule="evenodd"
    />
  </svg>
)
export default PlayCircle
