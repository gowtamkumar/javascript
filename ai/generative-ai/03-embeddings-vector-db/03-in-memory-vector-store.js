/**
 * 03-in-memory-vector-store.js
 * 
 * ইন-মেমরি ভেক্টর ডাটাবেজ সিস্টেম (Pure JavaScript Vector Store)
 * এটি দিয়ে ভেক্টর ডেটাবেজ কীভাবে কাজ করে তা বাহ্যিক কোনো ডিবি ছাড়াই বোঝা যায়।
 * রান করতে: node 03-in-memory-vector-store.js
 */

import { cosineSimilarity } from "./01-cosine-similarity-math.js";

/**
 * ইন-মেমরি ভেক্টর ডাটাবেজ ক্লাস
 */
class InMemoryVectorStore {
  constructor() {
    this.documents = []; // { id, text, metadata, embedding }
  }

  // ভেক্টর ও ডকুমেন্ট যুক্ত করা
  addDocument({ id, text, metadata = {}, embedding }) {
    if (!embedding || !Array.isArray(embedding)) {
      throw new Error("ভ্যালিড এমবেডিং ভেক্টর প্রয়োজন!");
    }
    this.documents.push({ id, text, metadata, embedding });
  }

  // সিমিলারিটি সার্চ (Top-K Nearest Neighbors)
  similaritySearch(queryVector, { topK = 3, minScore = 0.0 } = {}) {
    const scoredDocs = this.documents.map((doc) => {
      const score = cosineSimilarity(queryVector, doc.embedding);
      return {
        ...doc,
        similarity: score,
      };
    });

    // বেশি মিল থেকে কম মিল ক্রমানুসারে সাজানো
    return scoredDocs
      .filter((doc) => doc.similarity >= minScore)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
  }
}

// ==========================================
// টেস্ট ও ডেমো এক্সিকিউশন
// ==========================================
console.log("==================================================");
console.log("🧠 In-Memory Vector Database Demo");
console.log("==================================================");

const store = new InMemoryVectorStore();

// কাল্পনিক ৩-ডাইমেনশনাল ভেক্টর ডেটাসেট
// [Programming, Web/Browser, Cooking]
store.addDocument({
  id: 1,
  text: "React is a JavaScript library for building user interfaces.",
  metadata: { category: "frontend" },
  embedding: [0.90, 0.95, 0.01],
});

store.addDocument({
  id: 2,
  text: "Node.js allows you to run JavaScript on the backend server.",
  metadata: { category: "backend" },
  embedding: [0.92, 0.60, 0.02],
});

store.addDocument({
  id: 3,
  text: "How to bake a chocolate cake with butter and sugar.",
  metadata: { category: "cooking" },
  embedding: [0.01, 0.02, 0.98],
});

store.addDocument({
  id: 4,
  text: "CSS Flexbox and Grid are essential for responsive web design.",
  metadata: { category: "frontend" },
  embedding: [0.50, 0.92, 0.01],
});

// ইউজারের সার্চ কুয়েরি: "Web UI component styling"
// কুয়েরি ভেক্টর (হাইলি ওয়েব এবং কিছুটা প্রোগ্রামিং সম্পর্কিত):
const queryVector = [0.70, 0.95, 0.01];

console.log("🔍 Search Query Vector: [0.70, 0.95, 0.01] (Theme: Web Frontend/UI)");
console.log("⏳ ভেক্টর সিমিলারিটি অনুযায়ী সেরা রেজাল্ট খোঁজা হচ্ছে...\n");

const results = store.similaritySearch(queryVector, { topK: 2, minScore: 0.5 });

results.forEach((res, index) => {
  console.log(`Rank #${index + 1}:`);
  console.log(`  - Text: "${res.text}"`);
  console.log(`  - Category: ${res.metadata.category}`);
  console.log(`  - Similarity Score: ${(res.similarity * 100).toFixed(2)}%\n`);
});
