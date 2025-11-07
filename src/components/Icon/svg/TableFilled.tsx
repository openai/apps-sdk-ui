import type { SVGProps } from "react"
const TableFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2 11H11V20H5C3.34315 20 2 18.6569 2 17V11Z" fill="currentColor" />
    <path d="M13 11H22V17C22 18.6569 20.6569 20 19 20H13V11Z" fill="currentColor" />
    <path
      d="M5 4C3.34315 4 2 5.34315 2 7V9H22V7C22 5.34315 20.6569 4 19 4H5Z"
      fill="currentColor"
    />
  </svg>
)
export default TableFilled
