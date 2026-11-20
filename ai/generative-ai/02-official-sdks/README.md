# Phase 2: Official AI SDKs & Multimodal AI (A to Z Guide)

> **লক্ষ্য:** JavaScript / Node.js ডেভেলপার হিসেবে Google Gemini এবং OpenAI-এর অফিসিয়াল SDK ব্যবহার করে টেক্সট জেনারেশন, রিয়েল-টাইম স্ট্রিমিং, চ্যাট হিস্ট্রি, স্ট্রাকচার্ড JSON আউটপুট এবং মাল্টিমোডাল (ইমেজ ও ডকুমেন্ট প্রসেসিং)-এর কাজগুলো প্রফেশনাল উপায়ে শেখা।

---

## সূচিপত্র (Table of Contents)
1. [অফিসিয়াল SDK কেন ব্যবহার করবেন? (SDK বনাম Direct Fetch)](#১-অফিসিয়াল-sdk-কেন-ব্যবহার-করবেন)
2. [এনভায়রনমেন্ট সেটআপ ও API Key ম্যানেজমেন্ট](#২-এনভায়রনমেন্ট-সেটআপ-ও-api-key-ম্যানেজমেন্ট)
3. [টেক্সট জেনারেশন (Text Generation - Single Turn)](#৩-টেক্সট-জেনারেশন-single-turn)
4. [রিয়েল-টাইম স্ট্রিমিং (Streaming Responses) - গ্রেট UX এর জন্য](#৪-রিয়েল-টাইম-স্ট্রিমিং-streaming-responses)
5. [মাল্টি-টার্ন চ্যাট ও হিস্ট্রি ম্যানেজমেন্ট (Chat Session)](#৫-মাল্টি-টার্ন-চ্যাট-ও-হিস্ট্রি-ম্যানেজমেন্ট)
6. [স্ট্রাকচার্ড JSON আউটপুট (Native JSON Schema Output)](#৬-স্ট্রাকচার্ড-json-আউটপুট-native-json-schema)
7. [Multimodal AI (ইমেজ ও ডকুমেন্ট প্রসেসিং)](#৭-multimodal-ai-ইমেজ-ও-ডকুমেন্ট-প্রসেসিং)
8. [টোকেন কাউন্টিং ও রেট লিমিট হ্যান্ডলিং (Error & Rate Limit Handling)](#৮-টোকেন-কাউন্টিং-ও-রেট-লিমিট-হ্যান্ডলিং)
9. [Google Gemini SDK বনাম OpenAI SDK কম্প্যারিজন চিটশিট](#৯-gemini-বনাম-openai-sdk-কম্প্যারিজন)
10. [প্রোডাকশন বেস্ট প্র্যাকটিসেস (Production Best Practices)](#১০-প্রোডাকশন-বেস্ট-প্র্যাকটিসেস)

---

## ১. অফিসিয়াল SDK কেন ব্যবহার করবেন?

অনেকেই ভাবেন `fetch('https://api.openai.com/v1/chat/completions', ...)` দিয়েই তো কাজ চালানো যায়। কিন্তু প্রোডাকশনে অফিসিয়াল SDK ব্যবহার করার সুবিধাগুলো হলো:

| ফিচার | Direct Fetch / Axios | Official SDK (`@google/genai` / `openai`) |
| :--- | :--- | :--- |
| **Type Safety** | ম্যানুয়ালি টাইপ লিখতে হয়, ভুলের সম্ভাবনা বেশি। | বিল্ট-ইন TypeScript ইন্টারফেস ও অটো-কমপ্লিশন। |
| **Streaming Support** | ReadableStream এবং SSE (Server-Sent Events) জটিলভাবে হ্যান্ডেল করতে হয়। | `for await (const chunk of stream)` দিয়ে খুব সহজে ব্যবহারযোগ্য। |
| **Automatic Retries** | নিজে থেকে এক্সপোনেনশিয়াল ব্যাকঅফ কোড লিখতে হয়। | নেটওয়ার্ক এরর বা 429 রেট লিমিটে স্বয়ংক্রিয় রিট্রাই মেকানিজম। |
| **Multimodal Uploads** | Multipart ও Base64 ম্যানুয়াল এনকোডিং প্রয়োজন। | সহজ মেথড (`inlineData`, `uploadFile`) রয়েছে। |
| **Security & Headers** | প্রতিটি রিকোয়েস্টে হেডার ও টোকেন পাস করতে হয়। | ক্লায়েন্ট ইনিশিয়ালাইজেশনেই সেন্ট্রাল কনফিগারেশন। |

---

## ২. এনভায়রনমেন্ট সেটআপ ও API Key ম্যানেজমেন্ট

### ২.১ প্রয়োজনীয় প্যাকেজ ইনস্টল করা
```bash
npm install @google/generative-ai dotenv openai
```

### ২.২ API Key সংগ্রহ করা:
- **Google Gemini (ফ্রি টিয়ার উপলব্ধ):** [Google AI Studio](https://aistudio.google.com/) থেকে আপনার ফ্রি API Key নিন।
- **OpenAI:** [OpenAI Platform](https://platform.openai.com/api-keys) থেকে API Key সংগ্রহ করুন।

### ২.৩ `.env` ফাইলে সিক্রেট সংরক্ষণ করা:
প্রজেক্ট রুটে একটি `.env` ফাইল তৈরি করুন:
```env
GEMINI_API_KEY="AIzaSyYourGeminiApiKeyHere"
OPENAI_API_KEY="sk-proj-YourOpenAIApiKeyHere"
```
> [!CAUTION]
> `.env` ফাইল কখনোই Git রিপোজিটরিতে পুশ করবেন না! সবসময় `.gitignore` এ `.env` লিখে রাখবেন।

---

## ৩. টেক্সট জেনারেশন (Single Turn)

এটি হলো সবচেয়ে বেসিক মেথড—একটি প্রম্পট পাঠানো এবং পুরো উত্তরটি একসাথে পাওয়া।

### Google Gemini SDK দিয়ে:
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  // সিস্টেম ইনস্ট্রাকশন দিয়ে মডেলের আচরণ ঠিক করা
  systemInstruction: "You are a professional JavaScript mentor. Answer concisely.",
  generationConfig: {
    temperature: 0.2, // ফোকাসড উত্তর
    maxOutputTokens: 500,
  }
});

async function main() {
  const result = await model.generateContent("Explain Event Loop in JavaScript in 3 bullet points.");
  console.log(result.response.text());
}

main();
```

---

## ৪. রিয়েল-টাইম স্ট্রিমিং (Streaming Responses)

ChatGPT বা আধুনিক এআই অ্যাপগুলোর মতো শব্দে শব্দে লাইভ টেক্সট আসার অনুভূতি দিতে **Streaming** অপরিহার্য। এটি ইউজারের অপেক্ষার সময় (Time-to-First-Token) বহুগুণ কমিয়ে আনে।

### Node.js কনসোলে লাইভ স্ট্রিমিং:
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function streamDemo() {
  const prompt = "Write a comprehensive JavaScript guide on Promises vs Async/Await.";
  
  // generateContentStream ব্যবহার করতে হবে
  const result = await model.generateContentStream(prompt);

  // for await...of লুপ দিয়ে প্রতিটি চাংক আসার সাথে সাথে প্রিন্ট করা
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    process.stdout.write(chunkText); // লাইভ টাইপিং ইফেক্ট
  }
  console.log("\n\n--- Stream Completed ---");
}

streamDemo();
```

> [!TIP]
> Express বা Next.js ব্যাকএন্ড থেকে ফ্রন্টএন্ডে স্ট্রিমিং পাঠানোর জন্য **Server-Sent Events (SSE)** বা Vercel AI SDK-র `streamText` ব্যবহার করা হয়।

---

## ৫. মাল্টি-টার্ন চ্যাট ও হিস্ট্রি ম্যানেজমেন্ট

সাধারণ টেক্সট জেনারেশনে মডেল পেছনের কথা মনে রাখে না (Stateless)। পেছনের চ্যাট মনে রাখার জন্য SDK-র **Chat Session** ব্যবহার করতে হয়।

### Gemini `startChat`:
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function chatSessionDemo() {
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "My name is Gowtam and I am a JavaScript developer." }],
      },
      {
        role: "model",
        parts: [{ text: "Hello Gowtam! Nice to meet you. How can I help you with JavaScript today?" }],
      },
    ],
  });

  // নতুন প্রশ্ন (মডেল আগের হিস্ট্রি জানে)
  let response = await chat.sendMessage("What is my name and what do I do?");
  console.log(response.response.text());
  // আউটপুট: "Your name is Gowtam, and you are a JavaScript developer!"

  // সম্পূর্ণ হিস্ট্রি চেক করা
  const history = await chat.getHistory();
  console.log(`Total messages in session: ${history.length}`);
}

chatSessionDemo();
```

---

## ৬. স্ট্রাকচার্ড JSON আউটপুট (Native JSON Schema)

প্রম্পটে "Please return JSON" বললেও মাঝে মাঝে মডেল ভুল ফরম্যাট দিতে পারে। মডার্ন SDK-গুলোতে **Strict JSON Schema** কনফিগার করার সুবিধা রয়েছে, যার ফলে আউটপুট সবসময় ১০০% ভ্যালিড JSON হয়।

```javascript
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// প্রত্যাশিত JSON স্কিমা ডিফাইন করা
const userProfileSchema = {
  type: SchemaType.OBJECT,
  properties: {
    fullName: { type: SchemaType.STRING, description: "Full name of the person" },
    skills: { 
      type: SchemaType.ARRAY, 
      items: { type: SchemaType.STRING },
      description: "List of programming skills" 
    },
    experienceYears: { type: SchemaType.NUMBER, description: "Total years of experience" },
    isAvailableForHire: { type: SchemaType.BOOLEAN }
  },
  required: ["fullName", "skills", "experienceYears"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: userProfileSchema,
  },
});

async function extractUserData() {
  const rawText = "Hi, I am Rahat Hasan. I have been doing React and Node.js for the last 4 years. Currently looking for job opportunities.";
  
  const result = await model.generateContent(rawText);
  const jsonResponse = JSON.parse(result.response.text());
  
  console.log("Structured JSON Output:", jsonResponse);
  console.log("Candidate Name:", jsonResponse.fullName);
  console.log("Skills:", jsonResponse.skills.join(", "));
}

extractUserData();
```

---

## ৭. Multimodal AI (ইমেজ ও ডকুমেন্ট প্রসেসিং)

**Multimodal AI** মানে হলো মডেল শুধুমাত্র টেক্সট নয়, ইমেজ, অডিও, ভিডিও এবং PDF ডকুমেন্টও প্রসেস করতে পারে।

### ইমেজ অ্যানালাইসিস (Local Image Buffer to Base64):
```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// লোকাল ফাইলকে Base64 পার্টে কনভার্ট করার হেল্পার
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function analyzeImage() {
  const imagePart = fileToGenerativePart("./receipt.jpg", "image/jpeg");
  const prompt = "Extract all line items, their prices, and the total amount from this receipt in JSON format.";

  const result = await model.generateContent([prompt, imagePart]);
  console.log(result.response.text());
}
```

### মাল্টিমোডালে সাপোর্টেড ফাইল ফরম্যাটস:
- **Images:** PNG, JPEG, WEBP, HEIC
- **Audio:** MP3, WAV, AAC (স্পিচ-টু-টেক্সট ও সামারি)
- **Documents:** PDF (বই বা বড় রিসার্চ পেপারের অ্যানালাইসিস)
- **Video:** MP4, MOV (ভিডিও দেখে নির্দিষ্ট অংশ খুঁজে বের করা)

---

## ৮. টোকেন কাউন্টিং ও রেট লিমিট হ্যান্ডলিং

### ৮.১ টোকেন কাউন্টিং (`countTokens`):
বড় প্রম্পট পাঠানোর আগে কত টোকেন খরচ হবে তা যাচাই করা:
```javascript
const { totalTokens } = await model.countTokens("Your long prompt or document text goes here...");
console.log(`Estimated Tokens: ${totalTokens}`);
```

### ৮.২ রেট লিমিট (HTTP 429) হ্যান্ডলিং:
ফ্রি টিয়ারে নির্দিষ্ট আরপিএম (Requests Per Minute) শেষ হলে এআই এপিআই `429 Too Many Requests` এরর দিতে পারে। এটি হ্যান্ডেল করার নিয়ম:
```javascript
async function callWithRetry(fn, retries = 3, delay = 2000) {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.status === 429) {
      console.warn(`Rate limit hit. Retrying in ${delay / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return callWithRetry(fn, retries - 1, delay * 2); // Exponential Backoff
    }
    throw error;
  }
}
```

---

## ৯. Gemini বনাম OpenAI SDK কম্প্যারিজন

| টাস্ক | Google Gemini SDK (`@google/generative-ai`) | OpenAI SDK (`openai`) |
| :--- | :--- | :--- |
| **Client Initialization** | `const genAI = new GoogleGenerativeAI(apiKey);`<br>`const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });` | `const openai = new OpenAI({ apiKey });` |
| **Text Generation** | `await model.generateContent(prompt)` | `await openai.chat.completions.create({ model: 'gpt-4o-mini', messages: [...] })` |
| **Streaming** | `const res = await model.generateContentStream(prompt);`<br>`for await (const chunk of res.stream)` | `const res = await openai.chat.completions.create({ stream: true, ... });`<br>`for await (const chunk of res)` |
| **Chat Session** | `const chat = model.startChat({ history: [...] });`<br>`await chat.sendMessage(text);` | ম্যানুয়ালি মেসেজ অ্যারে মেনটেইন করতে হয় (`messages.push(...)`). |
| **JSON Mode** | `generationConfig: { responseMimeType: 'application/json', responseSchema }` | `response_format: { type: 'json_object' }` বা `zodResponseFormat` |
| **Multimodal** | `[prompt, { inlineData: { data, mimeType } }]` | `messages: [{ role: 'user', content: [{ type: 'image_url', image_url: { url } }] }]` |

---

## ১০. প্রোডাকশন বেস্ট প্র্যাকটিসেস

1. **Singleton Client Pattern:** প্রতি রিকোয়েস্টে বারবার SDK ক্লায়েন্ট তৈরি করবেন না; একটি সেন্ট্রাল ফাইলে (যেমন: `lib/ai.js`) ক্লায়েন্ট তৈরি করে এক্সপোর্ট করুন।
2. **Environment Isolation:** লোকাল ডেভেলপমেন্ট, স্টেজিং এবং প্রোডাকশনের জন্য আলাদা আলাদা এপিআই কি ব্যবহার করুন।
3. **Set Max Output Tokens:** সবসময় `maxOutputTokens` লিমিট সেট করুন যাতে কোনো কারণে ইনফিনিট লুপ বা বিশাল রেসপন্স এসে আপনার বিল বাড়িয়ে না ফেলে।
4. **Always Parse JSON Safely:** এআই থেকে JSON রেসপন্স নেওয়ার পর সবসময় `try...catch` ব্লকে `JSON.parse` করুন।
5. **Mask Sensitive Data:** ইউজারের পাসওয়ার্ড, ক্রেডিট কার্ড নম্বর বা ব্যক্তিগত তথ্য প্রম্পটে পাঠানোর আগে ফিল্টার করুন।

---

> 🚀 **পরবর্তী পদক্ষেপ:** এই ফোল্ডারের কোড ফাইলগুলো রান করে প্র্যাকটিস করুন।
