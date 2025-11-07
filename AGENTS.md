# Contribution guide for Apps SDK UI

Apps SDK UI is a design system tailored for building apps in ChatGPT. Apps SDK UI provides styling foundations, CSS variable design tokens, and a library of well-crafted, accessible components.

- **Design tokens** – defined across colors, typography, spacing, sizing, shadows, surfaces, and more.
- **Tailwind 4** – fully integrated and pre-configured with Apps SDK UI's design tokens.
- **Component library** – high-quality components built on top of Radix for consistent accessibility patterns.
- **Utilities** – helpful tools for handling core concepts like dark mode, responsiveness, and more across React and CSS.

Keep this goal and context in mind as you contribute code to the repository. This code is the foundation for many other projects, and changes should be robust, well-considered, and workable for many different contexts.

## Repository overview

You should make changes only in the `src/` folder:

- `components/` - React component implementations (e.g., Button, Chat, Tooltip)
- `hooks/` - Reusable React hooks (e.g., useAutoGrowTextarea, useBreakpoints)
- `lib/` - Utility functions (theme helpers, attachment helpers, etc.)
- `styles/` - Global CSS config, Tailwind setup, and design token definitions
- `**/*.stories.tsx` - Storybook stories definition for a given component
- `**/*.mdx` - Storybook documentation, often referring to sibling `.stories.tsx` file
- `types.ts` - Shared TypeScript types
- `vite-env.d.ts` - Vite type declarations

When adding new functionality or docs, place files in the appropriate `src/*` location.

# Components

## File Naming Conventions

- Component: `ComponentName.tsx`
- Styles: `ComponentName.module.css`
- Tests: `ComponentName.test.tsx`
- Storybook:
  - `ComponentName.stories.tsx`
  - `ComponentName.mdx`

## Component library

Below is a quick reference of all provided components:

| Component              | Description                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| **Alert**              | Call attention to a specific message or warning.                      |
| **Animate**            | Animate components as they mount and unmount.                         |
| **AnimateLayout**      | Animate width & height of components as they mount and unmount.       |
| **AnimateLayoutGroup** | Animate width & height of lists of components as they enter and exit. |
| **Avatar**             | Display user identities with either text, photo, or an icon.          |
| **AvatarGroup**        | Display avatars as a single stack.                                    |
| **Badge**              | Emphasize details with a status indicator.                            |
| **Button**             | Create actions in many different styles.                              |
| **ButtonLink**         | `<Button>` but as a semantic anchor element.                          |
| **Checkbox**           | Toggle control for on and off states.                                 |
| **CodeBlock**          | Display syntax‑highlighted code snippets.                             |
| **CopyTooltip**        | Allow users to easily copy to clipboard.                              |
| **EmptyMessage**       | Gracefully inform users when there's nothing to see.                  |
| **Icon**               | Collection of SVG icons exported as React components.                 |
| **Image**              | Load remote images with optional aspect ratio and cover mode.         |
| **Indicator**          | Loading dots and circular progress indicators.                        |
| **Input**              | Semantic input text collection.                                       |
| **Markdown**           | Render rich formatted content.                                        |
| **Menu**               | Structured actions in a dropdown list.                                |
| **Modal**              | Capture focus for essential tasks or details.                         |
| **AppsSDKUIProvider**  | React provider for shared context (e.g., link component).             |
| **Popover**            | Generic floating UI utility for contextual actions.                   |
| **RadioGroup**         | Radio button group selection component.                               |
| **SegmentedControl**   | Toggle through grouped options.                                       |
| **Select**             | Choose from a dropdown of options.                                    |
| **SelectControl**      | Alternative select control component with enhanced features.          |
| **Slider**             | Fine-tune values within a set range.                                  |
| **Switch**             | Toggle control for on and off states.                                 |
| **TagInput**           | Enter multiple unique tags.                                           |
| **TextLink**           | Semantic link used for both internal and external links.              |
| **Textarea**           | Autosizable text input area with optional validation.                 |
| **Tooltip**            | Brief and informative hover text.                                     |
| **TransitionGroup**    | Primitive for rendering components over time.                         |

## Documentation & Storybook

All components should be thoroughly documented in Storybook, using the `.mdx` and `.stories` sidecar files.

- You should not need to run Storybook locally, so ignore the `pnpm run storybook` command
- Update or create `.mdx` and `.stories.tsx` files when adding new components or features.
- Keep usage examples simple and focused. Refer to documentation examples like `Avatar`, `Badge`, and `Button` for guidance.

# Contributing

When working on features or documentation, avoid making unrelated changes to the current task. Do not add comments for obvious behaviors, and do not change build settings.

## Setup instructions

- Use Node version specified in `.node-version`
- Install dependencies with `npm install`

## Required commands before commit

1. `npm run format:fix` - Auto-fixes any formatting issues
2. `npm run lint` - Runs ESLint (TS) and Stylelint (CSS)
3. `npm run types` - Runs TypeScript type checking
4. `npm run test` - Executes unit tests via Vitest

Ignore all other script commands, as they will be irrelevant to your work.
