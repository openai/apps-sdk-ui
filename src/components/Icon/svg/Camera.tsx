import type { SVGProps } from "react"
const Camera = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M12 4a3 3 0 0 0-2.6 1.5 1 1 0 0 1-.865.5H5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-3.535a1 1 0 0 1-.866-.5A2.998 2.998 0 0 0 12 4ZM8 4a4.993 4.993 0 0 1 4-2 4.99 4.99 0 0 1 4 2h3a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h3Zm4 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Camera
