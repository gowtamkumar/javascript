# Phase 1: Core AI Concepts & Prompt Engineering (A to Z Guide)

> **লক্ষ্য:** একজন JavaScript/TypeScript ডেভেলপার হিসেবে Generative AI-এর ফান্ডামেন্টাল কনসেপ্ট এবং Prompt Engineering-এর A to Z বিস্তারিত জানা, যাতে অন্য কোনো রিসোর্স খোঁজা ছাড়াই আপনি প্রোডাকশন-লেভেলের প্রম্পট ডিজাইন করতে পারেন।

---

## সূচিপত্র (Table of Contents)
1. [Generative AI এবং LLM কী এবং কীভাবে কাজ করে?](#১-generative-ai-এবং-llm-কী-এবং-কীভাবে-কাজ-করে)
2. [LLM-এর মূল পরিভাষা ও প্যারামিটারসমূহ (Must-Know Parameters)](#২-llm-এর-মূল-পরিভাষা-ও-প্যারামিটারসমূহ)
3. [Message Architecture & Roles (System, User, Assistant)](#৩-message-architecture--roles)
4. [Prompt Engineering কী এবং কেন এত গুরুত্বপূর্ণ?](#৪-prompt-engineering-কী-এবং-কেন-এত-গুরুত্বপূর্ণ)
5. [Anatomy of a Perfect Prompt (একটি আদর্শ প্রম্পটের গঠন)](#৫-anatomy-of-a-perfect-prompt)
6. [Core Prompting Techniques (বাস্তব উদাহরণসহ)](#৬-core-prompting-techniques)
   - Zero-shot Prompting
   - Few-shot Prompting
   - Chain-of-Thought (CoT) Prompting
   - Generated Knowledge / Step-Back Prompting
7. [Structured Outputs (JSON Mode) - JS ডেভেলপারদের জন্য সুপার পাওয়ার](#৭-structured-outputs-json-mode)
8. [JS ডেভেলপারদের জন্য বাস্তব জীবনের প্রম্পট প্যাটার্নস](#৮-js-ডেভেলপারদের-জন্য-বাস্তব-জীবনের-প্রম্পট-প্যাটার্নস)
9. [Prompt Pitfalls, Hallucination এবং এগুলো প্রতিরোধের উপায়](#৯-prompt-pitfalls-ও-hallucination-প্রতিরোধ)
10. [Prompt Engineering Quick Cheat Sheet](#১০-prompt-engineering-quick-cheat-sheet)

---

## ১. Generative AI এবং LLM কী এবং কীভাবে কাজ করে?

### ১.১ Traditional AI বনাম Generative AI
- **Traditional (Discriminative) AI:** ডেটা ক্লাসিফাই বা প্রেডিক্ট করে। উদাহরণ: স্প্যাম ডিটেক্টর (ইমেইলটি স্প্যাম নাকি স্প্যাম না)।
- **Generative AI:** নতুন কনটেন্ট তৈরি (Generate) করে—যেমন নতুন টেক্সট, কোড, ইমেজ বা অডিও।

### ১.২ LLM (Large Language Model) কী?
LLM হলো ডিপ লার্নিং (প্রধানত **Transformer Architecture**) মডেল, যা ইন্টারনেটের ট্রিলিয়ন ট্রিলিয়ন টেক্সট টোকেনের ওপর ট্রেইন করা হয়েছে।

### ১.৩ LLM কীভাবে কাজ করে? (Next Token Prediction)
LLM কোনো মানুষের মতো "চিন্তা" করে না। এর মূল কাজ একটাই: **"আগের শব্দের ওপর ভিত্তি করে পরবর্তী সম্ভাব্য সবচেয়ে মানানসই শব্দটি (টোকেন) অনুমান করা।"**

```
ইনপুট: "JavaScript is a programming..."
মডেল প্রেডিকশন: "language" (৯৮% সম্ভাবনা), "tool" (১% সম্ভাবনা)
```

### ১.৪ LLM ট্রেইনিং-এর ৩টি ধাপ:
1. **Pre-training:** বিশাল আনলেবেলড টেক্সট ডেটা দিয়ে সাধারণ ভাষা ও ব্যাকরণ শেখানো (Raw Base Model তৈরি হয়)।
2. **Instruction Fine-Tuning (SFT):** প্রশ্ন-উত্তরের ফরম্যাটে মডেলকে কোনো নির্দেশ মানা শেখানো।
3. **RLHF (Reinforcement Learning from Human Feedback):** মানুষের ফিডব্যাকের মাধ্যমে মডেলকে হেল্পফুল, সত্যবাদী এবং নিরাপদ (Helpful, Honest, Harmless) করে তোলা।

---

## ২. LLM-এর মূল পরিভাষা ও প্যারামিটারসমূহ

JavaScript API বা SDK কল করার সময় এই কনফিগারেশনগুলো আপনাকে কনট্রোল করতে হয়:

```javascript
const config = {
  temperature: 0.2,
  topP: 0.95,
  maxOutputTokens: 1000,
  stopSequences: ["\n---"],
};
```

| প্যারামিটার | কাজ ও বর্ণনা | JS প্রজেক্টে কখন কী মান দেবেন? |
| :--- | :--- | :--- |
| **Tokens** | শব্দের অংশ বা অক্ষরের সমষ্টি। গড়ে ১ টোকেন ≈ ৩/৪ টি ক্যারেক্টার বা ০.৭৫ টি ইংরেজি শব্দ। বাংলায় টোকেন বেশি খরচ হয়। | প্রাইসিং এবং কনটেক্সট লিমিট হিসাব করতে ব্যবহৃত হয়। |
| **Context Window** | মডেল একবারে ইনপুট ও আউটপুট মিলিয়ে সর্বোচ্চ যত টোকেন মনে রাখতে পারে (যেমন: Gemini 1.5 Pro-তে 2M টোকেন, GPT-4o-তে 128k টোকেন)। | পুরো কোডবেস বা বড় ফাইল পাঠানোর সময় কনটেক্সট উইন্ডো খেয়াল রাখতে হয়। |
| **Temperature** (0.0 to 2.0) | উত্তরের সৃজনশীলতা (Randomness) নিয়ন্ত্রণ করে। `0` দিলে একদম deterministic ও ফোকাসড উত্তর দেবে; `1` এর বেশি দিলে সৃজনশীল ও ভিন্ন ভিন্ন উত্তর দেবে। | **কোডিং, JSON আউটপুট, ডাটা পার্সিং-এ:** `0.0` থেকে `0.2`<br>**ব্লগ, আইডিয়া জেনারেশনে:** `0.7` থেকে `1.0` |
| **Top-P (Nucleus Sampling)** | সর্বোচ্চ সম্ভাবনাময় টোকেনগুলোর মোট সম্ভাবনার শতাংশ ফিল্টার করে। যেমন `0.9` মানে টপ ৯০% সম্ভাব্য শব্দ থেকে বাছাই করবে। | সাধারণত `0.9` থেকে `0.95` রাখা ভালো। |
| **Max Output Tokens** | মডেলের জেনারেট করা সর্বোচ্চ টোকেন সংখ্যা। | অপ্রয়োজনীয় দীর্ঘ উত্তর এবং অতিরিক্ত বিল রোধ করতে লিমিট সেট করবেন। |
| **Stop Sequences** | নির্দিষ্ট কোনো স্ট্রিং বা ক্যারেক্টার আসলে মডেল লেখা বন্ধ করে দেবে (যেমন: `["User:", "END"]`)। | চ্যাটবট ও নির্দিষ্ট ফরম্যাটে থামানোর জন্য। |

---

## ৩. Message Architecture & Roles

মডার্ন চ্যাট এপিআইগুলোতে ৩টি প্রধান রোল (Role) থাকে:

```javascript
const messages = [
  {
    role: "system",
    content: "You are an expert JavaScript Code Reviewer. Be strict, concise, and highlight performance issues."
  },
  {
    role: "user",
    content: "Review this function: function add(a, b) { return a + b; }"
  },
  {
    role: "assistant",
    content: "The function is syntactically valid. However, since JavaScript is dynamically typed, adding input validation for numbers is recommended."
  }
];
```

1. **System Prompt (Developer Message):**
   - মডেলের ব্যক্তিত্ব, নিয়মকানুন, আচরণ, সীমাবদ্ধতা এবং আউটপুট ফরম্যাট নির্ধারণ করে।
   - ইউজার সাধারণত সরাসরি এটি পরিবর্তন করতে পারে না।
2. **User Prompt:**
   - ব্যবহারকারীর প্রশ্ন, ইনপুট ডেটা বা কাজের নির্দেশ।
3. **Assistant Prompt:**
   - এআই-এর পূর্ববর্তী উত্তর। চ্যাট হিস্ট্রি বজায় রাখার জন্য এটি পাঠানো হয়।

---

## ৪. Prompt Engineering কী এবং কেন এত গুরুত্বপূর্ণ?

> **Prompt Engineering** হলো এমন একটি আর্ট ও সায়েন্স, যার মাধ্যমে এআই মডেলকে এমন সুনির্দিষ্ট, প্রাসঙ্গিক ও কার্যকরী নির্দেশ দেওয়া হয় যেন মডেলটি ন্যূনতম টোকেন খরচে নির্ভুল ও কাঙ্ক্ষিত ফলাফল দেয়।

### কেন JS ডেভেলপারদের জন্য এটি জরুরি?
- **Garbage In, Garbage Out:** ভুল নির্দেশ দিলে মডেল উল্টাপাল্টা (Hallucinated) উত্তর দেবে।
- **API বিল নিয়ন্ত্রণ:** স্পষ্ট প্রম্পট লিখলে অপ্রয়োজনীয় কথোপকথন ছাড়াই একবারে সঠিক উত্তর পাওয়া যায়।
- **প্রোগ্রামেবল ডেটা আউটপুট:** আপনার নোড বা ব্রাউজার অ্যাপ্লিকেশনের জন্য পারফেক্ট JSON ডেটা পাওয়ার চাবিকাঠি হলো ভালো প্রম্পটিং।

---

## ৫. Anatomy of a Perfect Prompt

একটি প্রোডাকশন-গ্রেড প্রম্পটের মূল উপাদানগুলো নিচের মতো সাজানো উচিত:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. PERSONA / ROLE     : তুমি কে?                            │
│ 2. CONTEXT / BACKGROUND: পেছনের প্রেক্ষাপট কী?                │
│ 3. TASK / INSTRUCTION : সুনির্দিষ্টভাবে কী করতে হবে?          │
│ 4. INPUT DATA         : যার ওপর কাজ করতে হবে (কোড/টেক্সট)   │
│ 5. CONSTRAINTS / RULES: কী কী করা যাবে না বা সীমাবদ্ধতা     │
│ 6. OUTPUT FORMAT      : উত্তরটি দেখতে কেমন হবে? (JSON/MD)     │
└─────────────────────────────────────────────────────────────┘
```

### পূর্ণাঙ্গ উদাহরণ:
```markdown
### ROLE
You are a Senior TypeScript Backend Engineer with deep expertise in Node.js and Express.

### CONTEXT
We are building a production REST API for an eCommerce payment service.

### TASK
Convert the provided raw JavaScript function into a clean, strictly-typed TypeScript function with proper error handling.

### INPUT DATA
```javascript
async function chargeUser(userId, amount) {
  const user = await db.getUser(userId);
  return stripe.charges.create({ customer: user.stripeId, amount });
}
```

### CONSTRAINTS
- Do NOT use `any` type.
- Wrap operations in a `try...catch` block.
- Return a typed response object `{ success: boolean, data?: Charge, error?: string }`.
- Do NOT include any conversational filler (e.g. "Here is your code:").

### OUTPUT FORMAT
Provide only the TypeScript code block followed by a brief bullet-point summary of changes.
```

---

## ৬. Core Prompting Techniques

### ৬.১ Zero-shot Prompting
মডেলকে কোনো উদাহরণ ছাড়াই সরাসরি টাস্ক দেওয়া।
```text
Classify the sentiment of this customer review as positive, neutral, or negative:
"The checkout page kept crashing when I entered my card details."
```

### ৬.২ Few-shot Prompting (In-context Learning)
মডেলকে নির্দেশ দেওয়ার পাশাপাশি ১টি বা একাধিক সঠিক উত্তরের উদাহরণ (Input ➔ Output) দেখানো। এটি জটিল লজিক বা কাস্টম আউটপুট ফরম্যাটিং-এর ক্ষেত্রে অত্যন্ত কার্যকর।

```text
Classify support tickets into department and priority:

Ticket: "I was double charged on my invoice #1234."
Category: Billing | Priority: High

Ticket: "How do I invite teammates to my dashboard?"
Category: Product Support | Priority: Low

Ticket: "The production API server is throwing 500 error on all POST requests."
Category:
```
*(মডেল স্বয়ংক্রিয়ভাবে বুঝবে: `Category: DevOps/Engineering | Priority: Critical`)*

### ৬.৩ Chain-of-Thought (CoT) Prompting
জটিল গাণিতিক হিসাব বা লজিক্যাল রিজনিং-এর ক্ষেত্রে মডেলকে সরাসরি উত্তরে না গিয়ে **ধাপে ধাপে চিন্তা (Step-by-step thinking)** করতে বলা।

- **ম্যাজিক লাইন:** `"Think step-by-step before arriving at the final answer."`

```text
Problem: A node server has 8GB RAM. Node.js process takes 1.5GB base memory. Each connected WebSocket client consumes 2MB of memory. How many concurrent clients can the server handle safely, leaving 2GB free for OS?

Let's think step by step:
```

### ৬.৪ Generated Knowledge / Step-Back Prompting
আগে বিষয়টির মূল কনসেপ্ট জেনারেট করানো, তারপর সেই কনসেপ্টের ওপর ভিত্তি করে প্রশ্নের উত্তর দেওয়া।

---

## ৭. Structured Outputs (JSON Mode)

একজন JavaScript ডেভেলপারের জন্য এটি সবচেয়ে গুরুত্বপূর্ণ অংশ। কারণ ফ্রন্টএন্ড বা ব্যাকএন্ডে এআই রেসপন্স হ্যান্ডেল করতে হলে আমাদের **JSON** দরকার।

### প্রম্পটে JSON পাওয়ার নিয়ম:
1. সবসময় প্রম্পটে JSON Schema উল্লেখ করবেন।
2. মডেলকে বলে দেবেন শুধু Raw JSON পাঠাতে, কোনো Markdown কোটেশন (` ```json `) ছাড়া (যদি API-র native json mode সাপোর্ট না থাকে)।
3. Temperature `0.0` রাখবেন।

```markdown
### TASK
Extract the user details from the text below.

### INPUT TEXT
"My name is Rahat Hasan, email: rahat@example.com, and I live in Dhaka, Bangladesh. I work as a React Developer."

### JSON SCHEMA
{
  "name": "string",
  "email": "string",
  "location": {
    "city": "string",
    "country": "string"
  },
  "role": "string"
}

### RULE
Return ONLY a valid JSON object matching the schema above. Do not include markdown tags or explanations.
```

---

## ৮. JS ডেভেলপারদের জন্য বাস্তব জীবনের প্রম্পট প্যাটার্নস

### প্যাটার্ন ১: TypeScript Type Generator
```markdown
Generate strict TypeScript interfaces based on the following API JSON response.
- Use PascalCase for interface names.
- Make optional fields nullable if they contain null in the sample.
- Add JSDoc comments describing each property.
```

### প্যাটার্ন ২: Regex Generator with Edge Cases
```markdown
You are a Regex specialist.
Write a JavaScript-compatible regular expression to validate a Bangladeshi mobile phone number (operators: Grameenphone, Robi, Banglalink, Teletalk).
Include 3 positive test cases and 3 negative test cases in an array format.
```

### প্যাটার্ন ৩: Safe SQL/Prisma Query Generator
```markdown
Given the following Prisma Schema models [Users, Orders, Products], write an optimized query to find the top 5 highest-spending users in the last 30 days.
Include indexing suggestions for database optimization.
```

---

## ৯. Prompt Pitfalls ও Hallucination প্রতিরোধ

| সমস্যা | কেন হয়? | কীভাবে প্রতিরোধ করবেন? |
| :--- | :--- | :--- |
| **Hallucination** (বানানো/ভুল তথ্য) | উত্তরের উৎস না থাকলে মডেল নিজ থেকে বানিয়ে উত্তর দেয়। | প্রম্পটে লিখে দিন: *"Answer only based on the provided text. If you don't know the answer, say 'Information not available'."* |
| **Ambiguity** (অস্পষ্টতা) | প্রম্পটে স্পষ্টতা না থাকা (যেমন: "Make this code good") | সুনির্দিষ্ট কনস্ট্রেইন্ট দেওয়া (যেমন: "Optimize memory complexity to O(1) and add error handling") |
| **Prompt Injection** (হ্যাকিং) | বাইরের কোনো ইউজার ক্ষতিকর ইনপুট দিয়ে সিস্টেম প্রম্পট পরিবর্তন করার চেষ্টা করে। | ইউজার ইনপুটকে Delimiter (যেমন: `"""` বা `<user_input>`) দিয়ে আবদ্ধ করা এবং ইনপুট স্যানিটাইজ করা। |

---

## ১০. Prompt Engineering Quick Cheat Sheet

| উদ্দেশ্য | কার্যকর প্রম্পটিং টিপস |
| :--- | :--- |
| 🎯 **নির্ভুলতা** | স্পষ্ট Role দিন + Temperature `0.0` বা `0.1` রাখুন। |
| 🧩 **জটিল লজিক** | "Think step-by-step" লিখুন বা Few-shot উদাহরণ দিন। |
| 📦 **API ইন্টিগ্রেশন** | JSON Schema দিন + JSON Mode অন রাখুন। |
| 🛑 **বাজে বকবক বন্ধ করা** | "Do not include any greeting, markdown intro, or closing remarks." |
| 🛡️ **ইনজেকশন সুরক্ষা** | ইউজার ইনপুটকে `<input>...</input>` ট্যাগের ভেতরে রাখুন। |

---

> 💡 **পরবর্তী প্র্যাকটিস:** এই ফোল্ডারে থাকা `demo-prompt.js` ফাইলটি চালিয়ে দেখুন কীভাবে Node.js-এ এই প্রম্পটিং টেকনিকগুলো প্রোগ্রামেটিকভাবে কাজ করে।
