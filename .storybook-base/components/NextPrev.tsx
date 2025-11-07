import { linkTo } from "@storybook/addon-links"
import { FooterCard } from "./Card"

type NextPrevLink = { title: string; path: string }

export const NextPrev = ({ next, prev }: { next: NextPrevLink; prev?: NextPrevLink }) => {
  return (
    <div className="flex gap-6" style={{ marginTop: 120 }}>
      {prev ? (
        <FooterCard title={prev.title} subtitle="Previous" onClick={linkTo(prev.path)} />
      ) : (
        <div className="flex-1" />
      )}
      <FooterCard
        className="text-right"
        title={next.title}
        subtitle="Next"
        onClick={linkTo(next.path)}
      />
    </div>
  )
}
