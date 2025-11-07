import type { SVGProps } from "react"
const Lightbulb = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 3c3.585 0 6.5 2.923 6.5 6.538A6.542 6.542 0 0 1 15.575 15h-7.15A6.542 6.542 0 0 1 5.5 9.538C5.5 5.923 8.415 3 12 3Zm2.865 14v1h-5.73v-1h5.73Zm-1.133 3a2 2 0 0 1-3.464 0h3.464Zm-5.606 0a4.002 4.002 0 0 0 7.748 0 1 1 0 0 0 .991-1v-2.46A8.54 8.54 0 0 0 20.5 9.539C20.5 4.828 16.7 1 12 1S3.5 4.828 3.5 9.538a8.54 8.54 0 0 0 3.635 7.003V19a1 1 0 0 0 .991 1Z" />
  </svg>
)
export default Lightbulb
