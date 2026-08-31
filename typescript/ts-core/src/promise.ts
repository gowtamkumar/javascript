// interface User {
//   id: number;
//   name: string;
//   email: string;
// }
const fetchUser = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const isSuccess = true;
    setTimeout(() => {
      if (isSuccess) {
        resolve("This is Resolve");
      } else {
        reject("This promise is reject");
      }
    }, 1000);
  });
};

fetchUser()
  .then((response) => {
    console.log("Success", response);
  })
  .catch((error) => {
    console.log("Error", error);
  })
  .finally(() => {
    console.log("process fulled");
  });

async function handleApiCall() {
  try {
    const data = await fetchUser();
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}
