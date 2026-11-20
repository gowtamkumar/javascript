# Phase 4: RAG (Retrieval-Augmented Generation) & LangChain.js (A to Z Guide)

> **লক্ষ্য:** একজন JavaScript / Node.js ডেভেলপার হিসেবে RAG আর্কিটেকচারের শুরু থেকে শেষ (A to Z) আয়ত্ত করা, RAG বনাম Fine-Tuning এর পার্থক্য বোঝা, এবং **LangChain.js** (LCEL) ফ্রেমওয়ার্ক দিয়ে প্রোডাকশন-লেভেলের নলেজবেজ চ্যাটবট ও প্রশ্ন-উত্তর সিস্টেম তৈরি করা।

---

## সূচিপত্র (Table of Contents)
1. [RAG কী এবং কেন এটি আধুনিক AI-এর প্রাণকেন্দ্র?](#১-rag-কী-এবং-কেন-এটি-আধুনিক-ai-এর-প্রাণকেন্দ্র)
2. [RAG বনাম Fine-Tuning: বাস্তব জীবনের তুলনা ও সিদ্ধান্ত গাইড](#২-rag-বনাম-fine-tuning)
3. [RAG আর্কিটেকচারের ৩টি মূল ধাপ (Ingestion, Retrieval, Generation)](#৩-rag-আর্কিটেকচারের-৩টি-মূল-ধাপ)
4. [Document Chunking এবং টেক্সট স্প্লিটিং-এর বিজ্ঞান](#৪-document-chunking-এবং-টেক্সট-স্প্লিটিং)
5. [LangChain.js কী এবং কেন ব্যবহার করবেন?](#৫-langchainjs-কী-এবং-কেন-ব্যবহার-করবেন)
6. [LCEL (LangChain Expression Language) - পাইপলাইন রচনার মডার্ন উপায়](#৬-lcel-langchain-expression-language)
7. [LangChain.js এর মূল উপাদানসমূহ (Components)](#৭-langchainjs-এর-মূল-উপাদানসমূহ)
8. [এন্ড-টু-এন্ড RAG পাইপলাইন কোড (Vanilla JS vs LangChain.js)](#৮-এন্ড-টু-এন্ড-rag-পাইপলাইন)
9. [Conversational RAG (চ্যাট হিস্ট্রিসহ প্রশ্ন রি-ফ্রেমিং)](#৯-conversational-rag)
10. [RAG ট্রাবলশুটিং ও হ্যালুসিনেশন প্রতিরোধ](#১০-rag-ট্রাবলশুটিং-ও-হ্যালুসিনেশন-প্রতিরোধ)

---

## ১. RAG কী এবং কেন এটি আধুনিক AI-এর প্রাণকেন্দ্র?

LLM (যেমন GPT-4 বা Gemini) চমৎকার লিখতে পারলেও তাদের ২টি মারাত্মক সীমাবদ্ধতা আছে:
1. **Knowledge Cutoff:** মডেলের কাছে শুধু ট্রেনিং শেষ হওয়ার তারিখ পর্যন্ত তথ্য থাকে।
2. **Private Data Absence:** আপনার কোম্পানির অভ্যন্তরীণ পলিসি, কাস্টমার রেকর্ড, অথবা নতুন কোনো সফটওয়্যার ডকের অ্যাক্সেস মডেলের থাকে না।

এ অবস্থায় মডেলকে প্রাইভেট তথ্য নিয়ে প্রশ্ন করলে সে ভুল বা বানানো উত্তর (**Hallucination**) দেয়।

> **RAG (Retrieval-Augmented Generation)** হলো এমন একটি কৌশল, যেখানে ব্যবহারকারীর প্রশ্নের ওপর ভিত্তি করে প্রথমে একটি নলেজবেজ (ভেক্টর ডিবি / পোস্টগ্রেস) থেকে সবচেয়ে প্রাসঙ্গিক তথ্য খুঁজে বের করা হয় (**Retrieve**), এবং সেই তথ্যটিকে প্রম্পটের কনটেক্সট হিসেবে যুক্ত করে LLM-কে উত্তর তৈরি করতে দেওয়া হয় (**Generate**)।

```
[ইউজার প্রশ্ন] ➔ [ভেক্টর ডিবি থেকে প্রাসঙ্গিক তথ্য সংগ্রহ] ➔ [কনটেক্সট + প্রশ্ন LLM-এ পাঠানো] ➔ [নির্ভুল উত্তর]
```

---

## ২. RAG বনাম Fine-Tuning

ইন্টারভিউতে বা রিয়েল প্রজেক্ট আর্কিটেকচারে সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্ন: *"আমাদের কি RAG করা উচিত নাকি মডেল Fine-Tune করা উচিত?"*

| বৈশিষ্ট্যের মানদণ্ড | RAG (Retrieval-Augmented Generation) | Fine-Tuning (মডেলের ওজন পরিবর্তন) |
| :--- | :--- | :--- |
| **মূল উদ্দেশ্য** | **নতুন জ্ঞান বা তথ্য (Knowledge)** মডেলে যোগ করা। | মডেলের **আচরণ, ভাষা, স্টাইল বা নির্দিষ্ট ফরম্যাট (Style/Format)** শেখানো। |
| **ডেটা আপডেট** | **রিয়েল-টাইম!** ডাটাবেজে নতুন রো ইনসার্ট করলেই সাথে সাথে মডেল তা জানে। | সময়সাপেক্ষ। ডেটা পরিবর্তন হলে পুনরায় মডেল ট্রেইন করতে হয়। |
| **খরচ ও রিসোর্স** | অনেক কম (সাধারণ ভেক্টর ডাটাবেজ + এপিআই কল)। | অত্যন্ত ব্যয়বহুল (GPU খরচ ও ডেটা সায়েন্টিস্ট প্রয়োজন)। |
| **হ্যালুসিনেশন** | অত্যন্ত কম, কারণ মডেল সরাসরি দেওয়া কনটেক্সট পড়ে উত্তর দেয়। | মাঝারি থেকে বেশি (মডেল কনফিডেন্টলি ভুল বলতে পারে)। |
| **সোর্স রেফারেন্স** | উত্তর কোথা থেকে এসেছে তার রেফারেন্স (Page/URL) দেওয়া সম্ভব। | সম্ভব নয় (মডেল "Black Box"-এর মতো আচরণ করে)। |

> [!TIP]
> **গোল্ডেন রুল:** নতুন তথ্য দিতে চাইলে **RAG** ব্যবহার করুন। আর যদি মডেলের লেখার ধরন, মেডিকেল ডোমেইনের ভাষা বা নির্দিষ্ট কোডিং সিনট্যাক্স শেখাতে চান তবে **Fine-Tuning** বিবেচনা করুন।

---

## ৩. RAG আর্কিটেকচারের ৩টি মূল ধাপ

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. INGESTION PHASE (ডেটা প্রসেসিং ও ডাটাবেজে সংরক্ষণ)                  │
│    Document Loading ➔ Text Chunking ➔ Embedding ➔ Vector Database     │
├────────────────────────────────────────────────────────────────────────┤
│ 2. RETRIEVAL PHASE (ইউজারের প্রশ্নের সাথে প্রাসঙ্গিক তথ্য খোঁজা)       │
│    User Question ➔ Query Embedding ➔ Vector Search (Cosine Similarity)  │
├────────────────────────────────────────────────────────────────────────┤
│ 3. GENERATION PHASE (কনটেক্সট সহযোগে উত্তর জেনারেশন)                 │
│    Prompt Template [System + Context + Question] ➔ LLM ➔ Accurate Answer│
└────────────────────────────────────────────────────────────────────────┘
```

---

## ৪. Document Chunking এবং টেক্সট স্প্লিটিং

একটি পুরো ১০০ পৃষ্ঠার বই বা পিডিএফ একসাথে এমবেডিং করলে তার ভেতরের সুনির্দিষ্ট অর্থ হারিয়ে যায়। তাই ডকুমেন্টকে ছোট ছোট খণ্ডে (**Chunks**) ভাগ করতে হয়।

### Chunk Size এবং Chunk Overlap:
- **Chunk Size (যেমন: ৫০০ থেকে ১০০০ ক্যারেক্টার):** প্রতিটি খণ্ডের দৈর্ঘ্য।
- **Chunk Overlap (যেমন: ১০০ থেকে ২০০ ক্যারেক্টার):** একটি খণ্ডের শেষের কিছু অংশ পরবর্তী খণ্ডের শুরুতে রাখা হয়, যাতে খণ্ড করার কারণে কোনো বাক্যের অর্থ মাঝপথে কেটে না যায়।

```
Document: "Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient."

Chunk 1: "Node.js uses an event-driven, non-blocking I/O model..."
Chunk 2: "non-blocking I/O model that makes it lightweight and efficient." (Overlap অংশে বাক্য বজায় থাকে)
```

LangChain.js-এর `RecursiveCharacterTextSplitter` প্যারাগ্রাফ (`\n\n`), নতুন লাইন (`\n`), এবং স্পেসের ওপর ভিত্তি করে বুদ্ধিমানভাবে টেক্সট স্প্লিট করে।

---

## ৫. LangChain.js কী এবং কেন ব্যবহার করবেন?

RAG পাইপলাইন হাতে কোড করে বানানো গেলেও অনেকগুলো বিষয় হ্যান্ডেল করতে প্রচুর বয়লারপ্লেট কোড লিখতে হয়:
- বিভিন্ন ফরম্যাটের ফাইল লোড করা (PDF, Doc, Web Scraping)।
- চ্যাট মেমোরি ও হিস্ট্রি ট্র্যাকিং।
- বিভিন্ন এআই প্রোভাইডারের মধ্যে সুইচ করার সুবিধা (Gemini থেকে OpenAI-তে সহজে পরিবর্তন)।

**LangChain.js** হলো এই সকল এআই কম্পোনেন্টগুলোকে একটি পাইপলাইনে চেইনের মতো যুক্ত করার সবচেয়ে জনপ্রিয় ওপেন-সোর্স ফ্রেমওয়ার্ক।

---

## ৬. LCEL (LangChain Expression Language)

মডার্ন LangChain.js-এ পাইপ অপারেটর বা `.pipe()` ব্যবহার করে ডাটা ফ্লো তৈরি করা হয়। এটি দেখতে অনেকটা Unix পাইপ বা ফাংশনাল প্রোগ্রামিং-এর মতো:

```javascript
import { RunnableSequence } from "@langchain/core/runnables";

// ইনপুট ➔ ফরম্যাট ➔ প্রম্পট ➔ মডেল ➔ স্ট্রিং পার্সার
const ragChain = RunnableSequence.from([
  {
    context: async (input) => retriever.invoke(input.question),
    question: (input) => input.question,
  },
  promptTemplate,
  chatModel,
  new StringOutputParser(),
]);

const answer = await ragChain.invoke({ question: "What is the return policy?" });
```

---

## ৭. LangChain.js এর মূল উপাদানসমূহ

1. **Documents:** টেক্সট ও মেটাডেটা ধারণ করে:
   ```javascript
   new Document({ pageContent: "...", metadata: { source: "policy.pdf", page: 1 } });
   ```
2. **Embeddings:** `@langchain/google-genai` বা `@langchain/openai`
3. **VectorStore:** `MemoryVectorStore`, `PGVectorStore`, `Chroma` ইত্যাদি।
4. **Retriever:** ভেক্টর স্টোরকে কুয়েরি করার ইন্টারফেস:
   ```javascript
   const retriever = vectorStore.asRetriever({ k: 3 });
   ```
5. **PromptTemplate:** কনটেক্সট ইনজেক্ট করার টেমপ্লেট:
   ```javascript
   ChatPromptTemplate.fromMessages([
     ["system", "Answer the question based only on this context:\n\n{context}"],
     ["human", "{question}"],
   ]);
   ```

---

## ৮. এন্ড-টু-এন্ড RAG পাইপলাইন

### ভ্যানিলা জাভাস্ক্রিপ্ট বনাম LangChain.js:
- **ভ্যানিলা JS (`01-vanilla-rag.js`):** কোনো ফ্রেমওয়ার্ক ছাড়াই ডাইরেক্ট SDK ও ভেক্টর ম্যাথ দিয়ে পাইপলাইন চালানো। এর ফলে ফ্রেমওয়ার্কের পেছনে আসল কী ঘটছে তা শতভাগ পরিষ্কার হয়।
- **LangChain.js (`02-langchain-rag.js`):** প্রোডাকশন গ্রেড মডুলার কোড, যা সহজে বড় প্রজেক্টে স্কেল করা যায়।

---

## ৯. Conversational RAG (Chat History ও Contextualization)

সাধারণ RAG-তে ব্যবহারকারী যদি ফলো-আপ প্রশ্ন করে, যেমন:
- ইউজার: *"Next.js এর অ্যাপ রাউটার কীভাবে কাজ করে?"* ➔ উত্তর দেয়।
- ইউজার: *"এটির সুবিধা কী?"* ➔ সাধারণ ভেক্টর সার্চ "এটির সুবিধা কী" দিয়ে সার্চ করতে গিয়ে ভুল রেজাল্ট পায়, কারণ সে জানে না "এটির" মানে কী!

### সমাধান: Contextualization Chain
প্রথমে চ্যাট হিস্ট্রি এবং নতুন প্রশ্নকে এআই দিয়ে একটি স্বাধীন প্রশ্নে রূপান্তর করা হয়:
```
"এটির সুবিধা কী?" ➔ (হিস্ট্রি দেখে রূপান্তর) ➔ "Next.js অ্যাপ রাউটারের সুবিধা কী?"
```
তারপর সেই রূপান্তরিত প্রশ্ন দিয়ে ভেক্টর ডেটাবেজে সার্চ করা হয়!

---

## ১০. RAG ট্রাবলশুটিং ও হ্যালুসিনেশন প্রতিরোধ

1. **Grounding Prompt:** সবসময় প্রম্পটে কড়া নির্দেশ রাখুন:
   ```text
   "You are an assistant for question-answering tasks. Use strictly the provided context. If the answer is not contained in the context, say 'I cannot find that in the documentation.' Do NOT make up answers."
   ```
2. **Re-Ranking:** ভেক্টর সার্চে টপ-১০ টি ডকুমেন্ট নিয়ে একটি ছোট ক্রস-এনকোডার বা এলএলএম দিয়ে সেরা ৩টি বাছাই করা।
3. **Chunk Size টিউনিং:** যদি উত্তর কাটাকাটা আসে, ওভারল্যাপ বাড়িয়ে দিন।

---

> 🚀 **পরবর্তী পদক্ষেপ:** এই ফোল্ডারের কোড ফাইলগুলো রান করে প্র্যাকটিস করুন।
