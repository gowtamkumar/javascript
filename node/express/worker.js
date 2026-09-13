const { parentPort, workerData } = require("worker_threads");
let sum = 0;
for (let i = 0; i < 10000000000 / workerData.thread_count; i++) {
  sum += i;
}
parentPort.postMessage(sum);
