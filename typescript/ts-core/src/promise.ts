// interface User {
//   id: number;
//   name: string;
//   email: string;
// }
// const fetchUser = (): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const isSuccess = true;
//     setTimeout(() => {
//       if (isSuccess) {
//         resolve("This is Resolve");
//       } else {
//         reject(new Error("This promise is reject"));
//       }
//     }, 1000);
//   });
// };

// fetchUser()
//   .then((response) => {
//     console.log("Success", response);
//   })
//   .catch((error) => {
//     console.log("Error", error);
//   })
//   .finally(() => {
//     console.log("process fulled");
//   });

// export async function handleApiCall() {
//   try {
//     const data = await fetchUser();
//     console.log(data);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.message);
//     } else {
//       console.error(error);
//     }
//   }
// }

// handleApiCall();

// interface ApiResponse<data> {
//   status: "success" | "error";
//   data: data;
//   timestamp: number;
// }
// interface Product {
//   id: string;
//   price: number;
// }

// async function apiCall<T>(url: string): Promise<ApiResponse<T>> {
//   const res = await fetch(url);
//   const json = await res.json();
//   return json as ApiResponse<T>;
// }

// async function loadProduct() {
//   const result = await apiCall<Product>("/api/products/101");
//   console.log(result);
// }

// async function safeExecute() {
//   try {
//     const res = fetch("daffas");
//     console.log(res);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Standard Error", error.message);
//     } else if (
//       typeof error === "object" &&
//       error !== null &&
//       "message" in error
//     ) {
//       console.error("Api Error Code:", (error as ApiError).code);
//     } else {
//       console.error("Unknown error occurred");
//     }
//   }
// }

async function handleMultiplePromise() {
  const p1: Promise<string> = Promise.resolve("Data A successfully");
  const p2: Promise<number> = Promise.resolve(44);
  // Promise.all: TypeScript অটোমেটিকালি টাইপ Infer করে [string, number] হিসেবে
  const [res1, res2] = Promise.all([p1, p2]);
  // Promise.allSettled:
  const results = await Promise.all([p1, p2]);
  results.forEach((result: any) => {
    if (result.status == "fulfilled") {
      console.log("Value", result.value);
    } else {
      console.error("Reason:", result.reason);
    }
  });
}
