// Generic Functions
function identity<T>(arg: T): T {
  return arg;
}

const output = identity<string>("Hello World");
console.log(output);

const arrowIdentity = <T>(value: T): T => value;

console.log(arrowIdentity<number>(100));

// Generic Interfaces
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

type User = {
  id: number;
  name: string;
  email: string;
};
type Product = {
  id: number;
  title: string;
  price: number;
};

const userResponse: ApiResponse<User> = {
  status: 200,
  message: "User Fetched Successfully",
  data: {
    id: 1,
    name: "John Doe",
    email: "email@gmail.com",
  },
};

const productResponse: ApiResponse<Product> = {
  status: 200,
  message: "Product Fetched Successfully",
  data: {
    id: 1,
    title: "Product 1",
    price: 100,
  },
};

// Generic Classes

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  removeItem(item: T): void {
    this.data = this.data.filter((i) => i !== item);
  }

  getItems(): T[] {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Hello");
console.log(textStorage.getItems());

// Generic Constraints (extends)
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("Hello World");

// Using keyof Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: "John Doe",
  age: 30,
};

const personName = getProperty(person, "name");
console.log(personName); // Output: John Doe
