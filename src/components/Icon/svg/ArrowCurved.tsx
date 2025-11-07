import type { SVGProps } from "react"
const ArrowCurved = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M5 6a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h9.586l-2.293-2.293a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L16.586 14H7a3 3 0 0 1-3-3V7a1 1 0 0 1 1-1Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ArrowCurved
