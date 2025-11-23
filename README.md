# Apps SDK UI

Apps SDK UI is a lightweight, accessible design system for building high-quality ChatGPT apps with the [Apps SDK](https://developers.openai.com/apps-sdk). It provides Tailwind-integrated design tokens, a curated React component library, and utilities optimized for consistent experiences inside ChatGPT.

## Features

- **Design tokens** for colors, typography, spacing, sizing, shadows, surfaces, and more.
- **Tailwind 4 integration** pre-configured with Apps SDK UI's design tokens.
- **Accessible components**, built on Radix primitives with consistent styling.
- **Utilities** for dark mode, responsive layouts, and ChatGPT-optimized behaviors.
- **Minimal boilerplate** — import styles, wrap with a provider, start building.

## Prerequisites

Apps SDK UI requires **React 18 or 19** and **Tailwind 4**.

- React: https://react.dev/learn/installation
- Tailwind 4: https://tailwindcss.com/docs/installation

## Installation

### 1. Install the package

```bash
npm install @openai/apps-sdk-ui
```

### 2. Setup styles

Add the foundation styles and Tailwind layers to the top of your global stylesheet (e.g. `main.css`):

```css
@import "tailwindcss";
@import "@openai/apps-sdk-ui/css";
/* Required for Tailwind to find class references in Apps SDK UI components. */
@source "../node_modules/@openai/apps-sdk-ui";

/* The rest of your application CSS */
```

Then import your stylesheet _before_ rendering any components:

```tsx
// Must be imported first to ensure Tailwind layers and style foundations are defined before any potential component styles
import "./main.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 3. Add React provider

`<AppsSDKUIProvider>` provides polyfills for ChatGPT’s browser environment and allows you to define a router link component - used in components like `<TextLink>` and `<ButtonLink>`.

```tsx
// Must be imported first to ensure Tailwind layers and style foundations are defined before component styles
import "./main.css"

import { AppsSDKUIProvider } from "@openai/apps-sdk-ui/components/AppsSDKUIProvider"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Link } from "react-router"
import { App } from "./App"

declare global {
  interface AppsSDKUIConfig {
    LinkComponent: typeof Link
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppsSDKUIProvider linkComponent={Link}>
      <App />
    </AppsSDKUIProvider>
  </StrictMode>,
)
```

If your app doesn’t use a router:

```tsx
<AppsSDKUIProvider linkComponent={"a" as any}>
  <App />
</AppsSDKUIProvider>
```

### Start building

Your project is now ready to use Apps SDK UI!

Here's an example of a simple reservation card, using Tailwind classes and components.

```tsx
import { Badge } from "@openai/apps-sdk-ui/components/Badge"
import { Button } from "@openai/apps-sdk-ui/components/Button"
import { Calendar, Invoice, Maps, Members, Phone } from "@openai/apps-sdk-ui/components/Icon"

export function ReservationCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-default bg-surface shadow-lg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-secondary text-sm">Reservation</p>
          <h2 className="mt-1 heading-lg">La Luna Bistro</h2>
        </div>
        <Badge color="success">Confirmed</Badge>
      </div>
      <div>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Calendar className="size-4" />
            Date
          </dt>
          <dd className="text-right">Apr 12 · 7:30 PM</dd>
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Members className="size-4" />
            Guests
          </dt>
          <dd className="text-right">Party of 2</dd>
          <dt className="flex items-center gap-1.5 font-medium text-secondary">
            <Invoice className="size-4" />
            Reference
          </dt>
          <dd className="text-right uppercase">4F9Q2K</dd>
        </dl>
      </div>
      <div className="mt-4 grid gap-3 border-t border-subtle pt-4 sm:grid-cols-2">
        <Button variant="soft" color="secondary" block>
          <Phone />
          Call
        </Button>
        <Button color="primary" block>
          <Maps />
          Directions
        </Button>
      </div>
    </div>
  )
}
```

## License

[MIT](LICENSE) © OpenAI
