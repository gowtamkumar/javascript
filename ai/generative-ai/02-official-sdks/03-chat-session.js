/**
 * 03-chat-session.js
 * 
 * মাল্টি-টার্ন চ্যাট ও হিস্ট্রি বজায় রেখে কথোপকথন।
 * রান করতে: node 03-chat-session.js
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

async function runChatSession() {
  try {
    console.log("💬 চ্যাট সেশন শুরু হচ্ছে...\n");

    // প্রারম্ভিক হিস্ট্রি সহ চ্যাট সেশন শুরু করা
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello! My name is Gowtam. I am building fullstack JavaScript apps." }],
        },
        {
          role: "model",
          parts: [{ text: "Hi Gowtam! Great to meet you. Fullstack JavaScript is awesome. How can I help you today?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 300,
      },
    });

    // প্রথম ফলো-আপ মেসেজ
    console.log("👤 User: Can you remember my name and what I do?");
    let response = await chat.sendMessage("Can you remember my name and what I do?");
    console.log(`🤖 AI: ${response.response.text()}\n`);

    // দ্বিতীয় ফলো-আপ মেসেজ
    console.log("👤 User: Recommend 3 essential npm packages for my backend project.");
    response = await chat.sendMessage("Recommend 3 essential npm packages for my backend project.");
    console.log(`🤖 AI: ${response.response.text()}\n`);

    // মোট হিস্ট্রি লগ দেখা
    const history = await chat.getHistory();
    console.log(`📊 মোট আদান-প্রদান করা মেসেজ সংখ্যা: ${history.length}`);
  } catch (error) {
    console.error("❌ ত্রুটি:", error.message);
  }
}

runChatSession();
