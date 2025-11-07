import { useEffect, useRef, useState, type MouseEvent } from "react"
import { copyToClipboard, type ClipboardContent } from "../../lib/copyToClipboard"
import { Check, Copy } from "../Icon"
import { Animate } from "../Transition"
import { Button, type ButtonProps } from "./Button"

export type CopyButtonProps = {
  copyValue: string | ClipboardContent | (() => string) | (() => ClipboardContent)
  children?: React.ReactNode | ((props: { copied: boolean }) => React.ReactNode)
} & Omit<ButtonProps, "children">

export const CopyButton = ({ children, copyValue, onClick, ...restProps }: CopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false)
  const copiedTimeout = useRef<number | null>(null)

  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    // No-op when copied is true
    if (copied) {
      return
    }

    setCopied(true)
    onClick?.(evt)

    // Copy content to clipboard
    // NOTE: Failures are a silent no-op
    copyToClipboard(typeof copyValue === "function" ? copyValue() : copyValue)

    copiedTimeout.current = window.setTimeout(() => {
      setCopied(false)
    }, 1300)
  }

  useEffect(() => {
    return () => {
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current)
    }
  }, [])

  return (
    <Button {...restProps} onClick={handleClick}>
      <Animate
        className="w-[var(--button-icon-size)] h-[var(--button-icon-size)]"
        initial={{ scale: 0.6 }}
        enter={{ scale: 1, delay: 150, duration: 300 }}
        exit={{ scale: 0.6, duration: 150 }}
        forceCompositeLayer
      >
        {copied ? <Check key="copied-icon" /> : <Copy key="copy-icon" />}
      </Animate>
      {typeof children === "function" ? children({ copied }) : children}
    </Button>
  )
}
