import type { SVGProps } from "react"
const Scales = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    stroke="currentColor"
    viewBox="0 0 20 21"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M10 3v14.375m0 0c-1.227 0-2.402.22-3.487.625M10 17.375c1.227 0 2.402.22 3.488.625m2.137-13.358A40.347 40.347 0 0 0 10 4.25c-1.91 0-3.787.133-5.625.392m11.25 0c.842.119 1.675.264 2.5.433m-2.5-.433 2.183 8.938c.102.416-.088.857-.49 1.002a4.992 4.992 0 0 1-1.693.293c-.577 0-1.15-.098-1.693-.293-.402-.145-.592-.586-.491-1.002l2.184-8.938v0Zm-11.25 0a41.18 41.18 0 0 0-2.5.433m2.5-.433 2.183 8.938c.102.416-.088.857-.49 1.002a4.992 4.992 0 0 1-1.693.293c-.577 0-1.15-.098-1.692-.293-.403-.145-.593-.586-.492-1.002l2.184-8.938v0Z"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default Scales
