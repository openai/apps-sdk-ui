import type { SVGProps } from "react"
const TableRowFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      d="M5 4C3.34315 4 2 5.34315 2 7V11H22V7C22 5.34315 20.6569 4 19 4H5Z"
      fill="currentColor"
    />
    <path
      d="M22 13H2V17C2 18.6569 3.34315 20 5 20H19C20.6569 20 22 18.6569 22 17V13Z"
      fill="currentColor"
    />
  </svg>
)
export default TableRowFilled
