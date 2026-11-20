-- ===================================================================
-- 04-pgvector-schema.sql
-- PostgreSQL + pgvector Production Schema & Queries
-- ===================================================================

-- ১. pgvector এক্সটেনশন এনাবল করা
CREATE EXTENSION IF NOT EXISTS vector;

-- ২. ডকুমেন্টস ও নলেজবেজ টেবিল তৈরি করা
DROP TABLE IF EXISTS knowledge_base;

CREATE TABLE knowledge_base (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    -- Gemini text-embedding-004 এর জন্য 768 ডাইমেনশন
    -- (OpenAI text-embedding-3-small এর ক্ষেত্রে 1536 ব্যবহার করবেন)
    embedding vector(768),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ৩. উচ্চগতির সার্চের জন্য HNSW ইনডেক্স তৈরি করা (Cosine Distance: vector_cosine_ops)
-- HNSW ইনডেক্স লাখ লাখ রো থাকলেও মিলি-সেকেন্ডে রেজাল্ট এনে দেয়
CREATE INDEX IF NOT EXISTS knowledge_base_embedding_hnsw_idx 
ON knowledge_base 
USING hnsw (embedding vector_cosine_ops);

-- ৪. সিম্পল ইনসার্ট উদাহরণ (ডেমো ভেক্টর সহ)
-- INSERT INTO knowledge_base (title, content, category, embedding) 
-- VALUES ('JS Promises', 'Promises represent the eventual completion of an async operation.', 'javascript', '[0.012, -0.045, ...]');

-- ৫. সিম্যান্টিক সার্চ কুয়েরি (Cosine Distance: <=>)
-- দূরত্ব (Distance) ০ এর যত কাছে, মিল তত বেশি।
-- 1 - (embedding <=> $query_vector) দিলে 0 থেকে 1 এর মধ্যে Similarity Score পাওয়া যায়।
/*
SELECT 
    id,
    title,
    content,
    category,
    1 - (embedding <=> $1) AS similarity_score
FROM knowledge_base
WHERE 1 - (embedding <=> $1) > 0.65 -- শুধু ৬৫% এর বেশি মিল থাকা ডকুমেন্ট
ORDER BY embedding <=> $1 ASC
LIMIT 5;
*/

-- ৬. হাইব্রিড ফিল্টারিং (মেটাডেটা + ভেক্টর সার্চ একসাথে!)
/*
SELECT id, title, content
FROM knowledge_base
WHERE category = 'javascript'
ORDER BY embedding <=> $1 ASC
LIMIT 3;
*/
