import type { SVGProps } from "react"
const Dot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-dot"
    {...props}
  >
    <circle cx={12.1} cy={12.1} r={1} />
  </svg>
)
export default Dot
