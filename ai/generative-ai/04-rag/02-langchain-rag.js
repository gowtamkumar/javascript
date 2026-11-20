/**
 * 02-langchain-rag.js
 * 
 * LangChain.js (LCEL - LangChain Expression Language) দিয়ে আধুনিক RAG পাইপলাইন।
 * রান করতে: node 02-langchain-rag.js
 */

import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [path.resolve(process.cwd(), ".env"), path.resolve(import.meta.dirname, ".env")] });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "your-gemini-api-key-here") {
  console.log("⚠️  Notice: GEMINI_API_KEY পাওয়া যায়নি।");
  console.log("👉 অনুগ্রহ করে '.env' ফাইলে আপনার Google AI Studio API Key দিন।");
  console.log("💡 [LangChain.js LCEL RAG কোড আর্কিটেকচার]:");
  console.log(`
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const retriever = vectorStore.asRetriever({ k: 2 });

  const ragChain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    promptTemplate,
    chatModel,
    new StringOutputParser(),
  ]);

  const response = await ragChain.invoke("What is the refund policy?");
  `);
  process.exit(0);
}

// কনটেক্সট ডকুমেন্ট ফরম্যাটিং হেল্পার
function formatDocumentsAsString(documents) {
  return documents.map((doc) => doc.pageContent).join("\n\n");
}

async function runLangChainRAG() {
  console.log("==================================================");
  console.log("🦜🔗 LangChain.js LCEL RAG Pipeline");
  console.log("==================================================");

  // ১. মডেল এবং এমবেডিং ইনিশিয়ালাইজেশন
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey,
    modelName: "text-embedding-004",
  });

  const chatModel = new ChatGoogleGenerativeAI({
    apiKey,
    modelName: "gemini-1.5-flash",
    temperature: 0.1,
  });

  // ২. নলেজবেজ ডকুমেন্টস তৈরি (Sample Knowledge Base)
  const docs = [
    new Document({
      pageContent: "BanglaMart delivers organic groceries within 60 minutes in Dhaka city for a standard delivery fee of ৳50.",
      metadata: { topic: "delivery", area: "dhaka" },
    }),
    new Document({
      pageContent: "Returns are accepted within 24 hours of delivery if fresh produce or dairy products are damaged.",
      metadata: { topic: "returns" },
    }),
    new Document({
      pageContent: "BanglaMart accepts bKash, Nagad, Visa, Mastercard, and Cash on Delivery (COD).",
      metadata: { topic: "payments" },
    }),
  ];

  console.log("📦 ডকুমেন্টস দিয়ে MemoryVectorStore তৈরি হচ্ছে...");
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const retriever = vectorStore.asRetriever({ k: 2 });

  // ৩. LCEL RAG Prompt Template
  const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are a helpful customer support agent for BanglaMart. Answer the user's question accurately using only the provided context. If the answer is not in the context, say 'I apologize, but that information is not available in our store guide.'\n\nContext:\n{context}",
    ],
    ["human", "{question}"],
  ]);

  // ৪. LCEL পাইপলাইন (RunnableSequence)
  const ragChain = RunnableSequence.from([
    {
      context: async (input) => {
        const retrievedDocs = await retriever.invoke(input.question);
        return formatDocumentsAsString(retrievedDocs);
      },
      question: (input) => input.question,
    },
    promptTemplate,
    chatModel,
    new StringOutputParser(),
  ]);

  // ৫. টেস্ট কুয়েরি ১ (প্রাসঙ্গিক প্রশ্ন)
  const question1 = "What are the available payment methods and delivery charges in Dhaka?";
  console.log(`\n👤 User Question 1: "${question1}"`);
  console.log("⏳ পাইপলাইন প্রসেস হচ্ছে...");
  const answer1 = await ragChain.invoke({ question: question1 });
  console.log(`🤖 Support Agent:\n${answer1}\n`);

  // ৬. টেস্ট কুয়েরি ২ (অনুপস্থিত তথ্য - হ্যালুসিনেশন টেস্ট)
  const question2 = "Do you deliver to Chittagong?";
  console.log(`👤 User Question 2: "${question2}"`);
  const answer2 = await ragChain.invoke({ question: question2 });
  console.log(`🤖 Support Agent:\n${answer2}`);
}

runLangChainRAG();
