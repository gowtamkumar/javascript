/**
 * 01-vanilla-rag.js
 * 
 * ফ্রেমওয়ার্ক ছাড়া সরাসরি বিশুদ্ধ জাভাস্ক্রিপ্ট এবং অফিসিয়াল SDK দিয়ে RAG পাইপলাইন।
 * এর মাধ্যমে RAG এর অভ্যন্তরীণ প্রতিটা মেকানিজম সরাসরি বোঝা যায়।
 * রান করতে: node 01-vanilla-rag.js
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [path.resolve(process.cwd(), ".env"), path.resolve(import.meta.dirname, ".env")] });

const apiKey = process.env.GEMINI_API_KEY;

// কোসাইন সিমিলারিটি ক্যালকুলেশন ফাংশন
function cosineSimilarity(vecA, vecB) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return normA === 0 || normB === 0 ? 0 : dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// সিম্পল চাংকিং ইউটিলিটি
function chunkText(text, chunkSize = 150, overlap = 30) {
  const words = text.split(" ");
  const chunks = [];
  let index = 0;

  while (index < words.length) {
    const chunk = words.slice(index, index + chunkSize).join(" ");
    chunks.push(chunk);
    index += chunkSize - overlap;
  }
  return chunks;
}

if (!apiKey || apiKey === "your-gemini-api-key-here") {
  console.log("==================================================");
  console.log("📖 Vanilla JS RAG Architecture (Zero Framework)");
  console.log("==================================================");
  console.log("ℹ️  GEMINI_API_KEY কনফিগার করা হয়নি।");
  console.log("👉 অনুগ্রহ করে '.env' ফাইলে আপনার Google AI Studio API Key দিন।\n");
  console.log("💡 [RAG আর্কিটেকচারের ৩টি মূল ধাপের কোড ফ্লো]:");
  console.log(`
  1. INGESTION:
     const chunks = chunkText(companyPolicy);
     const docVectors = await Promise.all(chunks.map(chunk => getEmbedding(chunk)));

  2. RETRIEVAL:
     const queryVector = await getEmbedding(userQuestion);
     const topMatches = searchSimilar(queryVector, docVectors, topK = 2);

  3. GENERATION:
     const context = topMatches.map(m => m.text).join("\\n\\n");
     const prompt = \`Context: \${context}\\nQuestion: \${userQuestion}\\nAnswer:\`;
     const answer = await chatModel.generateContent(prompt);
  `);
  process.exit(0);
}

const genAI = new GoogleGenerativeAI(apiKey);
const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// আমাদের প্রাইভেট নলেজবেজ (যা পাবলিক এলএলএম জানে না)
const privateCompanyPolicy = `
Acme Corporation Remote Work Policy 2026:
All engineering employees are eligible to work remotely up to 3 days per week.
Remote work requests must be submitted to the direct team lead at least 48 hours in advance.
The company provides an annual home-office equipment reimbursement stipend of $800.
Employees working remotely must be online and reachable on Slack between core working hours: 10:00 AM to 4:00 PM EST.
Health insurance coverage remains 100% employer-sponsored regardless of remote or in-office status.
`;

async function getEmbedding(text) {
  const res = await embedModel.embedContent(text);
  return res.embedding.values;
}

async function runVanillaRAG() {
  console.log("==================================================");
  console.log("🚀 Running Vanilla JS RAG Pipeline");
  console.log("==================================================");

  // ১. Ingestion Phase: Chunking & Storing
  console.log("1️⃣ Ingestion: টেক্সট চাঙ্ক করা ও ভেক্টর তৈরি করা...");
  const rawChunks = chunkText(privateCompanyPolicy, 30, 10);
  const vectorStore = [];

  for (const chunk of rawChunks) {
    const vector = await getEmbedding(chunk);
    vectorStore.push({ text: chunk, embedding: vector });
  }
  console.log(`✅ ${vectorStore.length}টি চাংক এমবেডিং সহ মেমোরিতে প্রস্তুত।\n`);

  // ২. Retrieval Phase: ইউজারের প্রশ্ন
  const userQuestion = "How much stipend do I get for home-office setup and what are the core hours?";
  console.log(`2️⃣ Retrieval: ইউজারের প্রশ্ন: "${userQuestion}"`);
  console.log("⏳ কুয়েরির এমবেডিং বের করে ভেক্টর স্পেসে ম্যাচ খোঁজা হচ্ছে...");

  const queryVector = await getEmbedding(userQuestion);
  const scoredChunks = vectorStore.map((doc) => ({
    text: doc.text,
    score: cosineSimilarity(queryVector, doc.embedding),
  }));

  // সেরা ২ টি প্রাসঙ্গিক চাঙ্ক বাছাই করা
  scoredChunks.sort((a, b) => b.score - a.score);
  const retrievedContext = scoredChunks.slice(0, 2).map((c) => c.text).join("\n---\n");

  console.log("🎯 খুঁজে পাওয়া প্রাসঙ্গিক কনটেক্সট:\n", retrievedContext, "\n");

  // ৩. Generation Phase: কনটেক্সট ইনজেক্ট করে LLM দিয়ে ফাইনাল উত্তর তৈরি
  console.log("3️⃣ Generation: কনটেক্সট সহ প্রম্পট LLM-এ পাঠানো হচ্ছে...");

  const augmentedPrompt = `
You are a helpful HR Assistant. Answer the employee's question strictly based on the following retrieved policy documents.
If the information is not present in the context, respond "I don't have that information in the policy."

### CONTEXT
${retrievedContext}

### EMPLOYEE QUESTION
${userQuestion}

### ANSWER:
  `;

  const result = await chatModel.generateContent(augmentedPrompt);
  console.log("\n📝 ফাইনাল জেনারেটেড উত্তর:\n");
  console.log(result.response.text());
}

runVanillaRAG();
