তুমি যেহেতু একজন Backend Developer এবং AI Coding Tool হিসেবে Claude Code ব্যবহার করো, তাই তোমাকে AI দিয়ে Code Review করার একটি Professional Workflow দেখাচ্ছি।

আমার পরামর্শ হলো, AI-কে শুধু কোডে ভুল খুঁজতে বলবে না। বরং একজন Senior Software Engineer যেভাবে Code Review করেন, AI-কে সেভাবে Review করতে বলবে।
১. AI Code Review আসলে কী?
AI দিয়ে Code Review মানে হলো AI-কে তোমার কোড পরীক্ষা করতে দেওয়া, যেন সে নিচের বিষয়গুলো যাচাই করে:
Review Area	কী পরীক্ষা করবে
Code Quality	Clean code, readability, maintainability
Bugs	সম্ভাব্য logical error
Security	SQL injection, XSS, authentication
Performance	Slow query, N+1 query, memory leak
Architecture	SOLID, design patterns, separation of concerns
Database	Index, transaction, relations
Error Handling	Exception handling, validation
Testing	Missing test cases, edge cases

২. Professional AI Code Review Workflow
আমি তোমাকে ৭টি ধাপে কাজ করতে বলব।
AI Code Review Pipeline
1. Understand the Context
   
   AI-কে আগে Project Architecture এবং Business Requirements বুঝতে দাও।
2. Define Review Scope
   
   কোন Module বা Feature Review করতে হবে নির্ধারণ করো।
3. Analyze the Code
   
   AI-কে কোডের প্রতিটি গুরুত্বপূর্ণ অংশ বিশ্লেষণ করতে দাও।
4. Find Issues
   
   Bugs, Security, Performance এবং Architecture সমস্যা বের করো।
5. Prioritize Findings
   
   Critical, High, Medium, Low অনুযায়ী সমস্যা সাজাও।
6. Fix and Verify
   
   Review Findings অনুযায়ী Fix করো এবং Test চালাও।
7. Final Review
   
   Fix করার পর আবার Review করো। নতুন সমস্যা তৈরি হয়েছে কি না যাচাই করো।

৩. AI-কে কীভাবে Prompt দেবে?
এখন সবচেয়ে গুরুত্বপূর্ণ অংশ। আমি তোমাকে কয়েকটি Reusable Prompt দিচ্ছি।
Step 1: Project Context বুঝতে বলবে
প্রথমে AI-কে কোনো কোড পরিবর্তন করতে বলবে না।
You are a Senior Software Architect and Backend Engineer.

First, analyze my project and understand its architecture.

Tech Stack:
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker
Tasks:
1. Analyze the project folder structure.
2. Understand the module architecture.
3. Identify database entities and relationships.
4. Understand authentication and authorization.
5. Understand business logic and API flow.
6. Identify coding conventions and architectural patterns.
Important:
- Do not modify any code.
- Do not suggest changes yet.
- First understand the existing architecture.
- Ask questions if important business context is missing.
Finally, provide a concise architecture summary.




Step 2: নির্দিষ্ট Module Review করো
ধরো তোমার SaaS POS Application-এর Inventory Module Review করবে।
Act as a Senior Backend Engineer performing a professional code review.

Review my Inventory Module.

Review the following areas:
1. Business Logic
2. Code Quality
3. SOLID Principles
4. Database Design
5. Transaction Management
6. API Validation
7. Error Handling
8. Security
9. Performance
10. Edge Cases
For every issue, provide:
- Issue title
- File path and line number
- Problem description
- Why it is a problem
- Potential impact
- Recommended solution
- Severity: Critical / High / Medium / Low
Important:
- Do not modify any files.
- Do not assume business rules.
- Do not report imaginary issues.
- Verify findings against the actual code.
- Focus on real problems, not personal coding preferences.
At the end, provide a prioritized review report.




Step 3: Security Review
এটি খুব গুরুত্বপূর্ণ। বিশেষ করে Multi-tenant SaaS Application-এর জন্য।
Act as a Senior Application Security Engineer.

Perform a security audit of my NestJS application.

Focus on:
1. Authentication and JWT implementation.
2. Authorization and RBAC.
3. Multi-tenant data isolation.
4. SQL Injection.
5. Input validation.
6. Password hashing.
7. Sensitive data exposure.
8. API rate limiting.
9. File upload security.
10. Environment variable and secret management.
For each finding:
- Explain the vulnerability.
- Show the affected code.
- Explain the attack scenario.
- Assign severity.
- Recommend a secure fix.
Do not modify code.
Do not claim a vulnerability without evidence.
Pay special attention to tenant_id isolation and unauthorized cross-tenant access.




Step 4: Performance Review
Act as a Senior Backend Performance Engineer.

Review my NestJS and PostgreSQL application for performance issues.

Check:
1. N+1 queries.
2. Unnecessary database queries.
3. Missing database indexes.
4. Inefficient joins.
5. Pagination implementation.
6. Memory usage.
7. Synchronous blocking operations.
8. Caching opportunities.
9. Connection pooling.
10. Transaction performance.
For each finding:
- Show the affected code.
- Explain the performance problem.
- Explain the impact at scale.
- Recommend an optimized solution.
Do not modify code.
Do not recommend caching without understanding data consistency requirements.




Step 5: Fix the Issues
Review শেষ হলে AI-কে সব সমস্যা একসাথে Fix করতে বলবে না।

একটি করে issue Fix করাবে।
Based on the approved code review findings, fix the following issue:

[PASTE ISSUE HERE]

Requirements:
1. Understand the existing implementation.
2. Explain the proposed changes first.
3. Follow the existing project architecture.
4. Avoid unnecessary refactoring.
5. Maintain backward compatibility.
6. Add or update relevant tests.
7. Do not modify unrelated files.
8. Run relevant tests and type checks.
After implementation, provide:
- Files changed
- Changes made
- Tests executed
- Test results
- Remaining risks




৪. Severity কীভাবে নির্ধারণ করবে?
AI-এর Review Report-এ এই Priority System ব্যবহার করবে।
Severity	অর্থ	উদাহরণ
Critical	অত্যন্ত বিপজ্জনক	অন্য Tenant-এর Data Access
High	বড় সমস্যা	Authentication Bypass
Medium	গুরুত্বপূর্ণ	N+1 Query
Low	ছোট সমস্যা	Naming Convention

৫. Claude Code দিয়ে বাস্তবে কীভাবে করবে?
তোমার Terminal-এ Claude Code চালু করে এই Workflow অনুসরণ করতে পারো।
# Step 1: Go to project
cd my-project

# Step 2: Start Claude Code
claude

# Step 3: Ask Claude to understand architecture
# Paste Step 1 prompt

# Step 4: Review a specific module
# Paste Step 2 prompt

# Step 5: Review security
# Paste Step 3 prompt

# Step 6: Fix approved issues
# Paste Step 5 prompt


একটি গুরুত্বপূর্ণ বিষয়: Review শুরু করার আগে Git commit করে রাখবে। AI-এর পরিবর্তনগুলো আলাদা করে পরীক্ষা করবে।
git status
git add .
git commit -m "checkpoint before AI code review"


৬. আমার Recommended Professional Workflow
তোমার NestJS SaaS POS Project-এর জন্য আমি এই ক্রমটি অনুসরণ করতাম:
Order	Review	Priority
1	Architecture Review	High
2	Multi-Tenant Isolation	Critical
3	Authentication & RBAC	Critical
4	Business Logic Review	High
5	Database & Transaction	High
6	Performance Review	Medium
7	Code Quality Review	Medium
8	Test Coverage Review	High
9	Final Regression Review	High


৭. সবচেয়ে গুরুত্বপূর্ণ ৫টি নিয়ম
1. AI-কে কখনো একবারে পুরো Project Refactor করতে দেবে না।
2. আগে Review, তারপর Fix।
3. AI-এর প্রতিটি Finding নিজে Verify করবে।
4. AI-এর দেওয়া Code Test ছাড়া Production-এ Deploy করবে না।
5. Business Logic সম্পর্কে AI-এর অনুমানকে কখনো সত্য ধরে নেবে না।
মনে রাখবে: AI Code Review মানে AI-কে তোমার হয়ে সিদ্ধান্ত নিতে দেওয়া নয়। AI সমস্যা খুঁজে দেবে, কিন্তু কোন পরিবর্তন গ্রহণ করবে সেটা তুমি নির্ধারণ করবে।

এবার তোমাকে পরবর্তী ধাপ শেখাতে চাই
তুমি চাইলে আমরা Claude Code দিয়ে একটি বাস্তব Senior-Level AI Code Review System তৈরি করতে পারি, যেখানে থাকবে:
- CLAUDE.md Review Rules
- Reusable Review Prompts
- Security Audit Workflow
- Automated Code Review Checklist
- Review Report Format
- Fix Verification Workflow
এতে তোমার প্রতিটি নতুন Feature তৈরি হওয়ার পর একই Professional Review Process অনুসরণ করা যাবে।