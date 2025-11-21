import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{C as sr}from"./index-BNAx77fs.js";import{C as a,a as R}from"./CodeBlock-DKD8txK_.js";const tr={title:"Components/CodeBlock",component:a,parameters:{layout:"padded"},argTypes:{className:{control:!1},children:{control:!1},language:{control:{type:"select",options:["javascript","json","jsonc","python","bash","shell","sql","xml","typescript","jsx","tsx","c","clike","css","scss","diff","docker","go","java","kotlin","php","ruby","markdown","toml","yaml","markup"]}}}},o=e=>r.jsx(a,{...e});o.args={language:"js",children:`import OpenAI from "openai";
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
}`};const s=e=>r.jsx(a,{...e});s.args={language:"javascript",children:`// Fetch data from an API using async/await
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
fetchData('https://api.example.com/data');`};const t=e=>r.jsx(a,{...e});t.args={language:"json",children:`{
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
}`};const c=e=>r.jsx(a,{...e});c.args={language:"json",children:`{
  // allowed comment
  "name": "Alice",
  /* multi-line
     comment */
  "age": 30
}`};const n=e=>r.jsx(a,{...e});n.args={language:"python",children:`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hi, I'm {self.name} and I'm {self.age} years old.")

# Create and use
person = Person("Alice", 30)
person.greet()`};const i=e=>r.jsx(a,{...e});i.args={language:"shell",children:`# Initialize a new git feature branch
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Build and run Docker container
docker build -t myapp:latest .
docker run -d -p 3000:3000 myapp:latest`};const l=e=>r.jsx(a,{...e});l.args={language:"sql",children:`-- List users with their order counts
SELECT
  u.id,
  u.name,
  COUNT(o.id) AS orders_count
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.active = TRUE
GROUP BY u.id, u.name
ORDER BY orders_count DESC;`};const d=e=>r.jsx(a,{...e});d.args={language:"xml",children:`<catalog>
  <book id="bk101">
    <author>Gambardella, Matthew</author>
    <title>XML Developer's Guide</title>
    <genre>Computer</genre>
    <price>44.95</price>
    <publish_date>2000-10-01</publish_date>
  </book>
</catalog>`};const p=e=>r.jsx(a,{...e});p.args={language:"typescript",children:`// TypeScript interface and function
interface User {
  id: number;
  name: string;
}

const createUser = (id: number, name: string): User => ({
  id,
  name,
});

// Create and log user
console.log(createUser(1, 'Alice'));`};const m=e=>r.jsx(a,{...e});m.args={language:"jsx",children:`// A simple React component (JSX)
const App = () => (
  <div>
    <h1>Hello, world!</h1>
  </div>
);

// Render to DOM
ReactDOM.render(<App />, document.getElementById('root'));`};const u=e=>r.jsx(a,{...e});u.args={language:"tsx",children:`import React from 'react';

// Props type
type Props = {
  title: string;
  count: number;
};

const Header: React.FC<Props> = ({ title, count }) => (
  <h1>{title} ({count})</h1>
);

export default Header;`};const g=e=>r.jsx(a,{...e});g.args={language:"c",children:`#include <stdio.h>

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
`};const h=e=>r.jsx(a,{...e});h.args={language:"clike",children:`// Example of a simple class with a method and control flow
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
`};const f=e=>r.jsx(a,{...e});f.args={language:"css",children:`.container {
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
`};const k=e=>r.jsx(a,{...e});k.args={language:"scss",children:`$primary-color: #3498db;
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
`};const b=e=>r.jsx(a,{...e});b.args={language:"diff",children:`diff --git a/README.md b/README.md
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
`};const C=e=>r.jsx(a,{...e});C.args={language:"docker",children:`FROM node:14
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`};const B=e=>r.jsx(a,{...e});B.args={language:"go",children:`package main

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
`};const y=e=>r.jsx(a,{...e});y.args={language:"java",children:`// Java class with fields, constructor, and a method
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
`};const x=e=>r.jsx(a,{...e});x.args={language:"kotlin",children:`// Simple data class and function in Kotlin
data class User(val name: String, val age: Int)

fun greet(user: User): String {
  return "Hello, \${user.name}! You are \${user.age} years old."
}

fun main() {
  val user = User("Alice", 30)
  println(greet(user))
}`};const S=e=>r.jsx(a,{...e});S.args={language:"php",children:`<?php

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
`};const P=e=>r.jsx(a,{...e});P.args={language:"ruby",children:`class Greeter
  def initialize(name)
    @name = name
  end

  def salute
    puts "Hello, #{@name}!"
  end
end

g = Greeter.new("World")
g.salute`};const j=e=>r.jsx(a,{...e});j.args={language:"markdown",children:`# Hello, world!

This is **Markdown** example. It has [links](https://example.com), *italic text*, and code blocks:`};const v=e=>r.jsx(a,{...e});v.args={language:"toml",children:`[package]
name = "example"
version = "0.1.0"

[dependencies]
serde = "1.0.117"

[[bin]]
name = "example"
path = "src/main.rs"`};const w=e=>r.jsx(a,{...e});w.args={language:"yaml",children:`version: "3"

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
    restart: always`};const A=e=>r.jsx(a,{...e});A.args={language:"markup",children:`<html>
  <body>
    <h1>Hello, world!</h1>
    <p>This is a simple HTML page.</p>
    <ul>
      <li>It has a heading (<code>&lt;h1&gt;</code>)</li>
      <li>Some text</li>
      <li>And a bulleted list</li>
    </ul>
  </body>
</html>`};const D=()=>r.jsxs(R,{children:[r.jsxs("div",{className:"flex items-center justify-between bg-(--alpha-02) border-b border-b-(--alpha-06) px-4 py-1",children:[r.jsx("span",{className:"text-sm font-semibold text-secondary",children:"typescript"}),r.jsx(sr,{variant:"ghost",color:"secondary",size:"md",uniform:!0,copyValue:`interface Point {
  x: number
  y: number
}
function printPoint(p: Point) {
  console.log('Point(' + p.x + ', ' + p.y + ')');
}`,className:"-mr-2"})]}),r.jsx(R.Code,{language:"typescript",children:`interface Point {
  x: number
  y: number
}

function printPoint(p: Point) {
  console.log('Point(' + p.x + ', ' + p.y + ')');
}`})]});var E,O,M;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(M=(O=o.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var N,_,I;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(I=(_=s.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var T,H,U;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(U=(H=t.parameters)==null?void 0:H.docs)==null?void 0:U.source}}};var J,$,L;c.parameters={...c.parameters,docs:{...(J=c.parameters)==null?void 0:J.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(L=($=c.parameters)==null?void 0:$.docs)==null?void 0:L.source}}};var F,G,Y;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(Y=(G=n.parameters)==null?void 0:G.docs)==null?void 0:Y.source}}};var X,z,K;i.parameters={...i.parameters,docs:{...(X=i.parameters)==null?void 0:X.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(K=(z=i.parameters)==null?void 0:z.docs)==null?void 0:K.source}}};var W,q,V;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(V=(q=l.parameters)==null?void 0:q.docs)==null?void 0:V.source}}};var Q,Z,ee;d.parameters={...d.parameters,docs:{...(Q=d.parameters)==null?void 0:Q.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(ee=(Z=d.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var re,ae,oe;p.parameters={...p.parameters,docs:{...(re=p.parameters)==null?void 0:re.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(oe=(ae=p.parameters)==null?void 0:ae.docs)==null?void 0:oe.source}}};var se,te,ce;m.parameters={...m.parameters,docs:{...(se=m.parameters)==null?void 0:se.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(ce=(te=m.parameters)==null?void 0:te.docs)==null?void 0:ce.source}}};var ne,ie,le;u.parameters={...u.parameters,docs:{...(ne=u.parameters)==null?void 0:ne.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(le=(ie=u.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};var de,pe,me;g.parameters={...g.parameters,docs:{...(de=g.parameters)==null?void 0:de.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(me=(pe=g.parameters)==null?void 0:pe.docs)==null?void 0:me.source}}};var ue,ge,he;h.parameters={...h.parameters,docs:{...(ue=h.parameters)==null?void 0:ue.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(he=(ge=h.parameters)==null?void 0:ge.docs)==null?void 0:he.source}}};var fe,ke,be;f.parameters={...f.parameters,docs:{...(fe=f.parameters)==null?void 0:fe.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(be=(ke=f.parameters)==null?void 0:ke.docs)==null?void 0:be.source}}};var Ce,Be,ye;k.parameters={...k.parameters,docs:{...(Ce=k.parameters)==null?void 0:Ce.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(ye=(Be=k.parameters)==null?void 0:Be.docs)==null?void 0:ye.source}}};var xe,Se,Pe;b.parameters={...b.parameters,docs:{...(xe=b.parameters)==null?void 0:xe.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(Pe=(Se=b.parameters)==null?void 0:Se.docs)==null?void 0:Pe.source}}};var je,ve,we;C.parameters={...C.parameters,docs:{...(je=C.parameters)==null?void 0:je.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(we=(ve=C.parameters)==null?void 0:ve.docs)==null?void 0:we.source}}};var Ae,De,Re;B.parameters={...B.parameters,docs:{...(Ae=B.parameters)==null?void 0:Ae.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(Re=(De=B.parameters)==null?void 0:De.docs)==null?void 0:Re.source}}};var Ee,Oe,Me;y.parameters={...y.parameters,docs:{...(Ee=y.parameters)==null?void 0:Ee.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(Me=(Oe=y.parameters)==null?void 0:Oe.docs)==null?void 0:Me.source}}};var Ne,_e,Ie;x.parameters={...x.parameters,docs:{...(Ne=x.parameters)==null?void 0:Ne.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(Ie=(_e=x.parameters)==null?void 0:_e.docs)==null?void 0:Ie.source}}};var Te,He,Ue;S.parameters={...S.parameters,docs:{...(Te=S.parameters)==null?void 0:Te.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(Ue=(He=S.parameters)==null?void 0:He.docs)==null?void 0:Ue.source}}};var Je,$e,Le;P.parameters={...P.parameters,docs:{...(Je=P.parameters)==null?void 0:Je.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(Le=($e=P.parameters)==null?void 0:$e.docs)==null?void 0:Le.source}}};var Fe,Ge,Ye;j.parameters={...j.parameters,docs:{...(Fe=j.parameters)==null?void 0:Fe.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(Ye=(Ge=j.parameters)==null?void 0:Ge.docs)==null?void 0:Ye.source}}};var Xe,ze,Ke;v.parameters={...v.parameters,docs:{...(Xe=v.parameters)==null?void 0:Xe.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(Ke=(ze=v.parameters)==null?void 0:ze.docs)==null?void 0:Ke.source}}};var We,qe,Ve;w.parameters={...w.parameters,docs:{...(We=w.parameters)==null?void 0:We.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(Ve=(qe=w.parameters)==null?void 0:qe.docs)==null?void 0:Ve.source}}};var Qe,Ze,er;A.parameters={...A.parameters,docs:{...(Qe=A.parameters)==null?void 0:Qe.docs,source:{originalSource:"(args: CodeBlockProps) => <CodeBlock {...args} />",...(er=(Ze=A.parameters)==null?void 0:Ze.docs)==null?void 0:er.source}}};var rr,ar,or;D.parameters={...D.parameters,docs:{...(rr=D.parameters)==null?void 0:rr.docs,source:{originalSource:`() => <CodeBlockBase>
    <div className="flex items-center justify-between bg-(--alpha-02) border-b border-b-(--alpha-06) px-4 py-1">
      <span className="text-sm font-semibold text-secondary">typescript</span>
      <CopyButton variant="ghost" color="secondary" size="md" uniform copyValue={\`interface Point {\\n  x: number\\n  y: number\\n}\\nfunction printPoint(p: Point) {\\n  console.log('Point(' + p.x + ', ' + p.y + ')');\\n}\`} className="-mr-2" />
    </div>
    <CodeBlockBase.Code language="typescript">
      {\`interface Point {
  x: number
  y: number
}

function printPoint(p: Point) {
  console.log('Point(' + p.x + ', ' + p.y + ')');
}\`}
    </CodeBlockBase.Code>
  </CodeBlockBase>`,...(or=(ar=D.parameters)==null?void 0:ar.docs)==null?void 0:or.source}}};const cr=["Base","JavaScript","JSON","JSONC","Python","Bash","SQL","XML","TypeScript","JSX","TSX","C","Clike","CSS","Scss","Diff","Docker","Go","Java","Kotlin","Php","Ruby","Markdown","Toml","Yaml","Markup","CustomBlock"],dr=Object.freeze(Object.defineProperty({__proto__:null,Base:o,Bash:i,C:g,CSS:f,Clike:h,CustomBlock:D,Diff:b,Docker:C,Go:B,JSON:t,JSONC:c,JSX:m,Java:y,JavaScript:s,Kotlin:x,Markdown:j,Markup:A,Php:S,Python:n,Ruby:P,SQL:l,Scss:k,TSX:u,Toml:v,TypeScript:p,XML:d,Yaml:w,__namedExportsOrder:cr,default:tr},Symbol.toStringTag,{value:"Module"}));export{o as B,dr as C,C as D,B as G,s as J,x as K,A as M,n as P,P as R,k as S,p as T,w as Y,D as a,m as b,u as c,t as d,c as e,i as f,f as g,l as h,j as i,y as j,g as k,h as l,S as m,b as n,v as o};
