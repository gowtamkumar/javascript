/**
 * 02-react-agent.js
 * 
 * Autonomous AI Agent with ReAct (Reason + Act) Loop in Pure Node.js
 * এটি একাধিক ধাপে নিজে থেকে চিন্তা করে, টুল কল করে এবং লক্ষ্য পূরণ না হওয়া পর্যন্ত চলে।
 * রান করতে: node 02-react-agent.js
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [path.resolve(process.cwd(), ".env"), path.resolve(import.meta.dirname, ".env")] });

const apiKey = process.env.GEMINI_API_KEY;

// ==========================================
// এজেন্টের উপলব্ধ টুলবক্স (Toolbox)
// ==========================================
const availableTools = {
  calculateMath: ({ expression }) => {
    try {
      // সেফ ক্যালকুলেশন (শুধুমাত্র সংখ্যা ও বেসিক অপারেটর)
      const sanitized = expression.replace(/[^0-9+\-*/().]/g, "");
      const result = Function(`'use strict'; return (${sanitized})`)();
      return { expression, result };
    } catch {
      return { error: "Invalid math expression" };
    }
  },

  searchProductPrice: ({ productName }) => {
    const catalog = {
      "macbook pro m3": 1999,
      "iphone 16 pro": 1199,
      "mechanical keyboard": 85,
      "4k monitor": 350,
    };
    const key = productName.toLowerCase();
    const price = catalog[key];
    return price ? { productName, priceInUSD: price } : { error: "Product not found" };
  },

  getVATAndTaxRate: ({ country }) => {
    const rates = { bangladesh: 15, usa: 8, uk: 20 };
    const rate = rates[country.toLowerCase()] || 10;
    return { country, vatPercentage: rate };
  },
};

if (!apiKey || apiKey === "your-gemini-api-key-here") {
  console.log("⚠️  Notice: GEMINI_API_KEY পাওয়া যায়নি।");
  console.log("👉 অনুগ্রহ করে '.env' ফাইলে আপনার Google AI Studio API Key দিন।");
  process.exit(0);
}

const genAI = new GoogleGenerativeAI(apiKey);

// টুল ডিক্লারেশনস
const tools = [
  {
    functionDeclarations: [
      {
        name: "calculateMath",
        description: "Perform mathematical calculations safely.",
        parameters: {
          type: "OBJECT",
          properties: { expression: { type: "STRING", description: "e.g. 1999 * 1.15" } },
          required: ["expression"],
        },
      },
      {
        name: "searchProductPrice",
        description: "Lookup the base USD price of a tech gadget in the catalog.",
        parameters: {
          type: "OBJECT",
          properties: { productName: { type: "STRING", description: "Product name" } },
          required: ["productName"],
        },
      },
      {
        name: "getVATAndTaxRate",
        description: "Get the standard VAT and tax percentage for a specific country.",
        parameters: {
          type: "OBJECT",
          properties: { country: { type: "STRING", description: "Country name" } },
          required: ["country"],
        },
      },
    ],
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  tools,
  systemInstruction: `You are an Autonomous Shopping & Financial Assistant.
To solve complex user goals:
1. Break down the task into logical steps.
2. Call available tools one by one or in parallel.
3. Once all necessary data is gathered, provide the final answer clearly.`,
});

/**
 * স্বায়ত্ত্বশাসিত এজেন্ট এক্সিকিউটর লুপ (Autonomous Agent Loop)
 */
async function runAutonomousAgent(goal, maxSteps = 5) {
  console.log("==================================================");
  console.log(`🎯 Agent Goal: "${goal}"`);
  console.log("==================================================\n");

  const chat = model.startChat();
  let currentPrompt = goal;
  let step = 0;

  while (step < maxSteps) {
    step++;
    console.log(`🔄 [Step ${step}] এআই চিন্তা করছে ও সিদ্ধান্ত নিচ্ছে...`);

    const response = await chat.sendMessage(currentPrompt);
    const functionCalls = response.response.functionCalls();

    // যদি আর কোনো ফাংশন কল করার না থাকে, তার মানে এজেন্ট লক্ষ্যে পৌঁছে গেছে!
    if (!functionCalls || functionCalls.length === 0) {
      console.log(`\n🎉 [লক্ষ্য অর্জিত হয়েছে ${step} ধাপে!]\n`);
      console.log("🤖 Final Answer:\n");
      console.log(response.response.text());
      return;
    }

    // ফাংশন কল এক্সিকিউট করা
    const responsesPayload = [];
    for (const call of functionCalls) {
      const toolFn = availableTools[call.name];
      console.log(`  👉 Action: Calling tool "${call.name}" with args:`, call.args);

      const result = toolFn ? toolFn(call.args) : { error: "Unknown tool" };
      console.log(`  👁️  Observation:`, result);

      responsesPayload.push({
        functionResponse: {
          name: call.name,
          response: result,
        },
      });
    }

    // পরবর্তী ইটারেশনের জন্য ফাংশন রেসপন্সকে ইনপুট হিসেবে পাঠানো
    currentPrompt = responsesPayload;
    console.log("");
  }

  console.warn("⚠️ সর্বোচ্চ স্টেপ লিমিট শেষ হয়েছে।");
}

// কমপ্লেক্স মাল্টি-স্টেপ প্রবলেম:
// ১. ম্যাকবুকের দাম বের করবে
// ২. বাংলাদেশের ট্যাক্স রেট বের করবে
// ৩. ক্যালকুলেটর দিয়ে মোট দাম হিসাব করবে
runAutonomousAgent("I want to buy a 'MacBook Pro M3' in Bangladesh. What will be the total price in USD including VAT and taxes?");
