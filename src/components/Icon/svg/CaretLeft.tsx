import type { SVGProps } from "react"
const CaretLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m9 13 6 5V8l-6 5Z" />
    <path
      fillRule="evenodd"
      d="M15.424 7.094A1 1 0 0 1 16 8v10a1 1 0 0 1-1.64.768l-6-5a1 1 0 0 1 0-1.536l6-5a1 1 0 0 1 1.064-.138ZM10.562 13 14 15.865v-5.73L10.562 13Z"
      clipRule="evenodd"
    />
  </svg>
)
export default CaretLeft
