// typeof Guard;
function processValue(val: string | number) {
  if (typeof val === "string") {
    // TypeScript knows `val` is string in this block
    console.log(val.toUpperCase());
  } else {
    // TypeScript knows `val` MUST be number here
    console.log(val.toFixed(2));
  }
}

processValue("hello"); // Output: "HELLO"
// instanceof Guard

class ApiError extends Error {
  statusCode = 500;
}

function HandleError(err: Error) {
  if (err instanceof ApiError) {
    console.log(`API Error: ${err.message} with status code ${err.statusCode}`);
  } else {
    console.log(`General Error: ${err.message}`);
  }
}

// in Operator Guard

type Admin = { name: string; permissions: string[] };
type Users = { name: string; email: string };

function configureProfile(user: Admin | Users) {
  if ("permissions" in user) {
    console.log(
      `Admin: ${user.name}, Permissions: ${user.permissions.join(", ")}`,
    );
  } else {
    console.log(`User: ${user.name}, Email: ${user.email}`);
  }
}

configureProfile({ name: "Alice", permissions: ["read", "write"] }); // Admin
configureProfile({ name: "Bob", email: "bob@example.com" });

// Custom User-Defined Type Guards

// Filtering Arrays with Custom Guards
const mixedArray: (number | string)[] = [1, "two", 3, "four", 5];

const numberArray = mixedArray.filter(
  (item): item is string => typeof item === "string",
);

console.log(numberArray); // Output: [1, 3, 5]

// Assertion Functions (asserts condition)
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value is not a string");
  }
}

function processUnknownValue(value: unknown) {
  assertIsString(value);
  // TypeScript now knows `value` is a string after the assertion
  console.log(value.toUpperCase());
}

processUnknownValue("hello"); // Output: "HELLO"
