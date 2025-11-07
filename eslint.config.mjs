import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import path from "eslint-plugin-path"
import react from "eslint-plugin-react"
import reactCompiler from "eslint-plugin-react-compiler"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "react-compiler": reactCompiler,
      path,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "react-hooks/exhaustive-deps": "error",
      "object-shorthand": "error",
      "path/no-absolute-imports": "error",
      "no-restricted-imports": ["error", { patterns: ["src/*", "@/*"] }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "none",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-empty-object-type": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/forbid-elements": [
        "error",
        {
          forbid: [
            {
              element: "b",
              message: "Use <strong> instead of <b> for better semantics.",
            },
            {
              element: "i",
              message: "Use <em> instead of <i> for better semantics.",
            },
          ],
        },
      ],
      "react/jsx-curly-brace-presence": ["error", { props: "never" }],
      "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
      "no-console": "error",
    },
  },
  {
    files: ["**/*.stories.{ts,tsx}", "scripts/**/*.{ts,tsx}"],
    rules: {
      "no-console": "off",
    },
  },
  eslintConfigPrettier,
)
