/**
 * 04-structured-output.js
 * 
 * Strict JSON Schema ব্যবহার করে শতভাগ নির্ভরযোগ্য JSON আউটপুট পাওয়া।
 * রান করতে: node 04-structured-output.js
 */

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
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

// JSON আউটপুটের স্কিমা নির্ধারণ করা
const jobCandidateSchema = {
  type: SchemaType.OBJECT,
  properties: {
    candidateName: { type: SchemaType.STRING, description: "Name of the candidate" },
    currentRole: { type: SchemaType.STRING, description: "Current professional title" },
    yearsOfExperience: { type: SchemaType.NUMBER, description: "Total years of software experience" },
    primarySkills: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "List of core technologies mentioned"
    },
    contactInfo: {
      type: SchemaType.OBJECT,
      properties: {
        email: { type: SchemaType.STRING },
        githubUsername: { type: SchemaType.STRING }
      },
      required: ["email"]
    }
  },
  required: ["candidateName", "currentRole", "yearsOfExperience", "primarySkills", "contactInfo"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: jobCandidateSchema,
    temperature: 0.1, // পারফেক্ট এক্সট্রাকশনের জন্য লো টেম্পারেচার
  },
});

async function runStructuredExtraction() {
  const bio = `
    Hello team, I am Anisur Rahman. I have been developing applications with JavaScript, Node.js, 
    Express, and PostgreSQL for over 5 years. My GitHub is @anisur-dev and you can reach me 
    directly at anisur.rahman@workmail.com.
  `;

  console.log("📄 Raw Text Input:\n", bio.trim(), "\n");
  console.log("⏳ JSON এ রূপান্তর করা হচ্ছে...\n");

  try {
    const result = await model.generateContent(`Extract candidate profile from this text:\n${bio}`);
    const rawJsonText = result.response.text();

    // সেফলি JSON পার্স করা
    const parsedData = JSON.parse(rawJsonText);

    console.log("✅ সফলভাবে স্ট্রাকচার্ড JSON পাওয়া গেছে:");
    console.dir(parsedData, { depth: null, colors: true });

    console.log("\n🔍 টাইপড ফিল্ড অ্যাক্সেস:");
    console.log(`- নাম: ${parsedData.candidateName}`);
    console.log(`- অভিজ্ঞতা: ${parsedData.yearsOfExperience} বছর`);
    console.log(`- স্কিলস: ${parsedData.primarySkills.join(", ")}`);
    console.log(`- ইমেইল: ${parsedData.contactInfo.email}`);
  } catch (error) {
    console.error("❌ ত্রুটি:", error.message);
  }
}

runStructuredExtraction();
