/**
 * 05-multimodal-demo.js
 * 
 * Multimodal AI: ইমেজ এবং টেক্সট একসাথে পাঠিয়ে তথ্য বিশ্লেষণ।
 * রান করতে: node 05-multimodal-demo.js
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: [path.resolve(process.cwd(), ".env"), path.resolve(import.meta.dirname, ".env")] });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "your-gemini-api-key-here") {
  console.log("⚠️  Notice: GEMINI_API_KEY পাওয়া যায়নি।");
  console.log("👉 অনুগ্রহ করে '.env' ফাইলে আপনার এপিআই কি দিন।");
  process.exit(0);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * লোকাল ফাইলকে Base64 পার্টে রূপান্তর করার ইউটিলিটি
 */
function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType,
    },
  };
}

async function runMultimodalAnalysis() {
  const sampleImagePath = path.join(process.cwd(), "sample.png");

  // যদি স্যাম্পল ইমেজ না থাকে, তবে একটি ডামি ফাইল বানিয়ে টেস্ট করা বা নোটিশ দেওয়া
  if (!fs.existsSync(sampleImagePath)) {
    console.log("ℹ️  আপনার টেস্ট করার সুবিধার্থে কোনো লোকাল ইমেজ থাকলে সেটির পাথ দিতে পারেন।");
    console.log("💡 মাল্টিমোডাল ফাংশন কীভাবে কাজ করে দেখুন:\n");
    console.log(`
    // ১. ইমেজকে Base64 পার্টে কনভার্ট করা:
    const imagePart = fileToGenerativePart("./my-image.png", "image/png");

    // ২. প্রম্পট ও ইমেজ পার্ট অ্যারে আকারে পাঠানো:
    const prompt = "Describe what you see in this image and list any visible text.";
    const result = await model.generateContent([prompt, imagePart]);

    // ৩. রেসপন্স রিসিভ করা:
    console.log(result.response.text());
    `);
    return;
  }

  try {
    const imagePart = fileToGenerativePart(sampleImagePath, "image/png");
    const prompt = "Analyze this image and explain what is depicted in it in 3 bullet points.";

    console.log("🖼️ ইমেজ অ্যানালাইসিস শুরু হচ্ছে...\n");
    const result = await model.generateContent([prompt, imagePart]);

    console.log("📝 বিশ্লেষণ ফলাফল:\n");
    console.log(result.response.text());
  } catch (error) {
    console.error("❌ ত্রুটি:", error.message);
  }
}

runMultimodalAnalysis();
