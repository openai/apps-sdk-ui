import type { Meta } from "@storybook/react"
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentProps,
  type FormEvent,
  type KeyboardEvent,
} from "react"
import { Alert } from "../../components/Alert"
import { Avatar } from "../../components/Avatar"
import { Button } from "../../components/Button"
import { Chat, DotsHorizontal, Flag, ThumbUp, ThumbUpFilled } from "../../components/Icon"
import { Menu } from "../../components/Menu"
import { Textarea } from "../../components/Textarea"

type Post = {
  id: string
  author: string
  text: string
  likes: number
}

const countFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
})

const posts: Post[] = [
  {
    id: "maya",
    author: "Maya Chen",
    text: "What small detail makes an app feel trustworthy?\n\nMine is a clear way back. A cancel button should preserve the work you've already done.",
    likes: 12,
  },
  {
    id: "alex",
    author: "Alex Rivera",
    text: "A good loading state tells me what is happening and what I can still do. Progress should help me decide what to do next.",
    likes: 8,
  },
]

// Menu needs a native trigger ref, including with React 18's ref forwarding.
const FeedMenuButton = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  (props, ref) => {
    const container = useRef<HTMLSpanElement>(null)
    useImperativeHandle(
      ref,
      () => container.current!.querySelector<HTMLButtonElement>("button")!,
      [],
    )
    return (
      <span ref={container} className="contents">
        <Button {...props} />
      </span>
    )
  },
)
FeedMenuButton.displayName = "FeedMenuButton"

// A composition example, not a new exported library component.
export const FeedItemExample = ({ post }: { post: Post }) => {
  const id = useId()
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [reported, setReported] = useState(false)
  const [panel, setPanel] = useState<"reply" | "report" | null>(null)
  const [draft, setDraft] = useState("")
  const [replies, setReplies] = useState<{ id: number; text: string }[]>([])
  const [status, setStatus] = useState("")
  const nextReplyId = useRef(0)
  const articleRef = useRef<HTMLElement>(null)
  const composing = useRef(false)
  const reportAfterMenuClose = useRef(false)
  const likeCount = post.likes + Number(liked)

  useEffect(() => {
    if (panel !== "reply") composing.current = false
    const target =
      panel === "reply"
        ? "textarea"
        : panel === "report"
          ? '[data-feed-action="cancel-report"]'
          : undefined
    if (target) articleRef.current?.querySelector<HTMLElement>(target)?.focus()
  }, [panel])

  const closePanel = () => {
    const trigger = panel === "reply" ? "reply" : "menu"
    if (panel === "reply" && draft.trim()) {
      setStatus("Draft kept. Choose Reply to continue writing.")
    }
    setPanel(null)
    composing.current = false
    articleRef.current?.querySelector<HTMLButtonElement>(`[data-feed-action="${trigger}"]`)?.focus()
  }

  const handleEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (
      event.key !== "Escape" ||
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      event.keyCode === 229 ||
      composing.current
    )
      return
    event.preventDefault()
    event.stopPropagation()
    closePanel()
  }

  const submitReply = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft.trim() || composing.current) return
    const reply = { id: nextReplyId.current++, text: draft }
    setReplies((current) => [...current, reply])
    setDraft("")
    setPanel(null)
    setStatus("Reply added.")
    articleRef.current?.querySelector<HTMLButtonElement>('[data-feed-action="reply"]')?.focus()
  }

  return (
    <article ref={articleRef} aria-labelledby={`${id}-author`} className="min-w-0 py-5">
      <header className="flex items-center gap-3">
        <span aria-hidden="true" className="shrink-0">
          <Avatar name={post.author} size={36} />
        </span>
        <h3 id={`${id}-author`} className="min-w-0 text-sm font-semibold break-words">
          {post.author}
        </h3>
      </header>

      <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap [overflow-wrap:anywhere]">
        {post.text}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-1">
        <Button
          aria-label={`Like post by ${post.author}`}
          aria-describedby={`${id}-likes`}
          aria-pressed={liked}
          color="secondary"
          variant="ghost"
          size="2xl"
          gutterSize="xs"
          selected={liked}
          onClick={() => setLiked((current) => !current)}
        >
          {liked ? <ThumbUpFilled aria-hidden="true" /> : <ThumbUp aria-hidden="true" />}
          Like
          <span aria-hidden="true" className="tabular-nums text-secondary">
            {countFormatter.format(likeCount)}
          </span>
          <span id={`${id}-likes`} className="sr-only">
            {likeCount}
            {likeCount === 1 ? " like" : " likes"}
          </span>
        </Button>
        <Button
          aria-label={`Reply to post by ${post.author}`}
          aria-describedby={`${id}-replies`}
          aria-expanded={panel === "reply"}
          aria-controls={panel === "reply" ? `${id}-reply` : undefined}
          color="secondary"
          variant="ghost"
          size="2xl"
          gutterSize="xs"
          data-feed-action="reply"
          onClick={() => {
            setPanel("reply")
            setStatus("")
            articleRef.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus()
          }}
        >
          <Chat aria-hidden="true" />
          Reply
          <span aria-hidden="true" className="tabular-nums text-secondary">
            {countFormatter.format(replies.length)}
          </span>
          <span id={`${id}-replies`} className="sr-only">
            {replies.length}
            {replies.length === 1 ? " reply" : " replies"}
          </span>
        </Button>
        <div className="ms-auto">
          <Menu>
            <Menu.Trigger>
              <FeedMenuButton
                aria-label={`More actions for post by ${post.author}`}
                color="secondary"
                variant="ghost"
                size="2xl"
                uniform
                data-feed-action="menu"
                onFocus={() => {
                  if (reportAfterMenuClose.current) {
                    reportAfterMenuClose.current = false
                    setPanel("report")
                  }
                }}
              >
                <DotsHorizontal aria-hidden="true" />
              </FeedMenuButton>
            </Menu.Trigger>
            <Menu.Content align="end" minWidth={180}>
              <Menu.CheckboxItem
                checked={saved}
                onCheckedChange={(checked) => {
                  setSaved(checked)
                  setStatus(checked ? "Post saved." : "Post removed from saved items.")
                }}
              >
                Save post
              </Menu.CheckboxItem>
              <Menu.Separator />
              <Menu.Item
                disabled={reported}
                onSelect={() => {
                  // Wait for Menu to restore trigger focus before opening the next surface.
                  reportAfterMenuClose.current = true
                  setStatus("")
                }}
              >
                <Flag aria-hidden="true" />
                {reported ? "Reported" : "Report post"}
              </Menu.Item>
            </Menu.Content>
          </Menu>
        </div>
      </div>

      {replies.length > 0 && (
        <ul
          aria-label={`Replies to ${post.author}`}
          className="mt-3 space-y-3 border-s border-subtle ps-4"
        >
          {replies.map((reply) => (
            <li key={reply.id}>
              <p className="text-xs font-semibold">You</p>
              <p className="mt-1 text-sm whitespace-pre-wrap [overflow-wrap:anywhere]">
                {reply.text}
              </p>
            </li>
          ))}
        </ul>
      )}

      {panel === "reply" && (
        <form
          id={`${id}-reply`}
          aria-label={`Reply to ${post.author}`}
          className="mt-4 space-y-3"
          onSubmit={submitReply}
          onKeyDown={handleEscape}
          onCompositionStartCapture={() => {
            composing.current = true
          }}
          onCompositionEndCapture={() => {
            composing.current = false
          }}
        >
          <label htmlFor={`${id}-draft`} className="block text-sm font-medium">
            Your reply
          </label>
          <Textarea
            id={`${id}-draft`}
            aria-describedby={`${id}-reply-hint`}
            name="reply"
            value={draft}
            onChange={(event) => setDraft(event.currentTarget.value)}
            placeholder={`Reply to ${post.author}…`}
            rows={3}
            autoResize
            maxRows={6}
          />
          <p id={`${id}-reply-hint`} className="text-xs text-secondary">
            Enter adds a new line. Closing keeps your draft.
          </p>
          <div className="flex justify-end gap-2">
            <Button color="secondary" variant="ghost" size="xl" onClick={closePanel}>
              Close
            </Button>
            <Button color="primary" size="xl" type="submit" disabled={!draft.trim()}>
              Post reply
            </Button>
          </div>
        </form>
      )}

      {panel === "report" && (
        <section
          aria-labelledby={`${id}-report-title`}
          aria-describedby={`${id}-report-description`}
          className="mt-4"
          onKeyDown={handleEscape}
        >
          <Alert
            title={<h4 id={`${id}-report-title`}>Report this post?</h4>}
            description={
              <p id={`${id}-report-description`}>
                Confirm that you want to flag this post for review. It will stay visible in the
                feed.
              </p>
            }
            indicator={<Flag aria-hidden="true" />}
            actionsPlacement="bottom"
            actions={
              <>
                <Button
                  color="secondary"
                  variant="ghost"
                  size="xl"
                  data-feed-action="cancel-report"
                  onClick={closePanel}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  size="xl"
                  onClick={() => {
                    setReported(true)
                    setStatus("Report recorded for this post.")
                    closePanel()
                  }}
                >
                  Report post
                </Button>
              </>
            }
          />
        </section>
      )}

      <p role="status" aria-atomic="true" className="mt-2 min-h-5 text-xs text-secondary">
        {status}
      </p>
    </article>
  )
}

const meta = {
  title: "Examples/Feed",
  excludeStories: ["FeedItemExample"],
  parameters: { layout: "padded" },
} satisfies Meta

export default meta

export const Base = () => (
  <section aria-label="Community feed" className="mx-auto w-full max-w-xl">
    <h2 className="heading-lg">Design notes</h2>
    <p className="mt-2 text-sm text-secondary">
      Actions update this preview only. Replies and reports are not sent to a server.
    </p>
    <ul className="mt-1">
      {posts.map((post) => (
        <li key={post.id} className="border-b border-default last:border-b-0">
          <FeedItemExample post={post} />
        </li>
      ))}
    </ul>
  </section>
)

export const Narrow = () => (
  <div className="w-full max-w-xs">
    <FeedItemExample
      post={{
        id: "long-content",
        author: "Alexandra Fernández-López",
        text:
          "Long names and links should wrap without pushing actions out of reach.\n\nexample.com/" +
          "a-long-unbroken-path".repeat(8),
        likes: 1200000,
      }}
    />
  </div>
)
