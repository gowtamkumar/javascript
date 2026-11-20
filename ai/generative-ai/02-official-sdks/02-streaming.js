/**
 * 02-streaming.js
 * 
 * রিয়েল-টাইম স্ট্রিমিং রেসপন্স (লাইভ টাইপিং ইফেক্ট)।
 * রান করতে: node 02-streaming.js
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [path.resolve(process.cwd(), ".env"), path.resolve(import.meta.dirname, ".env")] });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "your-gemini-api-key-here") {
  console.log("⚠️  Notice: GEMINI_API_KEY পাওয়া যায়নি।");
  console.log("👉 অনুগ্রহ করে '.env' ফাইলে আপনার এপিআই কি দিন।");
  process.exit(0);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function runStreaming() {
  try {
    const prompt = "Write a short 5-step tutorial on building a REST API in Node.js using Express.";
    console.log(`🤖 Prompt: "${prompt}"\n`);
    console.log("⚡ লাইভ স্ট্রিমিং শুরু হচ্ছে (টোকেন বাই টোকেন):\n");

    // generateContent এর বদলে generateContentStream ব্যবহার করা হয়
    const result = await model.generateContentStream(prompt);

    // for await...of লুপ ব্যবহার করে প্রতিটি চাংক আশার সাথে সাথে কনসোলে প্রিন্ট করা
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      process.stdout.write(chunkText);
    }

    console.log("\n\n✅ স্ট্রিমিং সফলভাবে শেষ হয়েছে!");
  } catch (error) {
    console.error("❌ ত্রুটি:", error.message);
  }
}

runStreaming();
