/**
 * 03-conversational-rag.js
 * 
 * Conversational RAG with Chat History & Question Re-framing
 * পেছনের কথোপকথন মনে রেখে ফলো-আপ প্রশ্নের সঠিক RAG উত্তর দেওয়ার আধুনিক কৌশল।
 * রান করতে: node 03-conversational-rag.js
 */

import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [path.resolve(process.cwd(), ".env"), path.resolve(import.meta.dirname, ".env")] });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "your-gemini-api-key-here") {
  console.log("⚠️  Notice: GEMINI_API_KEY পাওয়া যায়নি।");
  console.log("👉 অনুগ্রহ করে '.env' ফাইলে আপনার Google AI Studio API Key দিন।");
  process.exit(0);
}

async function runConversationalRAG() {
  console.log("==================================================");
  console.log("💬 Conversational RAG with Chat History");
  console.log("==================================================");

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey,
    modelName: "text-embedding-004",
  });

  const chatModel = new ChatGoogleGenerativeAI({
    apiKey,
    modelName: "gemini-1.5-flash",
    temperature: 0.1,
  });

  // নলেজবেজ
  const knowledgeBase = [
    new Document({
      pageContent: "Next.js App Router uses React Server Components by default, which improves initial page load speed.",
    }),
    new Document({
      pageContent: "Server Actions in Next.js allow you to run asynchronous code directly on the server without creating manual API endpoints.",
    }),
    new Document({
      pageContent: "Next.js Turbopack is an incremental bundler written in Rust, which is up to 10x faster than Webpack.",
    }),
  ];

  const vectorStore = await MemoryVectorStore.fromDocuments(knowledgeBase, embeddings);
  const retriever = vectorStore.asRetriever({ k: 1 });

  // চ্যাট হিস্ট্রি স্টোর
  const chatHistory = [];

  // ১. Contextualize Question Chain:
  // ইউজার যদি বলে "এটির সুবিধা কী?", চ্যাট হিস্ট্রি দেখে সেটিকে "Next.js Turbopack এর সুবিধা কী?" এ রূপান্তর করে।
  const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Given a chat history and the latest user question which might reference context in the chat history, formulate a standalone question which can be understood without the chat history. Do NOT answer the question, just reformulate it if needed and otherwise return it as is.",
    ],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ]);

  const contextualizeChain = contextualizeQPrompt.pipe(chatModel).pipe(new StringOutputParser());

  // ২. ফাইনাল উত্তর দেওয়ার QA Prompt
  const qaPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a technical mentor. Answer the user question based only on the following context:\n\n{context}",
    ],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ]);

  // সম্পূর্ণ কনভারসেশনাল পাইপলাইন ফাংশন
  async function askQuestion(rawQuestion) {
    console.log(`\n👤 User: "${rawQuestion}"`);

    // স্টেপ ক: হিস্ট্রি থাকলে প্রশ্নকে স্ট্যান্ড-অ্যালোন প্রশ্নে রি-ফর্মুলেট করা
    let standaloneQuestion = rawQuestion;
    if (chatHistory.length > 0) {
      standaloneQuestion = await contextualizeChain.invoke({
        chat_history: chatHistory,
        question: rawQuestion,
      });
      console.log(`🔄 Reformulated Question for Vector Search: "${standaloneQuestion}"`);
    }

    // স্টেপ খ: রি-ফর্মুলেটেড প্রশ্ন দিয়ে ভেক্টর রিট্রিভাল
    const docs = await retriever.invoke(standaloneQuestion);
    const contextText = docs.map((d) => d.pageContent).join("\n");

    // স্টেপ গ: উত্তর জেনারেট করা
    const qaChain = qaPrompt.pipe(chatModel).pipe(new StringOutputParser());
    const answer = await qaChain.invoke({
      chat_history: chatHistory,
      question: rawQuestion,
      context: contextText,
    });

    // স্টেপ ঘ: চ্যাট হিস্ট্রিতে যোগ করা
    chatHistory.push(new HumanMessage(rawQuestion));
    chatHistory.push(new AIMessage(answer));

    console.log(`🤖 Assistant: ${answer}`);
  }

  // রাউন্ড ১: প্রথম প্রশ্ন
  await askQuestion("What is Next.js Turbopack?");

  // রাউন্ড ২: ফলো-আপ প্রশ্ন (যেখানে ডাইরেক্ট টার্বোপ্যাকের নাম উল্লেখ নেই!)
  await askQuestion("How much faster is it compared to traditional bundlers?");
}

runConversationalRAG();
