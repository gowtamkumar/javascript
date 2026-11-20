/**
 * 01-function-calling.js
 * 
 * Google Gemini SDK দিয়ে Function / Tool Calling এর সম্পূর্ণ এন্ড-টু-এন্ড বাস্তবায়ন।
 * রান করতে: node 01-function-calling.js
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [path.resolve(process.cwd(), ".env"), path.resolve(import.meta.dirname, ".env")] });

const apiKey = process.env.GEMINI_API_KEY;

// ==========================================
// ১. বাস্তব জাভাস্ক্রিপ্ট ফাংশনসমূহ (Actual Tools)
// ==========================================
function getLiveWeather({ city }) {
  const mockDatabase = {
    dhaka: { temperature: "29°C", condition: "Sunny", humidity: "65%" },
    london: { temperature: "12°C", condition: "Rainy", humidity: "85%" },
    tokyo: { temperature: "18°C", condition: "Clear", humidity: "50%" },
  };
  const key = city.toLowerCase();
  return mockDatabase[key] || { temperature: "25°C", condition: "Partly Cloudy", humidity: "60%" };
}

function convertCurrency({ amount, from, to }) {
  const rates = {
    USD_TO_BDT: 121.5,
    EUR_TO_BDT: 130.0,
    GBP_TO_BDT: 153.2,
  };
  const pair = `${from.toUpperCase()}_TO_${to.toUpperCase()}`;
  const rate = rates[pair] || 1.0;
  return {
    originalAmount: amount,
    convertedAmount: (amount * rate).toFixed(2),
    currency: to.toUpperCase(),
    exchangeRate: rate,
  };
}

if (!apiKey || apiKey === "your-gemini-api-key-here") {
  console.log("==================================================");
  console.log("🛠️ Function / Tool Calling Architecture");
  console.log("==================================================");
  console.log("ℹ️  GEMINI_API_KEY কনফিগার করা হয়নি।");
  console.log("👉 অনুগ্রহ করে '.env' ফাইলে আপনার Google AI Studio API Key দিন।\n");
  console.log("💡 [Function Calling এর ডিক্লারেশন ও লুপ কোড]:");
  console.log(`
  const tools = [{
    functionDeclarations: [
      {
        name: "getLiveWeather",
        description: "Get real-time weather information for a specific city.",
        parameters: {
          type: "OBJECT",
          properties: { city: { type: "STRING" } },
          required: ["city"]
        }
      }
    ]
  }];
  const chat = model.startChat({ tools });
  const response = await chat.sendMessage("What is the weather in Dhaka?");
  const functionCall = response.response.functionCalls()[0];
  // আপনার নোডজেএস ফাংশন রান করে রেজাল্ট ফেরত পাঠানো:
  const result = getLiveWeather(functionCall.args);
  await chat.sendMessage([{ functionResponse: { name: functionCall.name, response: result } }]);
  `);
  process.exit(0);
}

const genAI = new GoogleGenerativeAI(apiKey);

// ২. টুল ডিক্লারেশন (মডেলকে ফাংশনের স্কিমা জানানো)
const weatherFunctionDeclaration = {
  name: "getLiveWeather",
  description: "Get current weather updates for a specific city.",
  parameters: {
    type: "OBJECT",
    properties: {
      city: { type: "STRING", description: "Name of the city, e.g. Dhaka, London" },
    },
    required: ["city"],
  },
};

const currencyFunctionDeclaration = {
  name: "convertCurrency",
  description: "Convert an amount from one fiat currency to another.",
  parameters: {
    type: "OBJECT",
    properties: {
      amount: { type: "NUMBER", description: "The amount to convert" },
      from: { type: "STRING", description: "Source currency code e.g. USD, EUR" },
      to: { type: "STRING", description: "Target currency code e.g. BDT" },
    },
    required: ["amount", "from", "to"],
  },
};

// ৩. মডেল কনফিগারেশন
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  tools: [
    {
      functionDeclarations: [weatherFunctionDeclaration, currencyFunctionDeclaration],
    },
  ],
});

async function runFunctionCalling() {
  console.log("==================================================");
  console.log("🚀 Running Function Calling Demo");
  console.log("==================================================");

  const chat = model.startChat();
  const userPrompt = "What is the current weather in Dhaka, and how much is 50 USD in BDT?";

  console.log(`👤 User: "${userPrompt}"\n`);
  console.log("⏳ মডেল নির্ধারণ করছে কোন ফাংশন কল করতে হবে...");

  const response = await chat.sendMessage(userPrompt);
  const functionCalls = response.response.functionCalls();

  if (functionCalls && functionCalls.length > 0) {
    console.log(`⚡ মডেল ${functionCalls.length}টি ফাংশন কল করার অনুরোধ করেছে:\n`);

    const functionResponses = [];

    for (const call of functionCalls) {
      console.log(`🔧 Calling Tool: "${call.name}" with arguments:`, call.args);

      let toolResult = null;
      if (call.name === "getLiveWeather") {
        toolResult = getLiveWeather(call.args);
      } else if (call.name === "convertCurrency") {
        toolResult = convertCurrency(call.args);
      }

      console.log(`📥 Tool Execution Result:`, toolResult, "\n");

      functionResponses.push({
        functionResponse: {
          name: call.name,
          response: toolResult,
        },
      });
    }

    console.log("📤 ফাংশন রেজাল্ট মডেলে পাঠানো হচ্ছে...");
    const finalResponse = await chat.sendMessage(functionResponses);

    console.log("\n🤖 Final AI Synthesis:\n");
    console.log(finalResponse.response.text());
  } else {
    console.log("🤖 রেসপন্স:", response.response.text());
  }
}

runFunctionCalling();
