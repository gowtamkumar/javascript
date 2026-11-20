/**
 * 02-generate-embeddings.js
 * 
 * Google Gemini SDK (text-embedding-004) দিয়ে ৭৬৮ ডাইমেনশনের বাস্তব এমবেডিং জেনারেট করা।
 * রান করতে: node 02-generate-embeddings.js
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [path.resolve(process.cwd(), ".env"), path.resolve(import.meta.dirname, ".env")] });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "your-gemini-api-key-here") {
  console.log("⚠️  Notice: GEMINI_API_KEY পাওয়া যায়নি।");
  console.log("👉 অনুগ্রহ করে '.env' ফাইলে আপনার Google AI Studio API Key দিন।");
  console.log("💡 [কোড স্ট্রাকচার ডেমো]:");
  console.log(`
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent("Node.js and Express backend");
  console.log("Dimensions:", result.embedding.values.length); // 768
  `);
  process.exit(0);
}

const genAI = new GoogleGenerativeAI(apiKey);
// text-embedding-004 হলো Gemini এর অফিসিয়াল স্টেট-অব-দ্য-আর্ট এমবেডিং মডেল
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

async function getEmbedding(text) {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

async function runDemo() {
  try {
    const text1 = "PostgreSQL is a powerful open source relational database.";
    const text2 = "pgvector adds vector similarity search capabilities to Postgres.";

    console.log(`📝 Text 1: "${text1}"`);
    console.log("⏳ এমবেডিং তৈরি হচ্ছে...");
    const embedding1 = await getEmbedding(text1);

    console.log(`✅ Embedding 1 তৈরি হয়েছে!`);
    console.log(`- ডাইমেনশন সংখ্যা (Dimensions): ${embedding1.length}`);
    console.log(`- প্রথম ৫টি মান: [${embedding1.slice(0, 5).map(n => n.toFixed(5)).join(", ")}, ...]`);

    console.log(`\n📝 Text 2: "${text2}"`);
    const embedding2 = await getEmbedding(text2);
    console.log(`✅ Embedding 2 তৈরি হয়েছে! (Dimensions: ${embedding2.length})`);
  } catch (error) {
    console.error("❌ ত্রুটি:", error.message);
  }
}

runDemo();
