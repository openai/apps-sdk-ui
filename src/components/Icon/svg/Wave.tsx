import type { SVGProps } from "react"
const Wave = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M12 5a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V6a1 1 0 0 1 1-1Zm4 5a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm5-1a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0V9ZM8 8a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm-3 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Wave
