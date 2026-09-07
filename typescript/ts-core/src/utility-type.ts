// Utility Type,Description,Primary Use Case
// Partial<T>,Makes all properties in T optional.,Object updates / Patch requests
// Required<T>,Makes all properties in T required.,Enforcing complete configuration objects
// Readonly<T>,Makes all properties in T read-only (readonly).,Preventing object mutation
// "Pick<T, K>",Selects a subset of properties K from T.,Extracting public or lightweight shapes
// "Omit<T, K>",Removes a subset of properties K from T.,Stripping sensitive or generated fields
// "Record<K, V>",Constructs an object type with keys K and values V.,Dictionary lookups / Maps

interface UserInfo {
  id: number;
  name: string;
  email: string;
  password: string;
}

function updateUserInfo(id: number, updates: Partial<UserInfo>) {}

updateUserInfo(1, { name: "Alice" }); // Valid

const completeUser: Required<UserInfo> = {
  id: 1,
  name: "Alice",
  email: "",
  password: "",
};

const frozenUser: Readonly<UserInfo> = {
  id: 1,
  name: "Alice",
  email: "",
  password: "",
};

// Pick<T, K>
type userContactInfo = Pick<UserInfo, "name" | "email">;
const contact: userContactInfo = {
  name: "Alice",
  email: "diana@example.com",
};

console.log(contact.name); // Valid
console.log(contact.email); // Valid

// Omit<T, K>
type userWithoutId = Omit<UserInfo, "id">;

const user: userWithoutId = {
  name: "Alice",
  email: "",
  password: "",
};

// Record<K, V>

type UserRoles = "admin" | "editor" | "viewer";

interface Permission {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}

const rolePermission: Record<UserRoles, Permission> = {
  admin: { canRead: true, canWrite: true, canDelete: true },
  editor: { canRead: true, canWrite: true, canDelete: false },
  viewer: { canRead: true, canWrite: false, canDelete: false },
};

// Extract<T, U>

type Status = "success" | "error" | "pending";
type FinalStatus = Extract<Status, "success" | "error">; // "success" | "error"

// Exclude<T, U>
type ActiveStatus = Exclude<Status, "pending">; // "success" | "error"
// NonNullable<T>
type RawInput = string | number | null | undefined;
type CleanInput = NonNullable<RawInput>; // string | number
