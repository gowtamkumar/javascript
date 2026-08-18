হ্যাঁ, তোমার confusionটা মূলত **Execution Context কী, কখন তৈরি হয়, আর “Loading/Creation → Execution” এর মধ্যে পার্থক্য কী**—এখানে।

তোমার notes-এ কিছু জিনিস ঠিক আছে, কিন্তু কিছু জায়গায় terminology এবং sequence মিশে গেছে। আমি একদম **zero → step-by-step → advanced** ভাবে সাজিয়ে দিচ্ছি।

---

# 1. প্রথমে বুঝি: JavaScript code কীভাবে run হয়?

ধরো তুমি লিখলে:

```js
var topic = "JavaScript";

function getTopic() {
  console.log(topic);
}

getTopic();
```

এই code সরাসরি CPU বুঝতে পারে না।

JavaScript runtime/engine (যেমন Chrome-এর **V8**) code-কে process করে এবং execute করে।

একটা simplified picture:

```text
JavaScript Source Code
        ↓
   JavaScript Engine
        ↓
 Parsing
        ↓
 Execution Context তৈরি
        ↓
 Memory / Environment তৈরি
        ↓
 Code Execution
        ↓
 Result
```

এখানে একটা important correction:

> JavaScript-কে simply “শুধু interpreter” বা “শুধু compiler” বলা ঠিক না।

Modern JavaScript engines **interpretation + JIT compilation + optimization**—একাধিক technique ব্যবহার করে।

---

# 2. Interpreter কী?

Interpreter সাধারণভাবে code পড়ে এবং execute করে।

ধরো:

```js
console.log("Hello");

let x = 10;

console.log(x);
```

Conceptually:

```text
Read → Execute
Read → Execute
Read → Execute
```

Interpreter-এর advantage:

- দ্রুত start করা যায়
- development/debugging সহজ হতে পারে

কিন্তু historically pure interpretation-এর execution performance compilation-এর তুলনায় কম হতে পারে।

---

# 3. Traditional Compilation কী?

Compiler পুরো code আগে machine code বা অন্য executable representation-এ convert করতে পারে।

Conceptually:

```text
Source Code
    ↓
Compiler
    ↓
Machine Code
    ↓
CPU
```

তারপর machine code execute হয়।

Advantage:

- execution খুব fast হতে পারে

কিন্তু compile step-এর overhead আছে।

---

# 4. JIT কী?

JIT = **Just-In-Time**

Modern JavaScript engine runtime-এর সময় code compile এবং optimize করতে পারে।

Simplified:

```text
JavaScript
    ↓
Parse
    ↓
Initial execution
    ↓
JIT compilation
    ↓
Optimization
    ↓
Faster execution
```

এখানে একটা important concept:

> **JIT এবং Execution Context একই জিনিস না।**

এটাই তোমার notes-এর বড় confusion-এর জায়গা।

---

# 5. তাহলে Execution Context কী?

এখন আসল topic।

**Execution Context হলো JavaScript code execute করার জন্য engine যে environment তৈরি করে।**

সহজ ভাষায়:

> JavaScript যখন code execute করবে, তখন সেই code-এর variables, functions, `this`, scope information ইত্যাদি manage করার জন্য একটি execution environment তৈরি হয়—এটাই Execution Context।

একটা analogy দিই।

ধরো তুমি একটা office-এ ঢুকলে।

Office-এর ভিতরে থাকবে:

```text
Office
 ├── Employees
 ├── Documents
 ├── Rules
 ├── Manager
 └── Resources
```

JavaScript-এর Execution Context-ও অনেকটা এরকম:

```text
Execution Context
 ├── Variables
 ├── Functions
 ├── Arguments
 ├── this
 ├── Scope information
 └── Other execution information
```

---

# 6. Execution Context-এর প্রধান ধরন

Modern JavaScript-এ broadly আমরা দেখি:

```text
Execution Context
│
├── Global Execution Context
│
├── Function Execution Context
│
└── Eval Execution Context
```

তোমার learning-এর জন্য প্রথম দুইটা সবচেয়ে important:

1. **Global Execution Context**
2. **Function Execution Context**

---

# 7. Global Execution Context

যখন JavaScript program প্রথমবার run হয়, তখন একটা **Global Execution Context** তৈরি হয়।

ধরো:

```js
var topic = "JavaScript";

function getTopic() {
  console.log(topic);
}

console.log(topic);
```

সবার আগে:

```text
Global Execution Context
```

তৈরি হবে।

---

# 8. Global Execution Context-এর দুইটা প্রধান phase

Beginner হিসেবে তুমি এই model follow করতে পারো:

```text
Global Execution Context
        │
        ├── Creation Phase
        │
        └── Execution Phase
```

তোমার notes-এ তুমি “Loading stage” এবং “Creation stage” দুটোকে আলাদা করে ফেলেছ।

এখানে সেটা simplify করি:

> **Creation Phase = আগে memory/environment প্রস্তুত হয়**

> **Execution Phase = তারপর code line-by-line execute হয়**

---

# 9. Creation Phase

ধরো:

```js
var topic = "JavaScript";

function getTopic() {
  console.log(topic);
}
```

JavaScript engine প্রথমে execution-এর জন্য environment প্রস্তুত করবে।

Conceptually:

```text
Global Execution Context

topic     → undefined

getTopic  → function

this      → global object
```

এখানে `var topic` এখনো `"JavaScript"` হয়নি।

এখন:

```text
topic → undefined
```

---

# 10. তারপর Execution Phase

এখন JavaScript actual code execute করা শুরু করবে।

```js
var topic = "JavaScript";
```

এখন:

```text
topic → "JavaScript"
```

তারপর:

```js
function getTopic() {
  console.log(topic);
}
```

Function declaration-এর ক্ষেত্রে function আগে থেকেই environment-এ available থাকে।

তারপর:

```js
getTopic();
```

এখন নতুন একটা **Function Execution Context** তৈরি হবে।

---

# 11. সবচেয়ে important flow

পুরো process-টা এভাবে মনে রাখো:

```text
JavaScript Program
       ↓
Global Execution Context
       ↓
Creation Phase
       ↓
Variables / Functions setup
       ↓
Execution Phase
       ↓
Code runs
       ↓
Function call
       ↓
New Function Execution Context
       ↓
Function Creation Phase
       ↓
Function Execution Phase
       ↓
Function finishes
       ↓
Function Execution Context removed
```

এটাই তোমার সবচেয়ে important mental model।

---

# 12. একটা complete example

এই codeটা দেখি:

```js
var topic = "JavaScript";

function getTopic() {
  var message = "I am learning JS";

  console.log(topic);
  console.log(message);
}

getTopic();
```

এখন step-by-step।

---

## Step 1 — Global Execution Context তৈরি

```text
Global Execution Context
```

Creation Phase:

```text
topic   → undefined

getTopic → function

this → global object
```

---

# 13. Step 2 — Global Execution Phase

প্রথম line:

```js
var topic = "JavaScript";
```

এখন:

```text
topic → "JavaScript"
```

তারপর function declaration already available।

তারপর:

```js
getTopic();
```

Function call হচ্ছে।

এখন **new execution context** তৈরি হবে।

---

# 14. Step 3 — Function Execution Context

এখন:

```text
Global Execution Context
        │
        ↓
Function Execution Context
```

Function:

```js
function getTopic() {
  var message = "I am learning JS";

  console.log(topic);
  console.log(message);
}
```

Function context-এর creation phase-এ:

```text
message → undefined
```

এবং function-এর parameters থাকলে সেগুলোর bindings তৈরি হয়।

তারপর function execution শুরু।

---

# 15. Function Execution Phase

এখন:

```js
var message = "I am learning JS";
```

হয়ে গেল:

```text
message → "I am learning JS"
```

তারপর:

```js
console.log(topic);
```

`topic` function-এর local variable না।

তাহলে JavaScript কোথায় খুঁজবে?

এখানেই আসে **Scope Chain**।

---

# 16. Scope Chain কী?

Function-এর নিজের scope-এ variable না পেলে JavaScript outer scope-এ খুঁজবে।

আমাদের example:

```text
Function Execution Context
        │
        │ topic নেই
        ↓
Global Execution Context
        │
        │ topic আছে
        ↓
"JavaScript"
```

তাই:

```js
console.log(topic);
```

output:

```text
JavaScript
```

---

# 17. Scope Chain খুব সহজভাবে

ধরো:

```js
var a = 10;

function test() {
  var b = 20;

  function inner() {
    var c = 30;

    console.log(c);
    console.log(b);
    console.log(a);
  }

  inner();
}
```

`inner()`-এর context-এ:

```text
c আছে
```

তারপর outer function:

```text
b আছে
```

তারপর global:

```text
a আছে
```

তাই search:

```text
inner scope
    ↓
test scope
    ↓
global scope
```

এটাই scope chain-এর basic idea।

---

# 18. `this` নিয়ে তোমার notes-এ একটা correction

তুমি লিখেছ:

```text
Function Execution Context
this: window
```

এটা **সব ক্ষেত্রে true না**।

`this` নির্ভর করে function কীভাবে call করা হয়েছে এবং JavaScript environment কী।

Browser-এর non-strict traditional function example:

```js
function test() {
  console.log(this);
}

test();
```

এখানে `this` global object হতে পারে।

কিন্তু:

```js
"use strict";

function test() {
  console.log(this);
}

test();
```

এখানে:

```text
this → undefined
```

আর:

```js
const obj = {
  name: "Gowtam",

  test() {
    console.log(this.name);
  },
};

obj.test();
```

এখানে:

```text
this → obj
```

তাই এখন শুধু:

```text
this = window
```

মুখস্থ করো না।

বরং মনে রাখো:

> **`this` is determined by how a function is called (with important differences for arrow functions).**

---

# 19. `arguments` কী?

Function Execution Context-এর সাথে traditional function-এর parameters/arguments সম্পর্কিত information থাকে।

Example:

```js
function add(a, b) {
  console.log(arguments);
}

add(10, 20);
```

Conceptually:

```text
arguments
    ↓
0 → 10
1 → 20
```

কিন্তু arrow function-এর নিজের `arguments` binding থাকে না:

```js
const add = (a, b) => {
  console.log(arguments);
};
```

তাই `arguments`-কেও universal rule হিসেবে মনে রাখবে না।

---

# 20. এখন Hoisting বুঝো

Execution Context বুঝলে **Hoisting** অনেক সহজ হয়ে যাবে।

Example:

```js
console.log(topic);

var topic = "JavaScript";
```

Output:

```text
undefined
```

কেন?

Creation Phase-এ:

```text
topic → undefined
```

তারপর execution phase-এ:

```js
topic = "JavaScript";
```

---

# 21. Function Hoisting

```js
getTopic();

function getTopic() {
  console.log("JavaScript");
}
```

এটা কাজ করবে।

কারণ creation phase-এ function declaration-এর binding available হয়ে যায়।

Conceptually:

```text
Creation Phase:

getTopic → function
```

তারপর execution:

```js
getTopic();
```

Function execute করতে পারে।

---

# 22. `let` এবং `const` এখানে গুরুত্বপূর্ণ

এখন একটা important advanced point।

```js
console.log(topic);

let topic = "JavaScript";
```

এটা:

```text
ReferenceError
```

দেবে।

এখানে `let`/`const`-এর জন্য **Temporal Dead Zone (TDZ)** concept আসে।

তাই এই simplified model:

```text
var → undefined
let/const → TDZ
```

মনে রাখো।

---

# 23. Execution Context vs Scope

এগুলো এক জিনিস না।

### Execution Context

Code **কীভাবে execute হবে**, তার runtime environment।

### Scope

কোন জায়গা থেকে কোন variable **access করা যাবে**, সেই rule।

Example:

```js
var global = "A";

function test() {
  var local = "B";

  console.log(global);
  console.log(local);
}
```

এখানে:

```text
Execution Context
→ execution environment

Scope
→ variable accessibility rules
```

---

# 24. Execution Context vs Call Stack

এটাও খুব important।

ধরো:

```js
function one() {
  two();
}

function two() {
  three();
}

function three() {
  console.log("Hello");
}

one();
```

Call হলে stack conceptually:

```text
        ┌──────────────┐
        │ three()      │
        ├──────────────┤
        │ two()        │
        ├──────────────┤
        │ one()        │
        ├──────────────┤
        │ Global       │
        └──────────────┘
```

প্রতিটি function call-এর জন্য execution context তৈরি হয় এবং call stack execution order manage করে।

---

# 25. Function শেষ হলে কী হয়?

```js
function test() {
  var x = 10;
}

test();
```

Flow:

```text
Global Context
      ↓
test() called
      ↓
Function Context created
      ↓
x = 10
      ↓
function finished
      ↓
Function Context removed from call stack
```

তবে এখানে একটা advanced বিষয় আছে:

যদি কোনো closure variable-কে ধরে রাখে, তাহলে সেই variable-এর environment সাধারণভাবে পুরোপুরি garbage collected নাও হতে পারে।

এটা পরে **Closure** শেখার সময় বুঝবে।

---

# 26. তোমার original notes কীভাবে ঠিক করবে

তোমার:

```text
js code jokhon compiled korer somy small small vag kore fale
ai small small vag bole execution context
```

এটা ঠিক না।

এভাবে লিখো:

```text
JavaScript program execute করার সময়
JavaScript engine execution-এর জন্য
different execution contexts তৈরি করে।

Main types:
1. Global Execution Context
2. Function Execution Context
3. Eval Execution Context
```

আর:

```text
Execution Context ≠ code-এর small small ভাগ
```

---

# 27. তোমার জন্য Final Mental Model

এটা মুখস্থ করার দরকার নেই—বারবার diagramটা দেখবে:

```text
                JavaScript Code
                       │
                       ▼
               JavaScript Engine
                       │
                       ▼
                   Parse Code
                       │
                       ▼
             Global Execution Context
                       │
              ┌────────┴────────┐
              ▼                 ▼
       Creation Phase     Execution Phase
              │                 │
              │                 ▼
              │           Code executes
              │                 │
              │                 ▼
              │           Function Call
              │                 │
              │                 ▼
              │       Function Execution Context
              │                 │
              │          ┌──────┴──────┐
              │          ▼             ▼
              │    Creation Phase  Execution Phase
              │          │             │
              │          │             ▼
              │          │       Function runs
              │          │             │
              │          │             ▼
              │          │      Function finishes
              │          │             │
              │          └─────────────┘
              │
              ▼
         Scope / Scope Chain
              │
              ▼
       Variable lookup
```

---

# 28. এই order-এ শিখলে সবচেয়ে ভালো হবে

তুমি যেহেতু JavaScript/Node.js backend developer, **Execution Context** শেখার পরে এই sequence follow করো:

```text
1. JavaScript Engine
       ↓
2. Interpreter vs Compiler vs JIT
       ↓
3. Execution Context
       ↓
4. Global Execution Context
       ↓
5. Creation Phase
       ↓
6. Execution Phase
       ↓
7. Hoisting
       ↓
8. Scope
       ↓
9. Scope Chain
       ↓
10. Lexical Environment
       ↓
11. Call Stack
       ↓
12. Execution Context + Call Stack
       ↓
13. Closure
       ↓
14. this
       ↓
15. Event Loop
       ↓
16. Microtask Queue
       ↓
17. Macrotask/Task Queue
       ↓
18. Async JavaScript
       ↓
19. Promise
       ↓
20. async/await
```

**বিশেষ করে 3 → 7 → 8 → 9 → 11 → 13 → 15** এই sequence-টা ভালোভাবে বুঝলে JavaScript-এর ভিতরের mechanism অনেক পরিষ্কার হয়ে যাবে।

সবচেয়ে গুরুত্বপূর্ণ কথা: **তোমার বর্তমান notes পুরো ভুল না**, কিন্তু `Execution Context`, `Creation/Execution Phase`, `Scope Chain`, `Call Stack`, আর `JIT`—এই পাঁচটা concept একসাথে মিশে গেছে। এগুলো আলাদা করে শিখলেই confusion চলে যাবে।

হ্যাঁ। তাহলে এবার **JIT, interpreter, compiler—এসব আপাতত পাশে রাখি**। শুধু একটা জিনিস বুঝি:

> **JavaScript-এ Execution Context আসলে কীভাবে তৈরি হয় এবং code run করার সময় কীভাবে কাজ করে।**

এটা বুঝতে হলে একটা code ধরে **engine-এর ভিতরে কী ঘটছে সেটা step-by-step trace** করতে হবে।

---

# 1. প্রথমে এই definition-টা মাথায় বসাও

**Execution Context = JavaScript code execute করার জন্য তৈরি হওয়া একটি environment।**

এই environment-এর মধ্যে JavaScript জানতে পারে:

- কোন variable কোথায় আছে
- কোন function available
- `this` কী
- outer scope কোথায়
- function-এর arguments কী
- কোন code এখন execute হচ্ছে

তুমি এটাকে একটা **"execution workspace"** হিসেবে ভাবতে পারো।

---

# 2. একটা খুব ছোট code নিই

```js
var name = "Gowtam";

function sayHello() {
  var message = "Hello";

  console.log(message);
  console.log(name);
}

sayHello();
```

এখন আমরা **প্রতিটা step engine-এর perspective থেকে দেখব।**

---

# 3. Program শুরু হলো

JavaScript engine code পেল:

```js
var name = "Gowtam";

function sayHello() {
  var message = "Hello";

  console.log(message);
  console.log(name);
}

sayHello();
```

এখন engine বলবে:

> "এই code execute করার জন্য আমার একটা environment দরকার।"

তাই তৈরি হবে:

```text
Global Execution Context
```

---

# 4. Global Execution Context তৈরি হলো

এখন খুব গুরুত্বপূর্ণ:

Global Execution Context তৈরি হওয়ার সময় JavaScript **সাথে সাথে সব line execute করে না।**

প্রথমে execution-এর জন্য environment প্রস্তুত করে।

এটাকে আমরা শেখার সুবিধার জন্য দুই phase-এ ভাগ করি:

```text
Global Execution Context

        ↓

Creation Phase

        ↓

Execution Phase
```

---

# 5. Creation Phase-এ কী হয়?

আমাদের code:

```js
var name = "Gowtam";

function sayHello() {
    ...
}
```

Engine দেখে:

### Variable আছে

```js
var name;
```

তাই একটা binding/environment entry তৈরি করে।

Conceptually:

```text
name → undefined
```

### Function আছে

```js
function sayHello() {}
```

Function declaration-এর জন্য function binding তৈরি হয়।

Conceptually:

```text
sayHello → function
```

তাহলে এখন Global Environment-এর একটা simplified picture:

```text
Global Execution Context

┌─────────────────────────────┐
│ name     → undefined        │
│ sayHello → function         │
│ this      → global context  │
└─────────────────────────────┘
```

**এখনও `"Gowtam"` assign হয়নি।**

---

# 6. এবার Execution Phase শুরু

Engine এখন code line-by-line execute করতে শুরু করে।

প্রথম:

```js
var name = "Gowtam";
```

Creation phase-এ ছিল:

```text
name → undefined
```

Execution phase-এ assignment হলো:

```text
name → "Gowtam"
```

---

# 7. এরপর function declaration?

এইটা:

```js
function sayHello() {
    ...
}
```

Creation phase-এই function binding তৈরি হয়ে গেছে।

তাই execution phase-এ এই declaration-এর কারণে আবার function তৈরি করার মতো করে line-by-line কাজ করার দরকার নেই।

এখন environment:

```text
Global Execution Context

name     → "Gowtam"
sayHello → function
```

---

# 8. এবার সবচেয়ে important line

```js
sayHello();
```

এখানে কী হচ্ছে?

আমরা **function call** করছি।

JavaScript বলবে:

> "ঠিক আছে, `sayHello()` execute করতে হবে। এর জন্য একটা নতুন execution context দরকার।"

তাই:

```text
Global Execution Context
          ↓
Function Execution Context
```

তৈরি হয়।

---

# 9. Function Execution Context কী?

এখন `sayHello()`-এর জন্য নতুন একটা workspace তৈরি হলো।

```text
sayHello() Execution Context
```

Function:

```js
function sayHello() {
  var message = "Hello";

  console.log(message);
  console.log(name);
}
```

এর নিজের variable:

```js
var message;
```

তাই Creation Phase-এ:

```text
message → undefined
```

---

# 10. এখন Function Execution Context

Conceptually:

```text
Function Execution Context

┌─────────────────────────────┐
│ message → undefined         │
│ arguments → ...             │
│ this → ...                  │
│ outer scope → Global        │
└─────────────────────────────┘
```

এখানে একটা খুব গুরুত্বপূর্ণ জিনিস দেখো:

```text
outer scope → Global
```

এই connection-এর কারণেই function-এর ভিতর থেকে আমরা global variable access করতে পারি।

---

# 11. Function Execution Phase শুরু

এখন function-এর ভিতরের প্রথম line:

```js
var message = "Hello";
```

Creation phase-এ:

```text
message → undefined
```

Execution phase-এ:

```text
message → "Hello"
```

এখন:

```text
Function Context

message → "Hello"
```

---

# 12. এবার এই line

```js
console.log(message);
```

JavaScript `message` খুঁজবে।

প্রথমে কোথায়?

```text
Current Function Execution Context
```

সেখানে আছে:

```text
message → "Hello"
```

তাই output:

```text
Hello
```

---

# 13. এবার আসল magic

পরের line:

```js
console.log(name);
```

Function-এর ভিতরে কি `name` আছে?

না।

Function context:

```text
message → "Hello"
name    → ❌ নেই
```

তাহলে JavaScript কী করবে?

এখানে আসে **Scope Chain / Lexical Environment**।

JavaScript outer environment-এ যাবে।

```text
Function Context
      ↓
Global Environment
```

Global-এ আছে:

```text
name → "Gowtam"
```

তাই:

```text
Gowtam
```

output হবে।

---

# 14. পুরো ব্যাপারটা একসাথে দেখো

```text
                    JavaScript Program
                           │
                           ▼
                Global Execution Context
                           │
              ┌────────────┴────────────┐
              │                         │
        Creation Phase            Execution Phase
              │                         │
              ▼                         ▼
      name → undefined          name = "Gowtam"
      sayHello → function              │
                                       ▼
                                sayHello() called
                                       │
                                       ▼
                          Function Execution Context
                                       │
                              ┌────────┴────────┐
                              │                 │
                         Creation          Execution
                              │                 │
                              ▼                 ▼
                      message → undefined   message="Hello"
                                                │
                                                ▼
                                         console.log(message)
                                                │
                                                ▼
                                             "Hello"
                                                │
                                                ▼
                                         console.log(name)
                                                │
                                                ▼
                                      name নেই function-এ
                                                │
                                                ▼
                                      Outer/Global scope
                                                │
                                                ▼
                                          name="Gowtam"
                                                │
                                                ▼
                                            "Gowtam"
```

**এটাই Execution Context-এর actual flow-এর core idea।**

---

# 15. এখন Call Stack যোগ করো

আরেকটা জিনিস আছে—**Call Stack**।

Execution Context আর Call Stack এক জিনিস না।

Function call হলে execution context তৈরি হয় এবং execution track করার জন্য call stack ব্যবহার হয়।

শুরুতে:

```text
Call Stack

┌──────────────────┐
│ Global Context   │
└──────────────────┘
```

তারপর:

```js
sayHello();
```

call হলো।

Stack:

```text
┌──────────────────┐
│ sayHello()       │
├──────────────────┤
│ Global Context   │
└──────────────────┘
```

Function শেষ হলে:

```text
┌──────────────────┐
│ Global Context   │
└──────────────────┘
```

`Function Execution Context` আর active নেই।

---

# 16. Nested function হলে আরও পরিষ্কার হবে

এবার:

```js
var a = 10;

function one() {
  var b = 20;

  function two() {
    var c = 30;

    console.log(a);
    console.log(b);
    console.log(c);
  }

  two();
}

one();
```

এখন execution contexts:

```text
Global
  │
  ▼
one()
  │
  ▼
two()
```

Call stack:

```text
┌─────────────────┐
│ two()           │
├─────────────────┤
│ one()           │
├─────────────────┤
│ Global          │
└─────────────────┘
```

আর variable lookup:

```text
two()
 │
 ├── c আছে
 │
 └── c না পেলে → one()
                    │
                    ├── b আছে
                    │
                    └── b না পেলে → Global
                                      │
                                      └── a আছে
```

এই জায়গাটা বুঝতে পারলে **Scope Chain + Execution Context** অনেকটাই clear হয়ে যাবে।

---

# 17. সবচেয়ে গুরুত্বপূর্ণ correction

তুমি আগে বলেছিলে:

> "JS code compiled করার সময় small small ভাগ করে ফেলে, এই small small ভাগকে execution context বলে"

❌ এটা ঠিক না।

বরং:

```text
Execution Context
=
Code execute করার জন্য JavaScript-এর তৈরি করা environment
```

আর function call হলে:

```text
Function Call
      ↓
New Function Execution Context
      ↓
Function executes
      ↓
Function returns
      ↓
Context no longer active
```

---

# 18. Creation Phase-এ আসলে কী কী মনে রাখবে?

Beginner হিসেবে এই simplified model যথেষ্ট:

### Global Context

```text
Creation Phase:

Variables → initialized/bindings prepared
Functions → available
this → established
Outer/global environment → established
```

### Function Context

```text
Creation Phase:

Parameters → prepared
Local variables → prepared
Function declarations → prepared
this → determined
arguments → available for traditional functions
Outer environment reference → established
```

তারপর:

```text
Execution Phase
```

এ actual statements execute হয়।

---

# 19. `let` / `const` এলে

এখানে পরে TDZ আসবে।

```js
console.log(a);

let a = 10;
```

Creation phase-এ `a`-র binding তৈরি হয়, কিন্তু initialization না হওয়া পর্যন্ত access করা যায় না।

তাই:

```text
let/const
    ↓
Binding exists
    ↓
Not initialized
    ↓
TDZ
    ↓
let a = 10
    ↓
Initialized
```

এটা পরে আলাদাভাবে গভীরভাবে শিখবে।

---

# 20. এখন Execution Context-এর সবচেয়ে সুন্দর definition

তুমি নিজের notebook-এ এটা লিখতে পারো:

> **Execution Context is the environment created by the JavaScript engine to manage and execute a piece of JavaScript code. It contains the information required to execute that code, such as variable bindings, function declarations, `this`, arguments, and references to outer environments.**

আর process:

```text
Execution Context
       ↓
Creation Phase
       ↓
Environment prepared
       ↓
Execution Phase
       ↓
Code executes
       ↓
Function call?
       ↓
New Function Execution Context
       ↓
Function completes
       ↓
Context is no longer active
```

### একটা জিনিস খুব ভালোভাবে মাথায় রাখো

**Execution Context = "কোড কোথায় এবং কোন information নিয়ে execute হচ্ছে"**

**Scope = "কোন variable কোথা থেকে access করা যাবে"**

**Call Stack = "এই মুহূর্তে কোন execution কোথার পরে চলছে"**

**JIT = "JavaScript engine কীভাবে code-কে efficiently execute/optimize করতে পারে"**

এই চারটা আলাদা concept। এগুলো একসাথে মিশে যাওয়াটাই তোমার বর্তমান confusion-এর মূল কারণ।
