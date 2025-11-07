import type { SVGProps } from "react"
const Card = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M2 7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7Zm2 4v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6H4Zm16-2H4V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2Zm-6 6a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Card
