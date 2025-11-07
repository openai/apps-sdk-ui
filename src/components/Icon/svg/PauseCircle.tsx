import type { SVGProps } from "react"
const PauseCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-2 7a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h.25a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H10Zm3.75 0a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1H14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-.25Z"
      clipRule="evenodd"
    />
  </svg>
)
export default PauseCircle
