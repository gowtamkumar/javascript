/**
 * Phase 1: Prompt Engineering in JavaScript
 * 
 * এই স্ক্রিপ্টে আমরা দেখব কীভাবে কোডের মাধ্যমে বিভিন্ন প্রম্পটিং টেকনিক তৈরি করা যায়।
 * রান করতে: node demo-prompt.js
 */

// ==========================================
// ১. প্রম্পট বিল্ডার ফাংশন (Prompt Builder Pattern)
// ==========================================
function buildPrompt({ role, context, task, inputData, constraints = [], outputFormat }) {
  let prompt = "";

  if (role) {
    prompt += `### ROLE\n${role.trim()}\n\n`;
  }

  if (context) {
    prompt += `### CONTEXT\n${context.trim()}\n\n`;
  }

  if (task) {
    prompt += `### TASK\n${task.trim()}\n\n`;
  }

  if (inputData) {
    prompt += `### INPUT DATA\n\`\`\`\n${inputData.trim()}\n\`\`\`\n\n`;
  }

  if (constraints.length > 0) {
    prompt += `### CONSTRAINTS\n`;
    constraints.forEach((rule) => {
      prompt += `- ${rule}\n`;
    });
    prompt += "\n";
  }

  if (outputFormat) {
    prompt += `### OUTPUT FORMAT\n${outputFormat.trim()}\n`;
  }

  return prompt.trim();
}

// ==========================================
// ২. Few-Shot Prompt Template
// ==========================================
function buildFewShotPrompt(examples, newQuery) {
  let prompt = "Classify the sentiment of customer feedback into Positive, Neutral, or Negative.\n\n";

  prompt += "### EXAMPLES\n";
  examples.forEach((ex, idx) => {
    prompt += `Example ${idx + 1}:\nText: "${ex.input}"\nSentiment: ${ex.output}\n\n`;
  });

  prompt += `### NEW INPUT\nText: "${newQuery}"\nSentiment:`;
  return prompt;
}

// ==========================================
// ৩. Structured JSON Mode Prompt (JS Developer Essential)
// ==========================================
function buildJsonExtractionPrompt(rawText, jsonSchema) {
  return buildPrompt({
    role: "You are a precise data extraction system.",
    context: "We are processing raw unstructured customer messages for our CRM system.",
    task: "Extract customer information from the raw text strictly following the JSON schema.",
    inputData: rawText,
    constraints: [
      "Return ONLY a valid raw JSON object.",
      "Do NOT wrap the JSON in markdown code blocks like ```json ... ```.",
      "If a field is missing, use null.",
      "Do not invent or assume any values not present in the input text."
    ],
    outputFormat: `Expected JSON Schema:\n${JSON.stringify(jsonSchema, null, 2)}`
  });
}

// ==========================================
// ৪. Prompt Injection Defense (Delimiter Pattern)
// ==========================================
function sanitizeAndWrapUserInput(userInput) {
  // ক্ষতিকর প্রম্পট ইনজেকশন থেকে বাঁচতে ইউজার ইনপুটকে Delimiter দিয়ে র‍্যাপ করা
  return `<user_input>\n${userInput}\n</user_input>`;
}

// ==========================================
// ডেমো এক্সিকিউশন ও আউটপুট প্রদর্শন
// ==========================================
console.log("==================================================");
console.log("🚀 DEMO 1: Anatomy of a Structured Prompt");
console.log("==================================================");

const codeReviewPrompt = buildPrompt({
  role: "Senior Full-Stack JavaScript Engineer",
  context: "We are conducting a security and performance audit of our Node.js backend.",
  task: "Review the following code and suggest performance improvements.",
  inputData: `
app.get('/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  const result = [];
  for (let u of users) {
    const orders = await db.query('SELECT * FROM orders WHERE user_id = ' + u.id);
    result.push({ ...u, orders });
  }
  res.json(result);
});
  `,
  constraints: [
    "Identify the N+1 query problem.",
    "Highlight SQL Injection vulnerability.",
    "Provide the refactored code using parameterized queries and JOIN or batching.",
    "Keep explanations concise."
  ],
  outputFormat: "Markdown with 'Vulnerabilities' section and 'Refactored Code' section."
});

console.log(codeReviewPrompt);

console.log("\n==================================================");
console.log("🚀 DEMO 2: Few-Shot Prompting");
console.log("==================================================");

const fewShotExamples = [
  { input: "I received my order on time and the packaging was great!", output: "Positive" },
  { input: "The product works fine, nothing special.", output: "Neutral" },
  { input: "The item stopped working after two days. Terrible experience.", output: "Negative" }
];

console.log(buildFewShotPrompt(fewShotExamples, "Customer support responded quickly, but couldn't solve my issue."));

console.log("\n==================================================");
console.log("🚀 DEMO 3: JSON Mode Extraction Prompt");
console.log("==================================================");

const rawLead = "Hi, I am Tanvir Ahmed from TechBD Ltd. You can reach me at tanvir@techbd.com or +8801700000000. We need 15 licenses.";
const leadSchema = {
  name: "string",
  company: "string",
  email: "string",
  phone: "string",
  requestedLicenses: "number"
};

console.log(buildJsonExtractionPrompt(rawLead, leadSchema));
