/**
 * 01-cosine-similarity-math.js
 * 
 * ভেক্টর সিমিলারিটির বিশুদ্ধ গাণিতিক ইমপ্লিমেন্টেশন (Zero external library).
 * রান করতে: node 01-cosine-similarity-math.js
 */

/**
 * দুটি ভেক্টরের ডট প্রোডাক্ট (Dot Product)
 */
export function dotProduct(vecA, vecB) {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}

/**
 * ভেক্টরের দৈর্ঘ্য বা ম্যাগনিটিউড (Norm / Magnitude)
 */
export function magnitude(vec) {
  let sumOfSquares = 0;
  for (let i = 0; i < vec.length; i++) {
    sumOfSquares += vec[i] * vec[i];
  }
  return Math.sqrt(sumOfSquares);
}

/**
 * কোসাইন সিমিলারিটি (Cosine Similarity)
 * ফর্মুলা: (A · B) / (||A|| * ||B||)
 * আউটপুট: -1 থেকে +1 (1 মানে সম্পূর্ণ সদৃশ)
 */
export function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error("ভেক্টর দুটির দৈর্ঘ্য সমান হতে হবে!");
  }
  const dot = dotProduct(vecA, vecB);
  const magA = magnitude(vecA);
  const magB = magnitude(vecB);

  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

/**
 * কোসাইন ডিসট্যান্স (Cosine Distance)
 * pgvector এর `<=>` অপারেটর মূলত এই মান বের করে।
 * ফর্মুলা: 1 - Cosine Similarity
 * আউটপুট: 0 মানে একদম সদৃশ, দূরত্ব যত কম মিল তত বেশি।
 */
export function cosineDistance(vecA, vecB) {
  return 1 - cosineSimilarity(vecA, vecB);
}

/**
 * ইউক্লিডীয় দূরত্ব (Euclidean Distance / L2)
 * pgvector এর `<->` অপারেটর
 */
export function euclideanDistance(vecA, vecB) {
  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    sum += Math.pow(vecA[i] - vecB[i], 2);
  }
  return Math.sqrt(sum);
}

// ==========================================
// সরাসরি রান করলে ডেমো এক্সিকিউট হবে
// ==========================================
import { fileURLToPath } from "url";

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("==================================================");
  console.log("📐 Vector Similarity Math Demo");
  console.log("==================================================");

  // ধরুন ৩টি ধারণার কাল্পনিক ভেক্টর (3D Space ডেমো)
  // [Tech-oriented, Frontend-oriented, Fruit-oriented]
  const vectorReact = [0.95, 0.90, 0.05];
  const vectorVue   = [0.90, 0.88, 0.02];
  const vectorApple = [0.10, 0.05, 0.98]; // ফল

  console.log("1. React vs Vue (উভয়ই ফ্রন্টএন্ড টেকনোলজি):");
  const simReactVue = cosineSimilarity(vectorReact, vectorVue);
  const distReactVue = cosineDistance(vectorReact, vectorVue);
  console.log(`   - Cosine Similarity: ${(simReactVue * 100).toFixed(2)}% মিল`);
  console.log(`   - Cosine Distance (<=>): ${distReactVue.toFixed(4)} (দূরত্ব খুবই কম)\n`);

  console.log("2. React vs Apple (টেকনোলজি বনাম ফল):");
  const simReactApple = cosineSimilarity(vectorReact, vectorApple);
  const distReactApple = cosineDistance(vectorReact, vectorApple);
  console.log(`   - Cosine Similarity: ${(simReactApple * 100).toFixed(2)}% মিল`);
  console.log(`   - Cosine Distance (<=>): ${distReactApple.toFixed(4)} (দূরত্ব অনেক বেশি)\n`);

  console.log("💡 সিদ্ধান্ত: ভেক্টর স্পেসে কাছাকাছি ধারণার ভেক্টরগুলোর ডিসট্যান্স শূন্যের কাছাকাছি থাকে!");
}
