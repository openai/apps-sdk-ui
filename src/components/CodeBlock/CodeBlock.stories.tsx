import { type Meta } from "@storybook/react"
import type { ComponentProps } from "react"
import { CopyButton } from "../Button"
import { CodeBlock, CodeBlockBase } from "./CodeBlock"

type CodeBlockProps = ComponentProps<typeof CodeBlock>

const meta = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  parameters: { layout: "padded" },
  argTypes: {
    className: { control: false },
    children: { control: false },
    language: {
      control: {
        type: "select",
        options: [
          "javascript",
          "json",
          "jsonc",
          "python",
          "bash",
          "shell",
          "sql",
          "xml",
          "typescript",
          "jsx",
          "tsx",
          "c",
          "clike",
          "css",
          "scss",
          "diff",
          "docker",
          "go",
          "java",
          "kotlin",
          "php",
          "ruby",
          "markdown",
          "toml",
          "yaml",
          "markup",
        ],
      },
    },
  },
} satisfies Meta<typeof CodeBlock>

export default meta

export const Base = (args: CodeBlockProps) => <CodeBlock {...args} />
Base.args = {
  language: "js",
  children: `import OpenAI from "openai";
const openai = new OpenAI();

const stream = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
        {
            role: "user",
            content: "Say 'double bubble bath' ten times fast." ,
        }
    ],
    stream: true,
});

for await (const chunk of stream) {
    console.log(chunk);
    alert(chunk);
    console.log(chunk.choices[0].delta);
}`,
}

export const JavaScript = (args: CodeBlockProps) => <CodeBlock {...args} />
JavaScript.args = {
  language: "javascript",
  children: `// Fetch data from an API using async/await
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Usage
fetchData('https://api.example.com/data');`,
}

export const JSON = (args: CodeBlockProps) => <CodeBlock {...args} />
JSON.args = {
  language: "json",
  children: `{
  "user": {
    "id": 1,
    "name": "Alice",
    "contact": {
      "email": "alice@example.com",
      "phones": ["123-456-7890"]
    }
  },
  "roles": ["admin", "editor"],
  "active": true
}`,
}

export const JSONC = (args: CodeBlockProps) => <CodeBlock {...args} />
JSONC.args = {
  language: "json",
  children: `{
  // allowed comment
  "name": "Alice",
  /* multi-line
     comment */
  "age": 30
}`,
}

export const Python = (args: CodeBlockProps) => <CodeBlock {...args} />
Python.args = {
  language: "python",
  children: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hi, I'm {self.name} and I'm {self.age} years old.")

# Create and use
person = Person("Alice", 30)
person.greet()`,
}

export const Bash = (args: CodeBlockProps) => <CodeBlock {...args} />
Bash.args = {
  language: "shell",
  children: `# Initialize a new git feature branch
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Build and run Docker container
docker build -t myapp:latest .
docker run -d -p 3000:3000 myapp:latest`,
}

export const SQL = (args: CodeBlockProps) => <CodeBlock {...args} />
SQL.args = {
  language: "sql",
  children: `-- List users with their order counts
SELECT
  u.id,
  u.name,
  COUNT(o.id) AS orders_count
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.active = TRUE
GROUP BY u.id, u.name
ORDER BY orders_count DESC;`,
}

export const XML = (args: CodeBlockProps) => <CodeBlock {...args} />
XML.args = {
  language: "xml",
  children: `<catalog>
  <book id="bk101">
    <author>Gambardella, Matthew</author>
    <title>XML Developer's Guide</title>
    <genre>Computer</genre>
    <price>44.95</price>
    <publish_date>2000-10-01</publish_date>
  </book>
</catalog>`,
}

export const TypeScript = (args: CodeBlockProps) => <CodeBlock {...args} />
TypeScript.args = {
  language: "typescript",
  children: `// TypeScript interface and function
interface User {
  id: number;
  name: string;
}

const createUser = (id: number, name: string): User => ({
  id,
  name,
});

// Create and log user
console.log(createUser(1, 'Alice'));`,
}

export const JSX = (args: CodeBlockProps) => <CodeBlock {...args} />
JSX.args = {
  language: "jsx",
  children: `// A simple React component (JSX)
const App = () => (
  <div>
    <h1>Hello, world!</h1>
  </div>
);

// Render to DOM
ReactDOM.render(<App />, document.getElementById('root'));`,
}

export const TSX = (args: CodeBlockProps) => <CodeBlock {...args} />
TSX.args = {
  language: "tsx",
  children: `import React from 'react';

// Props type
type Props = {
  title: string;
  count: number;
};

const Header: React.FC<Props> = ({ title, count }) => (
  <h1>{title} ({count})</h1>
);

export default Header;`,
}

export const C = (args: CodeBlockProps) => <CodeBlock {...args} />
C.args = {
  language: "c",
  children: `#include <stdio.h>

// Function prototype
void greet(const char *name);

int main() {
  int year = 2024;
  char name[] = "Alice";

  printf("Year: %d\\n", year);
  greet(name);

  // Conditional example
  if (year > 2000) {
    printf("Welcome to the 21st century!\\n");
  } else {
    printf("You're in the 20th century.\\n");
  }

  return 0;
}

void greet(const char *name) {
  printf("Hello, %s!\\n", name);
}
`,
}

export const Clike = (args: CodeBlockProps) => <CodeBlock {...args} />
Clike.args = {
  language: "clike",
  children: `// Example of a simple class with a method and control flow
public class Hello {
  private String name;

  public Hello(String name) {
    this.name = name;
  }

  public void greet(int times) {
    for (int i = 0; i < times; i++) {
      System.out.printf("Hello, %s! (%d)%n", name, i + 1);
    }
  }

  public static void main(String[] args) {
    Hello hello = new Hello("World");
    hello.greet(3);
  }
}
`,
}

export const CSS = (args: CodeBlockProps) => <CodeBlock {...args} />
CSS.args = {
  language: "css",
  children: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%);
}

.button {
  padding: 0.75rem 1.5rem;
  color: #fff;
  background-color: #1976d2;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.15);
  transition: background 0.2s;
}

.button:hover,
.button:focus {
  background-color: #1565c0;
  cursor: pointer;
}
`,
}

export const Scss = (args: CodeBlockProps) => <CodeBlock {...args} />
Scss.args = {
  language: "scss",
  children: `$primary-color: #3498db;
$secondary-color: #2ecc71;
$padding: 1rem;

@mixin button-base {
  padding: $padding;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.2s;
}

.button {
  @include button-base;
  background-color: $primary-color;
  color: #fff;

  &:hover, &:focus {
    background-color: darken($primary-color, 10%);
  }

  &.secondary {
    background-color: $secondary-color;
    color: #222;

    &:hover {
      background-color: lighten($secondary-color, 5%);
    }
  }
}
`,
}

export const Diff = (args: CodeBlockProps) => <CodeBlock {...args} />
Diff.args = {
  language: "diff",
  children: `diff --git a/README.md b/README.md
index e69de29..b6fc4c6 100644
--- a/README.md
+++ b/README.md
@@ -0,0 +1,7 @@
+# Project Title
+
+This is a project description.
+
+## Features
+- Feature 1
+- Feature 2
@@ -10,7 +17,9 @@
-Old line to be removed
+New line added
+Another new line
 context line unchanged
`,
}

export const Docker = (args: CodeBlockProps) => <CodeBlock {...args} />
Docker.args = {
  language: "docker",
  children: `FROM node:14
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`,
}

export const Go = (args: CodeBlockProps) => <CodeBlock {...args} />
Go.args = {
  language: "go",
  children: `package main

import (
  "fmt"
  "time"
)

// User struct with fields
type User struct {
  ID   int
  Name string
}

func greet(user User) string {
  return fmt.Sprintf("Hello, %s! (ID: %d)", user.Name, user.ID)
}

func main() {
  users := []User{
    {ID: 1, Name: "Alice"},
    {ID: 2, Name: "Bob"},
  }

  for _, user := range users {
    fmt.Println(greet(user))
  }

  fmt.Println("Current time:", time.Now().Format(time.RFC1123))
}
`,
}

export const Java = (args: CodeBlockProps) => <CodeBlock {...args} />
Java.args = {
  language: "java",
  children: `// Java class with fields, constructor, and a method
public class Person {
  private String name;
  private int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public void greet() {
    System.out.printf("Hello, my name is %s and I am %d years old.%n", name, age);
  }

  public static void main(String[] args) {
    Person alice = new Person("Alice", 30);
    alice.greet();
  }
}
`,
}

export const Kotlin = (args: CodeBlockProps) => <CodeBlock {...args} />
Kotlin.args = {
  language: "kotlin",
  children: `// Simple data class and function in Kotlin
data class User(val name: String, val age: Int)

fun greet(user: User): String {
  return "Hello, \${user.name}! You are \${user.age} years old."
}

fun main() {
  val user = User("Alice", 30)
  println(greet(user))
}`,
}

export const Php = (args: CodeBlockProps) => <CodeBlock {...args} />
Php.args = {
  language: "php",
  children: `<?php

namespace Foo;

class Bar
{
    public const BAZ = 'qux';

    public function __construct(private array $args)
    {
        // Initialize with $args if needed
    }

    public function doSomething(): void
    {
        echo self::BAZ;
    }
}

$bar = new Bar(['arg1', 'arg2']);
$bar->doSomething();
`,
}

export const Ruby = (args: CodeBlockProps) => <CodeBlock {...args} />
Ruby.args = {
  language: "ruby",
  children: `class Greeter
  def initialize(name)
    @name = name
  end

  def salute
    puts "Hello, #{@name}!"
  end
end

g = Greeter.new("World")
g.salute`,
}

export const Markdown = (args: CodeBlockProps) => <CodeBlock {...args} />
Markdown.args = {
  language: "markdown",
  children: `# Hello, world!

This is **Markdown** example. It has [links](https://example.com), *italic text*, and code blocks:`,
}

export const Toml = (args: CodeBlockProps) => <CodeBlock {...args} />
Toml.args = {
  language: "toml",
  children: `[package]
name = "example"
version = "0.1.0"

[dependencies]
serde = "1.0.117"

[[bin]]
name = "example"
path = "src/main.rs"`,
}

export const Yaml = (args: CodeBlockProps) => <CodeBlock {...args} />
Yaml.args = {
  language: "yaml",
  children: `version: "3"

services:
  app:
    image: myapp
    ports:
      - "3000:3000"
    environment:
      - LOG_LEVEL=DEBUG
      - DATABASE_URL=postgres://user:pass@host:port/db
    depends_on:
      - postgres
    restart: always`,
}

export const Markup = (args: CodeBlockProps) => <CodeBlock {...args} />
Markup.args = {
  language: "markup",
  children: `<html>
  <body>
    <h1>Hello, world!</h1>
    <p>This is a simple HTML page.</p>
    <ul>
      <li>It has a heading (<code>&lt;h1&gt;</code>)</li>
      <li>Some text</li>
      <li>And a bulleted list</li>
    </ul>
  </body>
</html>`,
}

// Custom composition example using CodeBlockBase directly
export const CustomBlock = () => (
  <CodeBlockBase>
    <div className="flex items-center justify-between bg-(--alpha-02) border-b border-b-(--alpha-06) px-4 py-1">
      <span className="text-sm font-semibold text-secondary">typescript</span>
      <CopyButton
        variant="ghost"
        color="secondary"
        size="md"
        uniform
        copyValue={`interface Point {\n  x: number\n  y: number\n}\nfunction printPoint(p: Point) {\n  console.log('Point(' + p.x + ', ' + p.y + ')');\n}`}
        className="-mr-2"
      />
    </div>
    <CodeBlockBase.Code language="typescript">
      {`interface Point {
  x: number
  y: number
}

function printPoint(p: Point) {
  console.log('Point(' + p.x + ', ' + p.y + ')');
}`}
    </CodeBlockBase.Code>
  </CodeBlockBase>
)
