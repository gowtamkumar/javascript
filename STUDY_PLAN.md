# 📚 Comprehensive Job Preparation Study Plan & Topic Checklist

> **Target Role:** Mid-to-Senior Backend / Full Stack Engineer (Node.js • NestJS • TypeScript • PostgreSQL)  
> **Purpose:** ইন্টারভিউ ক্র্যাক করার জন্য ঠিক যে যে টেকনিক্যাল টপিক রিভিশন দেওয়া ও আয়ত্ত করা প্রয়োজন—তার সম্পূর্ণ চেকলিস্ট।  
> **How to Use:** প্রতিটি সেকশনের টপিকগুলো পড়ে বুঝবে এবং প্রস্তুতি সম্পন্ন হলে চেকবক্স টিক (`[x]`) করবে।

---

## 📑 সূচিপত্র (Table of Contents)
1. [JavaScript Core & Internals](#1-javascript-core--internals)
2. [TypeScript Mastery](#2-typescript-mastery)
3. [Node.js Architecture & Runtime](#3-nodejs-architecture--runtime)
4. [NestJS Framework & Architecture](#4-nestjs-framework--architecture)
5. [Database: PostgreSQL Mastery](#5-database-postgresql-mastery)
6. [Caching & In-Memory: Redis](#6-caching--in-memory-redis)
7. [API Design, Security & Auth](#7-api-design-security--auth)
8. [System Design & Distributed Concepts](#8-system-design--distributed-concepts)
9. [DevOps & Containerization (Docker)](#9-devops--containerization-docker)
10. [Data Structures, Algorithms & Practical JS Coding](#10-data-structures-algorithms--practical-js-coding)
11. [Live Project Defense & Behavioral (STAR Method)](#11-live-project-defense--behavioral-star-method)

---

## 1. JavaScript Core & Internals
ইন্টারভিউয়াররা সিনিয়র ডেভেলপারদের JS ফান্ডামেন্টালসে গভীরতা যাচাই করে।

- [ ] **Execution Context & Call Stack**
  - [ ] Creation Phase (Memory Allocation) vs Execution Phase
  - [ ] Variable Environment vs Lexical Environment
  - [ ] Hoisting: `var` vs `let` / `const`, Temporal Dead Zone (TDZ), Function declaration vs Function expression
- [ ] **Scoping & Closures**
  - [ ] Lexical Scope & Scope Chain
  - [ ] Closures: মেমরি কীভাবে রিটেন করে, Practical use-cases (Data privacy, Currying, Factory functions, Memoization)
  - [ ] Closures-এর কারণে মেমরি লিকের ঝুঁকি ও সমাধান
- [ ] **`this` Keyword & Object Prototypes**
  - [ ] `this` binding rules: Default, Implicit, Explicit (`call`, `apply`, `bind`), `new` keyword
  - [ ] Arrow function-এ `this` কেন Lexical
  - [ ] Prototypal Inheritance: `__proto__` vs `prototype`, Prototype chain
  - [ ] ES6 `class` সিনট্যাক্স বনাম Prototype-ভিত্তিক অবজেক্ট তৈরি
- [ ] **Asynchronous JavaScript & Event Loop**
  - [ ] Single-threaded মডেল কীভাবে Asynchronous অপারেশন হ্যান্ডেল করে
  - [ ] Call Stack, Callback Queue (Macrotask) vs Microtask Queue (`Promise`, `queueMicrotask`, `process.nextTick`)
  - [ ] Event loop execution order: কোন টাস্ক কার আগে এক্সিকিউট হয়
  - [ ] Promises: States (Pending, Fulfilled, Rejected), Chaining, Error Handling
  - [ ] Promise Combinators: `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, `Promise.any()` (প্রত্যেকটির পার্থক্য ও ফেইলিউর হ্যান্ডলিং)
  - [ ] `async/await`: সিনট্যাকটিক সুগার বনাম জেনারেটর/প্রমিজ, `try/catch` সেরা প্র্যাকটিস
- [ ] **V8 Engine & Memory Management**
  - [ ] Memory Heap vs Call Stack
  - [ ] Garbage Collection (GC): Mark-and-Sweep অ্যালগরিদম, Scavenge / Generational GC (Young vs Old Generation)
  - [ ] মেমরি লিকের সাধারণ কারণ: Detached DOM/Objects, Forgotten Event Listeners, Global variables, Uncleared Intervals

---

## 2. TypeScript Mastery
এন্টারপ্রাইজ লেভেলে টাইপসেফ কোড লেখার দক্ষতা যাচাই করা হয়।

- [ ] **Type System Basics vs Advanced**
  - [ ] Primitive types, Type inference, Type annotations
  - [ ] `any` vs `unknown` vs `never` (কখন কোনটা ব্যবহার করবে)
  - [ ] `interface` vs `type` alias (Declaration merging, Extensions, Unions/Primitives)
  - [ ] Literal Types, Union Types, Intersection Types (`|`, `&`)
- [ ] **Generics**
  - [ ] Generic Functions, Interfaces, and Classes
  - [ ] Generic Constraints (`T extends SomeType`)
  - [ ] Generic Defaults and multiple type parameters
- [ ] **Utility Types (মাস্ট রিভিশন)**
  - [ ] `Partial<T>`, `Required<T>`, `Readonly<T>`
  - [ ] `Pick<T, K>`, `Omit<T, K>`, `Record<K, T>`
  - [ ] `Exclude<T, U>`, `Extract<T, U>`, `NonNullable<T>`
  - [ ] `ReturnType<T>`, `Parameters<T>`, `Awaited<T>`
- [ ] **Advanced Type Manipulation**
  - [ ] Type Narrowing: `typeof`, `instanceof`, `in` operator, Custom Type Guards (`is` predicate)
  - [ ] Discriminated Unions (Tagged Unions)
  - [ ] Index Signatures, Indexed Access Types (`T[K]`), `keyof` operator
  - [ ] Mapped Types and Conditional Types (`T extends U ? X : Y`)
  - [ ] `infer` keyword দিয়ে টাইপ এক্সট্র্যাক্ট করা
- [ ] **TypeScript with Node/NestJS**
  - [ ] `tsconfig.json` অপটিমাইজেশন: `strict`, `noImplicitAny`, `target`, `moduleResolution`, `paths`
  - [ ] Decorators: Class, Method, Property, Parameter decorators কীভাবে কাজ করে

---

## 3. Node.js Architecture & Runtime
ব্যাকএন্ড ইন্টারভিউয়ের মূল হার্ট হলো Node.js-এর ইন্টারনালস।

- [ ] **Node.js Internals & Libuv**
  - [ ] V8 (JS execution) + libuv (C library for async I/O & event loop)
  - [ ] libuv Thread Pool: ডিফল্ট সাইজ (4), `UV_THREADPOOL_SIZE` পরিবর্তন কখন দরকার
  - [ ] Thread pool-এ কী চলে (`fs`, `crypto`, `zlib`, DNS lookup) বনাম কার্নেল লেভেলে কী চলে (Network I/O: epoll, kqueue)
  - [ ] `process.nextTick()` vs `setImmediate()` vs `setTimeout(fn, 0)` ফেজ ও এক্সিকিউশন অর্ডার
- [ ] **Streams & Buffers (হাই-ট্রাফিক অ্যাপ্লিকেশনের জন্য আবশ্যক)**
  - [ ] Buffer কী? Binary data ও Memory allocation কীভাবে হ্যান্ডেল করে
  - [ ] ৪ ধরনের Stream: Readable, Writable, Duplex, Transform
  - [ ] Backpressure কী এবং কীভাবে হ্যান্ডেল করতে হয় (`stream.pipe()` vs pipeline)
  - [ ] বড় ফাইল (GB scale) রিড/রাইট এবং মেমরি বাফার ক্র্যাশ না করে প্রসেস করা
- [ ] **Events & Architecture**
  - [ ] `EventEmitter` প্যাটার্ন, Custom Events তৈরি
  - [ ] Max listeners exceeded warning কেন আসে এবং কীভাবে ফিক্স করতে হয়
  - [ ] Error event handling না করলে প্রসেস ক্র্যাশ কেন হয়
- [ ] **Concurrency & Scalability in Node.js**
  - [ ] Cluster Module: Master-Worker প্রসেস, OS লেভেল পোর্ট শেয়ারিং, PM2 এর ক্লাস্টার মোড
  - [ ] Worker Threads (`worker_threads`): CPU-intensive টাস্ক (যেমন ইমেজ প্রসেসিং, বড় ক্রিপ্টো ক্যালকুলেশন) হ্যান্ডেল করা
  - [ ] Child Process: `spawn`, `exec`, `execFile`, `fork` (পার্থক্য ও ব্যবহারের ক্ষেত্র)
- [ ] **Production Readiness & Debugging**
  - [ ] Graceful Shutdown: `SIGTERM`, `SIGINT` হ্যান্ডলিং, ডাটাবেজ কানেকশন ক্লোজ করা, একটিভ রিকোয়েস্ট ড্রেন করা
  - [ ] Uncaught Exceptions (`uncaughtException`, `unhandledRejection`) ম্যানেজমেন্ট
  - [ ] CPU Profiling ও Memory Leaks ডিটেকশন (Node inspector, Heapdump, Clinic.js)

---

## 4. NestJS Framework & Architecture
সিনিয়র ব্যাকএন্ড রোলে ক্লিন আর্কিটেকচার ও NestJS প্যাটার্নস খুব বেশি জানতে চাওয়া হয়।

- [ ] **Core Architecture & Design Patterns**
  - [ ] Inversion of Control (IoC) এবং Dependency Injection (DI)
  - [ ] Injection Scopes: `DEFAULT` (Singleton), `REQUEST` (Per-request), `TRANSIENT` (New instance) — কখন কোনটা ব্যবহার করা উচিত এবং পারফরম্যান্স ইমপ্যাক্ট
  - [ ] Circular Dependency সমাধান: `forwardRef()`
- [ ] **Request-Response Lifecycle (সিরিয়াল অনুযায়ী মনে রাখতে হবে)**
  - [ ] `Incoming Request`
  - [ ] 1. Middleware (Global / Module bound)
  - [ ] 2. Guards (Authentication & RBAC / Permissions)
  - [ ] 3. Interceptors (Pre-controller logic)
  - [ ] 4. Pipes (DTO Validation & Transformation - `class-validator`, `class-transformer`)
  - [ ] 5. Controller (Route Handler)
  - [ ] 6. Service (Business Logic)
  - [ ] 7. Interceptors (Post-controller serialization & response formatting)
  - [ ] 8. Exception Filters (Catching and formatting errors - Global / Controller / Route)
- [ ] **Modules & Structure**
  - [ ] Feature Modules, Shared Modules, Global Modules (`@Global()`)
  - [ ] Dynamic Modules: `register()`, `forRoot()`, `forFeature()` কীভাবে কাজ করে
  - [ ] Custom Providers: `useClass`, `useValue`, `useFactory`, `useExisting`
- [ ] **Database & ORM Integration (TypeORM / Prisma)**
  - [ ] Entities, Repositories, Custom Repositories
  - [ ] Migrations চালানো ও প্রোডাকশন রোলব্যাক স্ট্র্যাটেজি
  - [ ] Transactions: `QueryRunner` দিয়ে ACID লেনদেন পরিচালনা
  - [ ] Relations (1:1, 1:N, N:M) এবং Lazy vs Eager loading
  - [ ] N+1 Query Problem আইডেন্টিফাই এবং সমাধান (`leftJoinAndSelect`, Dataloader)
- [ ] **Asynchronous Processing in NestJS**
  - [ ] NestJS Queues: Bull / BullMQ (Redis-backed job queue)
  - [ ] Event Emitter in NestJS (`@nestjs/event-emitter`)
  - [ ] Cron Jobs & Scheduled Tasks (`@nestjs/schedule`)
- [ ] **Testing in NestJS**
  - [ ] Unit Testing with Jest: Mocking services and repositories
  - [ ] E2E Testing with Supertest and in-memory/test DB

---

## 5. Database: PostgreSQL Mastery
ডাটাবেজ অপ্টিমাইজেশন ও জটিল কুয়েরি সমাধান যেকোনো ইন্টারভিউয়ের ৫০% ওয়েটেজ বহন করে।

- [ ] **PostgreSQL Internals & Query Optimization**
  - [ ] `EXPLAIN` and `EXPLAIN (ANALYZE, BUFFERS)` রিড করা
  - [ ] Scan Types: `Seq Scan`, `Index Scan`, `Index Only Scan`, `Bitmap Index / Heap Scan`
  - [ ] Slow Query লগিং ও ডিবাগিং স্ট্র্যাটেজি
- [ ] **Indexing Strategies**
  - [ ] B-Tree Index (Internal structure, equality and range search)
  - [ ] Composite Index: Leftmost prefix rule (অর্ডার কেন গুরুত্বপূর্ণ)
  - [ ] Covering Index (`INCLUDE` clause) দিয়ে টেবিল স্ক্যান এড়ানো
  - [ ] Partial Index (যেমন: `WHERE status = 'ACTIVE'`) দিয়ে ইনডেক্স সাইজ কমানো
  - [ ] GIN & GiST Index: JSONB ডাটা এবং Full-Text Search-এ ব্যবহার
  - [ ] কখন ইনডেক্স ব্যবহার করা উচিত নয় (High write tables, low cardinality columns)
- [ ] **ACID & Concurrency Control (MVCC)**
  - [ ] Multi-Version Concurrency Control (MVCC) কীভাবে কাজ করে (Read locks দরকার হয় না কেন)
  - [ ] Transaction Isolation Levels:
    - [ ] `Read Uncommitted`
    - [ ] `Read Committed` (Postgres default)
    - [ ] `Repeatable Read`
    - [ ] `Serializable`
  - [ ] Concurrency Phenomena: Dirty Read, Non-Repeatable Read, Phantom Read, Serialization Anomaly
- [ ] **Locking & Deadlocks**
  - [ ] Table-level Locks vs Row-level Locks
  - [ ] Pessimistic Locking: `SELECT ... FOR UPDATE` বনাম `SELECT ... FOR SHARE`
  - [ ] Optimistic Locking: Version column (`version = version + 1`)
  - [ ] Deadlock কেন ঘটে এবং কীভাবে ডিটেক্ট ও প্রিভেন্ট করতে হয়
- [ ] **Schema Design & Scaling**
  - [ ] Normalization (1NF, 2NF, 3NF) vs Denormalization (Reporting / High Read)
  - [ ] Table Partitioning: Declarative Partitioning (Range, List, Hash)
  - [ ] Connection Pooling: কেন প্রয়োজন, PgBouncer কীভাবে মেমরি ও কানেকশন হ্যান্ডেল করে
  - [ ] Database Replication: Primary-Replica (Leader-Follower), Read replicas-এ লোড ব্যালেন্সিং

---

## 6. Caching & In-Memory: Redis
স্কেলেবিলিটি এবং হাই-পারফরম্যান্স ব্যাকএন্ডের জন্য রেডিস মাস্ট।

- [ ] **Redis Core Concepts & Data Structures**
  - [ ] Strings: Caching, Counters (`INCR`, `DECR`)
  - [ ] Hashes: User profiles, Structured objects (`HSET`, `HGETALL`)
  - [ ] Lists: Simple queues (`LPUSH`, `RPOP`, `BRPOP`)
  - [ ] Sets: Unique elements, Tags, Mutual connections (`SADD`, `SINTER`)
  - [ ] Sorted Sets (ZSET): Leaderboard, Rate limiter (`ZADD`, `ZRANGEBYSCORE`)
- [ ] **Caching Patterns & Architecture**
  - [ ] Cache-Aside (Lazy Loading) — সবচেয়ে বেশি ব্যবহৃত প্যাটার্ন
  - [ ] Write-Through Cache
  - [ ] Write-Behind (Write-Back) Cache
  - [ ] Refresh-Ahead Cache
- [ ] **Cache Invalidation & Critical Pitfalls (ইন্টারভিউয়ের প্রিয় প্রশ্ন)**
  - [ ] **Cache Stampede (Dogpiling):** TTL শেষ হলে একসাথে হাজার হাজার রিকোয়েস্ট ডিবিতে হিট করা এবং সমাধান (XFetch, Probabilistic early expiration, Distributed lock)
  - [ ] **Cache Avalanche:** একসাথে অনেক কি এক্সপায়ার হয়ে ডাটাবেজ ক্র্যাশ হওয়া এবং সমাধান (Randomized TTL/Jitter)
  - [ ] **Cache Penetration:** ডাটাবেজে নেই এমন ডাটা দিয়ে বারবার রিকোয়েস্ট পাঠানো এবং সমাধান (Null caching, Bloom Filters)
- [ ] **Advanced Redis Use Cases**
  - [ ] Distributed Locking: Single instance lock (`SET NX EX`) বনাম Redlock Algorithm
  - [ ] Rate Limiting: Fixed Window, Sliding Window Log (ZSET দিয়ে ইমপ্লিমেন্টেশন)
  - [ ] Pub/Sub: Limitations (No persistence) বনাম Redis Streams (Message persistence and consumer groups)
  - [ ] Redis Eviction Policies: LRU, LFU, Volatile-TTL, AllKeys-LRU

---

## 7. API Design, Security & Auth
রিয়েল-ওয়ার্ল্ড এন্টারপ্রাইজ সিস্টেমে সিকিউরিটি ও এপিআই স্ট্যান্ডার্ড।

- [ ] **RESTful API Standards & Practices**
  - [ ] HTTP Methods & Idempotency: `GET`, `HEAD`, `OPTIONS` (Safe); `PUT`, `DELETE` (Idempotent); `POST`, `PATCH` (Non-idempotent)
  - [ ] Proper HTTP Status Codes: 200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500, 502, 503, 504
  - [ ] Pagination Strategies:
    - [ ] Offset-based (`LIMIT`, `OFFSET`): সুবিধা বনাম বড় অফসেটে স্লো কুয়েরি সমস্যা
    - [ ] Keyset / Cursor-based (`WHERE id > last_seen_id LIMIT 10`): দ্রুত এবং ডাটা স্কিপ হয় না
  - [ ] API Versioning: URI, Header, Query parameter
- [ ] **Authentication & Authorization**
  - [ ] JWT Internals: Header, Payload, Signature; Symmetric (HS256) vs Asymmetric (RS256)
  - [ ] Token Security: Access Token (Short-lived, in-memory) + Refresh Token (Long-lived, httpOnly cookie)
  - [ ] Refresh Token Rotation & Automatic Reuse Detection (হ্যাকড টোকেন অটো রিভোক করা)
  - [ ] Token Blacklisting with Redis
  - [ ] RBAC (Role-Based Access Control) vs ABAC (Attribute-Based Access Control)
  - [ ] Password Hashing: `bcrypt` / `argon2` (Work factor, Salt, কেন MD5/SHA256 ব্যবহার করা নিষিদ্ধ)
- [ ] **API Security & OWASP Top 10**
  - [ ] SQL Injection: Parameterized queries, ORM usage
  - [ ] Cross-Site Scripting (XSS): Sanitization, Content Security Policy (CSP), HttpOnly cookies
  - [ ] Cross-Site Request Forgery (CSRF): SameSite cookies, CSRF tokens
  - [ ] Cross-Origin Resource Sharing (CORS): Preflight requests (`OPTIONS`), Allowed origins, credentials
  - [ ] API Rate Limiting & DDoS Prevention (IP-based, User-based, Token Bucket)
  - [ ] Security Headers (`helmet` middleware): HSTS, X-Content-Type-Options, etc.

---

## 8. System Design & Distributed Concepts
মিড/সিনিয়র ব্যাকএন্ড রোলে আর্কিটেকচারাল ডিসিশন এবং ট্রেড-অফ বোঝানোর দক্ষতা।

- [ ] **Core Architectural Fundamentals**
  - [ ] Horizontal vs Vertical Scaling
  - [ ] Latency vs Throughput
  - [ ] CAP Theorem: Consistency, Availability, Partition Tolerance (কেন P বাধ্যতামূলক এবং C বনাম A ট্রেড-অফ)
  - [ ] Eventual Consistency vs Strong Consistency
  - [ ] Database Replication: Single-Leader vs Multi-Leader vs Leaderless
- [ ] **Networking & Load Balancing**
  - [ ] Layer 4 (Transport - TCP) vs Layer 7 (Application - HTTP) Load Balancing
  - [ ] Algorithms: Round Robin, Weighted Round Robin, Least Connections, IP Hash, Consistent Hashing
  - [ ] Reverse Proxy: Nginx / Envoy-এর ভূমিকা (SSL termination, Compression, Caching)
- [ ] **Message Queues & Asynchronous Communication**
  - [ ] Point-to-Point Queue বনাম Publish-Subscribe
  - [ ] RabbitMQ / BullMQ বনাম Apache Kafka (কখন কোনটা দরকার)
  - [ ] Message Delivery Guarantees: At-most-once, At-least-once, Exactly-once
  - [ ] Idempotent Consumers (ডুপ্লিকেট মেসেজ আসলে কীভাবে ডাটা সুরক্ষিত রাখবে)
  - [ ] Dead Letter Queue (DLQ) এবং Retry Strategy with Exponential Backoff
- [ ] **System Design Problems (যা ইন্টারভিউতে আঁকতে দেওয়া হয়)**
  - [ ] **Design a URL Shortener (TinyURL / Bitly):**
    - [ ] Hashing (Base62 encoding vs MD5/SHA256)
    - [ ] Collision handling
    - [ ] Database selection & Caching strategy
  - [ ] **Design an API Rate Limiter:**
    - [ ] Algorithms: Token Bucket, Leaky Bucket, Fixed Window Counter, Sliding Window Log, Sliding Window Counter
    - [ ] Distributed Rate Limiting using Redis & Lua scripts
  - [ ] **Design an E-Commerce Checkout / Flash Sale:**
    - [ ] Race Condition প্রতিরোধ (Inventory overselling ঠেকানো)
    - [ ] Distributed Lock vs DB Row Lock vs Atomic decrement (`UPDATE inventory SET stock = stock - 1 WHERE id = 1 AND stock > 0`)
    - [ ] Async Order Processing with Queue
  - [ ] **Design a Real-Time Notification System:**
    - [ ] Multi-channel: Push, SMS, Email
    - [ ] Rate limiting per user & prioritization queues
  - [ ] **Design a Multi-Tenant SaaS Architecture:**
    - [ ] Database Per Tenant vs Shared Database, Separate Schema vs Shared Database, Shared Schema (Row-Level Security)
    - [ ] Pros & Cons of each model

---

## 9. DevOps & Containerization (Docker)
একজন ব্যাকএন্ড ডেভেলপারের লোকাল ও ক্লাউড এনভায়রনমেন্ট সম্পর্কে ন্যূনতম প্রয়োজনীয় জ্ঞান।

- [ ] **Docker Fundamentals**
  - [ ] Images, Containers, Volumes, Networks
  - [ ] Dockerfile Best Practices for Node.js:
    - [ ] Multi-stage builds (উৎপাদন ইমেজ সাইজ ছোট রাখা)
    - [ ] Layer caching অপটিমাইজেশন (`package.json` আগে কপি করা)
    - [ ] Non-root user ব্যবহার (`USER node`)
    - [ ] `.dockerignore` সঠিক ব্যবহার
- [ ] **Docker Compose**
  - [ ] Multi-container local setup (Node App + PostgreSQL + Redis)
  - [ ] Health checks, service dependencies (`depends_on: { condition: service_healthy }`)
  - [ ] Volume persistence and network bridges
- [ ] **CI/CD & Cloud Basics**
  - [ ] GitHub Actions workflow: Lint → Test → Build Docker Image → Push to Registry
  - [ ] Environment variables ও Secrets management (`.env`, Secret Manager)
  - [ ] Basic Linux Commands: `ps aux`, `lsof -i`, `netstat`, `top`, `df -h`, `journalctl`, `systemctl`

---

## 10. Data Structures, Algorithms & Practical JS Coding
ব্যাকএন্ড টেকনিক্যাল স্ক্রিনিংয়ে সাধারণত জটিল গ্রাফ বা ডিপি আসে না; আসে বাস্তবধর্মী লজিক ও ডেটা ট্রান্সফরমেশন।

- [ ] **Targeted Data Structures & Patterns**
  - [ ] Hash Maps & Sets: $O(1)$ lookup (Two Sum, Group Anagrams, First Unique Character)
  - [ ] Two Pointers & Sliding Window: Array/String সাবস্ট্রিং বা সাবঅ্যারে সমস্যা
  - [ ] Stacks & Queues: Valid Parentheses, Next Greater Element, Queue using Stacks
  - [ ] Linked Lists: Fast & Slow pointers (Cycle detection), Reverse Linked List
  - [ ] Trees: Binary Search Tree (BST) Validation, BFS (Level Order), DFS (Pre/In/Post order)
  - [ ] Sorting & Searching: Binary Search ($O(\log N)$)
- [ ] **Practical JavaScript Machine Coding (বারবার ইন্টারভিউতে যা কোড করতে দেয়)**
  - [ ] [ ] Custom `Promise.all()` ইমপ্লিমেন্ট করা
  - [ ] [ ] `debounce()` এবং `throttle()` ফাংশন স্ক্র্যাচ থেকে লেখা
  - [ ] [ ] Deep Clone অবজেক্ট ফাংশন (Handling circular references, Dates, Functions)
  - [ ] [ ] Array `flatten()` ফাংশন (Recursive ও Iterative)
  - [ ] [ ] LRU Cache ইমপ্লিমেন্ট করা (Hash Map + Doubly Linked List)
  - [ ] [ ] Rate Limiter ক্লাস তৈরি (In-memory Sliding Window বা Token Bucket)
  - [ ] [ ] Async task queue with concurrency limit (e.g., সর্বোচ্চ ৩টি প্রমিজ একসাথে চলবে)

---

## 11. Live Project Defense & Behavioral (STAR Method)
ইন্টারভিউয়ারদের সামনে নিজের প্রজেক্ট ও অভিজ্ঞতা আত্মবিশ্বাসের সাথে উপস্থাপন করার প্রস্তুতি।

- [ ] **STAR Framework আয়ত্ত করা**
  - [ ] **S (Situation):** প্রজেক্ট বা কোম্পানির কী চ্যালেঞ্জ ছিল?
  - [ ] **T (Task):** তোমার নির্দিষ্ট দায়িত্ব বা অ্যাসাইনমেন্ট কী ছিল?
  - [ ] **A (Action):** তুমি টেকনিক্যালি কী সমাধান দিয়েছ? (কোন টেক স্ট্যাক কেন বেছে নিয়েছিলে?)
  - [ ] **R (Result):** পরিমাপযোগ্য ফলাফল কী ছিল? (e.g. *"Response time কমেছে ৪০%", "মাসে ১০,০০০ ট্রানজ্যাকশন ক্র্যাশ ছাড়া হ্যান্ডেল হয়েছে"*)
- [ ] **Standard Behavioral Questions Preparation**
  - [ ] [ ] *"Tell me about yourself"* (২ মিনিটের ক্রিস্প টেকনিক্যাল ইন্ট্রোডাকশন)
  - [ ] [ ] *"Tell me about a complex technical problem you solved."*
  - [ ] [ ] *"Tell me about a production incident / outage and how you debugged and resolved it."*
  - [ ] [ ] *"Have you ever had a disagreement with a Tech Lead or Product Manager on architecture? How did you resolve it?"*
  - [ ] [ ] *"Why did you leave your last company / Why are you looking for a change?"* (পজিটিভ ফোকাস: নিউ চ্যালেঞ্জ, স্কেলিং অপরচুনিটি)
- [ ] **Deep Dive into Your Own Projects**
  - [ ] [ ] তোমার Multi-Tenant SaaS আর্কিটেকচার ড্র করার প্রস্তুতি (Tenant isolation, DB schema, Auth)
  - [ ] [ ] তোমার ই-কমার্স ব্যাকএন্ডের পেমেন্ট ফ্লো এবং স্টক ম্যানেজমেন্টের কনকারেন্সি ডিফেন্স
  - [ ] [ ] "যদি ট্রাফিক ১০ গুণ বেড়ে যায়, তোমার এই প্রজেক্টে প্রথম কোন কম্পোনেন্ট ভেঙে পড়বে এবং কীভাবে স্কেল করবে?"—এর উত্তর প্রস্তুত রাখা

---

## 🎯 How to Track Your Daily Study Progress
1. প্রতিদিন সকালে ৩-৪টি নির্দিষ্ট টপিক সিলেক্ট করো।
2. শুধু থিওরি পড়বে না—প্রয়োজনে কনসোলে বা ছোট কোড ফাইলে নিজে প্র্যাকটিস করে ভেরিফাই করো।
3. টপিক ক্লিয়ার হলে ওপরের চেকলিস্টের বক্সে টিক দাও (`[x]`)।
4. কোনো টপিক ভুলে গেলে আবার এই ফাইল দেখে রিভিশন দাও।
