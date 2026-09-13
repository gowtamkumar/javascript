// index.js
const express = require("express"); // Import the installed package
const app = express();
const EventEmitter = require("events");
const { Worker } = require("worker_threads");

const port = 4100;

const newEvent = new EventEmitter();

app.get("/", (req, res) => {
  newEvent.on("order:created", (orderData) => {
    console.log(`order Created successfully Order Id is: ${orderData.orderId}`);

    newEvent.emit("payment:process");
  });

  newEvent.on("payment:process", () => {
    console.log("payment process done");
    newEvent.emit("email:send");
  });

  newEvent.on("email:send", () => {
    console.log("Email send Done");
  });
  res.send("Hello World!");
});

app.get("/process", (req, res) => {
  newEvent.emit("order:created", { orderId: 1000, name: "gowtam kuamr" });
  res.json({ message: "Event listener successfully" });
});

const thread_count = 4;

function CreateWorker() {
  return new Promise((resolve, reject) => {
    const workerData = new Worker(
      "./worker.js",
      { workerData: { thread_count: thread_count } }, //here we are passing the thread_count to worker.js file so that each thread will calculate the sum of 10000000000/thread_count
    );
    workerData.on("message", (sum) => {
      resolve(`Blocking behavior code... Sum: ${sum}`);
    });
    workerData.on("error", (err) => {
      reject(err);
    });
  });
}

// worker_Tread
app.get("/blocking", async (req, res) => {
  const promise = [];
  for (let i = 0; i < thread_count; i++) {
    promise.push(CreateWorker()); //here this calculation distributed to 4 thread and each thread will calculate the sum of 10000000000/4 and return the result to main thread
  }
  const threadResult = await Promise.all(promise);
  const totalSum = threadResult.reduce((acc, curr) => {
    const sum = parseInt(curr.split(":")[1].trim());
    return acc + sum;
  }, 0);
  res.send(`Blocking behavior code... Total Sum: ${totalSum}`);
});

app.get("/non-blocking", (req, res) => {
  res.send("Non Blocking code");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
