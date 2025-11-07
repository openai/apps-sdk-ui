import type { SVGProps } from "react"
const Bills = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    viewBox="0 0 21 21"
    stroke="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M2.375 16.125a50.062 50.062 0 0 1 13.164 1.75.955.955 0 0 0 1.211-.913v-.837M3.625 4.25v.625A.625.625 0 0 1 3 5.5h-.625m0 0v-.313c0-.517.42-.937.938-.937h14.062m-15 1.25V13m15-8.75v.625c0 .345.28.625.625.625h.625m-1.25-1.25h.313c.517 0 .937.42.937.938v8.125c0 .517-.42.937-.938.937h-.312m-15-1.25v.313a.937.937 0 0 0 .938.937h.312M2.375 13H3a.625.625 0 0 1 .625.625v.625m13.75 0v-.625A.624.624 0 0 1 18 13h.625m-1.25 1.25H3.625m9.375-5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm2.5 0h.007v.007H15.5V9.25Zm-10 0h.007v.007H5.5V9.25Z"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default Bills
