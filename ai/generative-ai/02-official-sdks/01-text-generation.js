/**
 * 01-text-generation.js
 * 
 * কীভাবে Google Gemini SDK দিয়ে সাধারণ টেক্সট জেনারেশন করতে হয়।
 * রান করতে: node 01-text-generation.js
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

// .env ফাইল বর্তমান ডিরেক্টরি অথবা 02-official-sdks ফোল্ডার থেকে লোড করা
dotenv.config({ path: [path.resolve(process.cwd(), ".env"), path.resolve(import.meta.dirname, ".env")] });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "your-gemini-api-key-here") {
  console.log("⚠️  Notice: GEMINI_API_KEY পাওয়া যায়নি।");
  console.log("👉 অনুগ্রহ করে '02-official-sdks/.env' ফাইলে আপনার Google AI Studio API Key দিন।");
  console.log("🔗 ফ্রি এপিআই কি পেতে ভিজিট করুন: https://aistudio.google.com/\n");
  console.log("💡 [কোড স্ট্রাকচার ডেমো]:");
  console.log(`
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent("Explain Event Loop in JavaScript in 3 bullet points.");
  console.log(result.response.text());
  `);
  process.exit(0);
}

const genAI = new GoogleGenerativeAI(apiKey);

// gemini-1.5-flash হলো দ্রুততম ও সাশ্রয়ী মডেল
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an experienced JavaScript mentor. Keep explanations concise, practical, and beginner-friendly.",
  generationConfig: {
    temperature: 0.2, // সুনির্দিষ্ট ও সঠিক উত্তর
    maxOutputTokens: 600,
  },
});

async function runTextGeneration() {
  try {
    const prompt = "Explain the difference between '==' and '===' in JavaScript with a quick example.";
    console.log(`🤖 Prompt: "${prompt}"\n`);
    console.log("⏳ উত্তরের জন্য অপেক্ষা করা হচ্ছে...\n");

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log("📝 রেসপন্স:\n");
    console.log(responseText);
  } catch (error) {
    console.error("❌ ত্রুটি:", error.message);
  }
}

runTextGeneration();
