const cluster = require("cluster");
const os = require("os");
const express = require("express");
const app = express();
const port = 4100;

if (cluster.isPrimary) {
  const numberofCores = os.cpus().length;
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < numberofCores; i++) {
    cluster.fork();
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Worker ${process.pid} started`);
  console.log(`Server is running on port ${port}`);
});
