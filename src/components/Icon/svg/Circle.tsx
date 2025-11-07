import type { SVGProps } from "react"
const Circle = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 6 6" fill="currentColor" {...props}>
    <rect width={6} height={6} rx={3} />
  </svg>
)
export default Circle
