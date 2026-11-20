/**
 * 05-pgvector-node.js
 * 
 * Node.js থেকে PostgreSQL এবং pgvector ব্যবহার করে এন্ড-টু-এন্ড সিম্যান্টিক সার্চ।
 * লাইব্রেরি: pg (node-postgres) এবং pgvector
 * রান করতে: node 05-pgvector-node.js
 */

import pg from "pg";
import pgvector from "pgvector/pg";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: [path.resolve(process.cwd(), ".env"), path.resolve(import.meta.dirname, ".env")] });

const dbUrl = process.env.DATABASE_URL;
const geminiApiKey = process.env.GEMINI_API_KEY;

if (!dbUrl || dbUrl === "postgresql://postgres:password@localhost:5432/vectordb") {
  console.log("==================================================");
  console.log("🐘 PostgreSQL & pgvector Node.js Architecture");
  console.log("==================================================");
  console.log("ℹ️  DATABASE_URL কনফিগার করা হয়নি।");
  console.log("👉 আপনার লোকাল PostgreSQL, Supabase বা Docker ইনস্ট্যান্সে pgvector যুক্ত করে '.env' ফাইলে DATABASE_URL দিন।\n");
  console.log("💡 [Node.js + pgvector মূল কোড ডেমো]:");
  console.log(`
  import pg from "pg";
  import pgvector from "pgvector/pg";

  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  pool.on("connect", async (client) => {
    await pgvector.registerType(client);
  });

  // ভেক্টর ইনসার্ট করা:
  await pool.query(
    "INSERT INTO knowledge_base (title, content, embedding) VALUES ($1, $2, $3)",
    ["Express Intro", "Express is a minimal Node.js framework", pgvector.toSql(embeddingVector)]
  );

  // সিম্যান্টিক সার্চ কুয়েরি (Cosine Distance <=>):
  const res = await pool.query(\`
    SELECT id, title, content, 1 - (embedding <=> $1) AS similarity
    FROM knowledge_base
    ORDER BY embedding <=> $1 ASC
    LIMIT 3;
  \`, [pgvector.toSql(queryEmbeddingVector)]);
  console.log(res.rows);
  `);
  process.exit(0);
}

// ডাটাবেজ পুল সেটআপ
const pool = new pg.Pool({ connectionString: dbUrl });

// pgvector টাইপ রেজিস্টার
pool.on("connect", async (client) => {
  await pgvector.registerType(client);
});

// Gemini Embedding মডেল
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;
const embeddingModel = genAI ? genAI.getGenerativeModel({ model: "text-embedding-004" }) : null;

async function getEmbedding(text) {
  if (!embeddingModel) {
    throw new Error("GEMINI_API_KEY প্রয়োজন!");
  }
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

async function runPgVectorSearch() {
  try {
    console.log("🔌 PostgreSQL এর সাথে সংযোগ স্থাপন করা হচ্ছে...");
    
    // ১. টেবিল ও এক্সটেনশন ইনিশিয়ালাইজ করা
    await pool.query("CREATE EXTENSION IF NOT EXISTS vector;");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS knowledge_base (
        id BIGSERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(50),
        embedding vector(768)
      );
    `);

    console.log("✅ pgvector এক্সটেনশন এবং টেবিল রেডি!");

    // ২. স্যাম্পল ডকুমেন্ট ইনসার্ট করা (যদি খালি থাকে)
    const countCheck = await pool.query("SELECT COUNT(*) FROM knowledge_base");
    if (parseInt(countCheck.rows[0].count) === 0) {
      console.log("📦 প্রাথমিক জ্ঞানভাণ্ডার ডেটা ইনসার্ট করা হচ্ছে...");

      const initialArticles = [
        { title: "Node.js Event Loop", content: "The event loop allows Node.js to perform non-blocking I/O operations.", category: "backend" },
        { title: "React State Management", content: "React components use useState and useReducer hooks for state.", category: "frontend" },
        { title: "PostgreSQL ACID Properties", content: "Postgres guarantees Atomicity, Consistency, Isolation, and Durability.", category: "database" }
      ];

      for (const item of initialArticles) {
        const vector = await getEmbedding(item.content);
        await pool.query(
          "INSERT INTO knowledge_base (title, content, category, embedding) VALUES ($1, $2, $3, $4)",
          [item.title, item.content, item.category, pgvector.toSql(vector)]
        );
      }
      console.log("✅ ৩টি ডকুমেন্ট সফলভাবে ইনসার্ট করা হয়েছে!");
    }

    // ৩. সিম্যান্টিক সার্চ কুয়েরি
    const userQuery = "How does asynchronous non-blocking I/O work on the server?";
    console.log(`\n🔍 Search Query: "${userQuery}"`);
    console.log("⏳ কুয়েরির এমবেডিং বের করা হচ্ছে...");

    const queryVector = await getEmbedding(userQuery);

    console.log("⚡ pgvector এ Cosine Distance (<=>) সার্চ চালানো হচ্ছে...");
    const searchSql = `
      SELECT id, title, content, category, 1 - (embedding <=> $1) AS similarity_score
      FROM knowledge_base
      ORDER BY embedding <=> $1 ASC
      LIMIT 2;
    `;

    const searchResult = await pool.query(searchSql, [pgvector.toSql(queryVector)]);

    console.log("\n🎯 সেরা ফলাফলসমূহ:");
    searchResult.rows.forEach((row, i) => {
      console.log(`\nRank #${i + 1}:`);
      console.log(`- Title: ${row.title}`);
      console.log(`- Category: ${row.category}`);
      console.log(`- Content: ${row.content}`);
      console.log(`- Similarity: ${(row.similarity_score * 100).toFixed(2)}%`);
    });

  } catch (error) {
    console.error("❌ এরর:", error.message);
  } finally {
    await pool.end();
  }
}

runPgVectorSearch();
