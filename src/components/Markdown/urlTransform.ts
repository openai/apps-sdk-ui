import { defaultUrlTransform as reactMarkdownDefaultUrlTransform } from "react-markdown"

export const defaultUrlTransform = (url: string) => {
  if (url.startsWith("tel:") || url.startsWith("sms:")) {
    return url
  }
  return reactMarkdownDefaultUrlTransform(url)
}
