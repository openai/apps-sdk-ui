import type { SVGProps } from "react"
const ChevronUp = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M12 8a1 1 0 0 1 .707.293l7 7a1 1 0 0 1-1.414 1.414L12 10.414l-6.293 6.293a1 1 0 0 1-1.414-1.414l7-7A1 1 0 0 1 12 8Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ChevronUp
