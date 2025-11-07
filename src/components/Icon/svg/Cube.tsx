import type { SVGProps } from "react"
const Cube = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M12.5 3.444a1 1 0 0 0-1 0l-6.253 3.61 6.768 3.807 6.955-3.682-6.47-3.735Zm7.16 5.632L13 12.602v7.666l6.16-3.556a1 1 0 0 0 .5-.867V9.076ZM11 20.268v-7.683L4.34 8.839v7.006a1 1 0 0 0 .5.867L11 20.268Zm-.5-18.557a3 3 0 0 1 3 0l6.66 3.846a3 3 0 0 1 1.5 2.598v7.69a3 3 0 0 1-1.5 2.598L13.5 22.29a3 3 0 0 1-3 0l-6.66-3.846a3 3 0 0 1-1.5-2.598v-7.69a3 3 0 0 1 1.5-2.598L10.5 1.71Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Cube
