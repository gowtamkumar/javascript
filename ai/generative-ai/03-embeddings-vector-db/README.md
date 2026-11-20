# Phase 3: Embeddings & Vector Databases with pgvector (A to Z Guide)

> **লক্ষ্য:** একজন JavaScript / Node.js ডেভেলপার হিসেবে Embeddings-এর গভীরে প্রবেশ করা, ভেক্টর সিমিলারিটি ম্যাথ শেখা এবং PostgreSQL-এর **pgvector** এক্সটেনশন ব্যবহার করে প্রোডাকশন-রেডি সিম্যান্টিক সার্চ ইঞ্জিন ও ভেক্টর ডেটাবেজ সিস্টেম আর্কিটেকচার আয়ত্ত করা।

---

## সূচিপত্র (Table of Contents)
1. [Embedding কী এবং কেন প্রয়োজন? (A to Z)](#১-embedding-কী-এবং-কেন-প্রয়োজন)
2. [কীওয়ার্ড সার্চ (SQL LIKE) বনাম সিম্যান্টিক ভেক্টর সার্চ](#২-কীওয়ার্ড-সার্চ-বনাম-সিম্যান্টিক-ভেক্টর-সার্চ)
3. [ভেক্টর সিমিলারিটির গণিত (Cosine Similarity & Distance)](#৩-ভেক্টর-সিমিলারিটির-গণিত)
4. [JavaScript দিয়ে Embedding জেনারেট করা (Gemini text-embedding-004)](#৪-javascript-দিয়ে-embedding-জেনারেট-করা)
5. [pgvector কী এবং কেন JS ডেভেলপারদের প্রথম পছন্দ?](#৫-pgvector-কী-এবং-কেন-js-ডেভেলপারদের-পছন্দ)
6. [PostgreSQL এ pgvector সেটআপ ও কনফিগারেশন](#৬-postgresql-এ-pgvector-সেটআপ)
7. [pgvector এর অপারেটরসমূহ (`<=>`, `<->`, `<#>`)](#৭-pgvector-এর-অপারেটরসমূহ)
8. [ভেক্টর ইনডেক্সিং: HNSW বনাম IVFFlat](#৮-ভেক্টর-ইনডেক্সিং-hnsw-বনাম-ivfflat)
9. [Node.js (node-postgres / pgvector) দিয়ে ডেটা ইনসার্ট ও কুয়েরি](#৯-nodejs-দিয়ে-pgvector-ইম্প্লিমেন্টেশন)
10. [ORM সাপোর্ট: Prisma ও Drizzle দিয়ে pgvector](#১০-orm-সাপোর্ট-prisma-ও-drizzle)
11. [প্রোডাকশন চেকলিস্ট ও পারফরম্যান্স টিপস](#১১-প্রোডাকশন-চেকলিস্ট)

---

## ১. Embedding কী এবং কেন প্রয়োজন?

কম্পিউটার বা এআই মডেল কখনো সরাসরি টেক্সটের অর্থ বোঝে না; তারা বোঝে **সংখ্যা (Numbers)**।

> **Text Embedding** হলো একটি টেক্সটকে (শব্দ, বাক্য বা সম্পূর্ণ প্যারাগ্রাফ) একটি নির্দিষ্ট দৈর্ঘ্যের ভাসমান সংখ্যার অ্যারে বা লিস্টে (**High-dimensional Floating Point Vector**) রূপান্তর করার প্রক্রিয়া।

উদাহরণস্বরূপ, Gemini-র `text-embedding-004` মডেল প্রতিটি টেক্সটের জন্য **৭৬৮টি ডাইমেনশন (Dimensions)** বিশিষ্ট একটি ভেক্টর দেয়:
```javascript
"JavaScript asynchronous programming" ➔ [0.0124, -0.0451, 0.0892, ..., 0.0031] // মোট ৭৬৮ টি সংখ্যা
```

### জ্যামিতিক অর্থ (Semantic Space):
এই ৭৬৮টি সংখ্যা আসলে একটি বিশাল বহু-মাত্রিক স্থানের (Multidimensional Space) স্থানাঙ্ক (Coordinates)।
- কাছাকাছি অর্থের শব্দ বা বাক্যগুলো এই স্পেসে **খুব কাছাকাছি অবস্থান করে**।
- ভিন্ন অর্থের শব্দগুলো অনেক দূরে অবস্থান করে।

```
        ▲  Semantic Space
        │
        │     ● "React.js"
        │     ● "Vue.js"        (কাছাকাছি অবস্থান: ফ্রন্টএন্ড ফ্রেমওয়ার্ক)
        │
        │
        │                       ● "Elephant"
        │                       ● "Tiger"     (কাছাকাছি অবস্থান: প্রাণী)
        └────────────────────────►
```

---

## ২. কীওয়ার্ড সার্চ বনাম সিম্যান্টিক ভেক্টর সার্চ

একজন ফুলস্ট্যাক ডেভেলপার হিসেবে ঐতিহ্যবাহী ডেটাবেজে আমরা কীভাবে সার্চ করি?
```sql
SELECT * FROM articles WHERE content ILIKE '%car repair%';
```

### ট্র্যাডিশনাল SQL সার্চের সমস্যা:
- যদি আর্টিকেলে লেখা থাকে: *"automobile maintenance"* বা *"vehicle mechanic"*, তাহলে `ILIKE '%car repair%'` কুয়েরি কোনো রেজাল্ট পাবে না!
- অথচ মানুষের ভাষায় এই সবগুলোর অর্থ প্রায় একই।

### ভেক্টর সার্চের জাদু (Semantic Search):
ভেক্টর সার্চ শব্দের বানান নয়, বরং শব্দের **ভেতরের অর্থ (Semantic Meaning)** মিলিয়ে সার্চ করে:
- "Car repair" এর ভেক্টর এবং "Automobile maintenance" এর ভেক্টরের মধ্যে দূরত্বের পার্থক্য প্রায় শূন্য!
- ফলে ইউজার যা-ই টাইপ করুক, সঠিক তথ্যটি নির্ভুলভাবে খুঁজে পাওয়া যায়।

---

## ৩. ভেক্টর সিমিলারিটির গণিত (Vector Similarity Math)

দুটি ভেক্টর কতটা কাছাকাছি বা একরকম, তা পরিমাপের জন্য প্রধানত ৩টি অ্যালগরিদম ব্যবহৃত হয়:

### ৩.১ Cosine Similarity (সবচেয়ে জনপ্রিয়)
দুটি ভেক্টরের মধ্যকার কোণ ($\theta$) নির্ণয় করে তাদের মিল যাচাই করা হয়।
- মান রেঞ্জ: `-1` থেকে `1` (বা নরম্যালাইজড ভেক্টরে `0` থেকে `1`)।
- `1` মানে শতভাগ একই অর্থ, `0` মানে কোনো সম্পর্ক নেই।

$$\text{Cosine Similarity} = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|} = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \sqrt{\sum_{i=1}^{n} B_i^2}}$$

### খাঁটি জাভাস্ক্রিপ্টে Cosine Similarity ফাংশন:
```javascript
export function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

### ৩.২ অন্যান্য মেট্রিক্স:
- **Euclidean Distance ($L2$ Distance):** ইউক্লিডীয় সরাসরি সরলরেখার দূরত্ব। মান যত কম, মিল তত বেশি।
- **Dot Product (Inner Product):** দুটি ভেক্টরের গুণফলের সমষ্টি (ভেক্টর যদি ইউনিট নরম্যালাইজড হয়, তবে ডট প্রোডাক্ট আর কোসাইন সিমিলারিটি একই)।

---

## ৪. JavaScript দিয়ে Embedding জেনারেট করা

Google Gemini-এর অফিসিয়াল মডেল `text-embedding-004` দিয়ে Node.js-এ ভেক্টর তৈরি করা:

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// text-embedding-004 মডেল
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

async function createEmbedding(text) {
  const result = await embeddingModel.embedContent(text);
  const vector = result.embedding.values; // 768 floating point numbers
  return vector;
}

const vector = await createEmbedding("Node.js event loop explained");
console.log(`Vector Length: ${vector.length}`); // 768
```

---

## ৫. pgvector কী এবং কেন JS ডেভেলপারদের প্রথম পছন্দ?

Pinecone, Qdrant বা Weaviate-এর মতো আলাদা ডেডিকেটেড ভেক্টর ডেটাবেজ ব্যবহারের অনেক ঝক্কি রয়েছে:
1. নতুন ডাটাবেজ সার্ভিস ম্যানেজ করার ঝামেলা।
2. প্রতি মাসে অতিরিক্ত বিল ও সাবস্ক্রিপশন।
3. আপনার বিজনেস ডেটা (Users, Orders, Posts) থাকে PostgreSQL-এ, আর ভেক্টর থাকে অন্য ডাটাবেজে; ফলে ডেটা সিঙ্ক করা ও ট্রানজাকশন মেনটেইন করা কঠিন হয়ে পড়ে।

### সমাধান: `pgvector`
`pgvector` হলো PostgreSQL-এর একটি ওপেন-সোর্স এক্সটেনশন যা সাধারণ পোস্টগ্রেস ডেটাবেজকেই একটি হাই-পারফরম্যান্স **Vector Database**-এ রূপান্তর করে।

> **লাভ:** আপনার একই ডেটাবেজ টেবিলে সাধারণ কলাম (`id`, `title`, `user_id`, `created_at`) এবং ভেক্টর কলাম (`embedding vector(768)`) একসাথে থাকে! আপনি একটিমাত্র SQL কুয়েরিতে রিলেশনাল ফিল্টারিং এবং ভেক্টর সিমিলারিটি সার্চ একসাথে করতে পারেন!

---

## ৬. PostgreSQL এ pgvector সেটআপ

### ৬.১ এক্সটেনশন এনাবল করা:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### ৬.২ টেবিল তৈরি করা:
```sql
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50),
  embedding vector(768), -- Gemini text-embedding-004 এর জন্য 768 ডাইমেনশন
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## ৭. pgvector এর অপারেটরসমূহ

pgvector সিমিলারিটি ক্যালকুলেট করার জন্য ৩টি কাস্টম SQL অপারেটর প্রদান করে:

| অপারেটর | মেট্রিক | দূরত্ব পরিমাপ | কখন ব্যবহার করবেন? |
| :---: | :--- | :--- | :--- |
| `<=>` | **Cosine Distance** | $1 - \text{Cosine Similarity}$ | **টেক্সট ও ন্যাচারাল ল্যাঙ্গুয়েজ সার্চের জন্য এটি ডিফল্ট ও সেরা।** মান ০ এর যত কাছে, মিল তত বেশি। |
| `<->` | **L2 Distance (Euclidean)** | ইউক্লিডীয় দূরত্ব $\sqrt{\sum (A_i - B_i)^2}$ | ইমেজ এমবেডিং বা ফিক্সড স্কেলের স্পেশিয়াল ফিচারের জন্য। |
| `<#>` | **Negative Inner Product** | $-(\mathbf{A} \cdot \mathbf{B})$ | যদি ভেক্টরগুলো আগেই নরম্যালাইজড করা থাকে এবং হাই স্পিড ডট প্রোডাক্ট চান। |

### সিমিলারিটি কুয়েরি উদাহরণ:
```sql
-- ইউজারের সার্চ প্রম্পটের ভেক্টরের সাথে সবচেয়ে মিল থাকা সেরা ৫টি ডকুমেন্ট আনা
SELECT 
  id, 
  title, 
  content, 
  1 - (embedding <=> '[0.012, -0.045, ...]') AS similarity_score
FROM documents
ORDER BY embedding <=> '[0.012, -0.045, ...]' ASC
LIMIT 5;
```

---

## ৮. ভেক্টর ইনডেক্সিং: HNSW বনাম IVFFlat

টেবিলে হাজার হাজার বা লাখ লাখ ভেক্টর থাকলে প্রতিবার প্রতিটা রো-এর সাথে ভেক্টর তুলনা করা (Sequential Scan) অনেক ধীরগতির হয়ে যায়। এজন্য পোস্টগ্রেসে ইনডেক্স ব্যবহার করা হয়:

### ৮.১ HNSW (Hierarchical Navigable Small World) - **(প্রস্তাবিত)**
- সবচেয়ে দ্রুতগতির এবং সর্বোচ্চ অ্যাকুরেসি দেয়।
- মেমোরি কিছুটা বেশি নেয় কিন্তু প্রোডাকশনের জন্য এটি গোল্ড স্ট্যান্ডার্ড।

```sql
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);
```

### ৮.২ IVFFlat (Inverted File Flat)
- ক্লাস্টারিং এর মাধ্যমে স্পেস ভাগ করে সার্চ করে।
- মেমোরি কম নেয়, কিন্তু অ্যাকুরেসি HNSW-এর চেয়ে কিছুটা কম এবং ডেটা ইনসার্ট করার পর বিল্ড করতে হয়।

---

## ৯. Node.js (node-postgres / pgvector) দিয়ে ইমপ্লিমেন্টেশন

আমরা `pg` (node-postgres) এবং অফিসিয়াল `pgvector` npm প্যাকেজ ব্যবহার করে সংযোগ করি:

```javascript
import pg from "pg";
import pgvector from "pgvector/pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// ক্লায়েন্টে pgvector টাইপ রেজিস্টার করা
pool.on("connect", async (client) => {
  await pgvector.registerType(client);
});

// ভেক্টর দিয়ে সিম্যান্টিক সার্চ কুয়েরি
async function searchSimilarDocuments(queryVector, limit = 5) {
  const sql = `
    SELECT id, title, content, 1 - (embedding <=> $1) AS similarity
    FROM documents
    WHERE 1 - (embedding <=> $1) > 0.65 -- শুধু ৬৫% এর বেশি মিল থাকা রেজাল্ট
    ORDER BY embedding <=> $1 ASC
    LIMIT $2;
  `;
  const res = await pool.query(sql, [pgvector.toSql(queryVector), limit]);
  return res.rows;
}
```

---

## ১০. ORM সাপোর্ট: Prisma ও Drizzle

### Prisma-তে pgvector:
`schema.prisma`:
```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [vector]
}

model Document {
  id        Int                    @id @default(autoincrement())
  title     String
  content   String
  embedding Unsupported("vector(768)")?
}
```

Prisma-তে ভেক্টর সার্চ সাধারণত `$queryRaw` দিয়ে করা হয়:
```javascript
const results = await prisma.$queryRaw`
  SELECT id, title, content, 1 - (embedding <=> ${vector}::vector) AS similarity
  FROM "Document"
  ORDER BY embedding <=> ${vector}::vector ASC
  LIMIT 5;
`;
```

---

## ১১. প্রোডাকশন চেকলিস্ট ও পারফরম্যান্স টিপস

1. **ডাইমেনশন মিসম্যাচ করবেন না:** যদি আপনার এমবেডিং মডেল ৭৬৮ ডাইমেনশনের হয়, তবে ডেটাবেজে `vector(768)` লিখবেন। ৭৬৮ এর ভেক্টরে ১৫৩৬ ডাইমেনশন দিলে এরর আসবে।
2. **কম্বাইন্ড ফিল্টারিং (Hybrid Query):** pgvector-এর সবচেয়ে বড় শক্তি হলো আপনি মেটাডেটা ফিল্টার করতে পারেন:
   ```sql
   SELECT * FROM documents 
   WHERE user_id = 123 AND category = 'tech' 
   ORDER BY embedding <=> $1 LIMIT 5;
   ```
3. **Threshold ব্যবহার করুন:** অপ্রাসঙ্গিক উত্তর এড়াতে একটি মিনিমাম সিমিলারিটি স্কোর থ্রেশহোল্ড (যেমন `> 0.6` বা `> 0.7`) ফিল্টার হিসেবে দিন।
4. **ইন-মেমরি ডেমো দিয়ে কনসেপ্ট ক্লিয়ার করুন:** ক্লাউড ডাটাবেজ ছাড়া লোকাল কনসেপ্ট বুঝতে `03-in-memory-vector-store.js` চালান।
