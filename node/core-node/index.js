const path = require("path");
const os = require("os");
const fs = require("fs");
const http = require("http");
const zlib = require("node:zlib");
const { pipeline } = require("node:stream/promises");
// const EventEmitter = require("events");

// async function processFile() {
//   try {
//     await pipeline(
//       fs.createReadStream(`${__dirname}/myfile.txt`),
//       zlib.createGzip(),
//       fs.createWriteStream(`${__dirname}/myfile.txt.gz`),
//     );
//     console.log("File compressed successfully.");

//     await pipeline(
//       fs.createReadStream(`${__dirname}/myfile.txt.gz`),
//       zlib.createGunzip(),
//       fs.createWriteStream(`${__dirname}/myfilewwwwww.txt`),
//     );
//     console.log("File decompressed successfully.");
//   } catch (err) {
//     console.error("Error processing file:", err);
//   }
// }
// processFile();

// const http = require("http");
// const { buffer } = require("stream/consumers");

// const emitter = new EventEmitter();

// emitter.on("called", (filename) => {
//   console.log(`this is event emitter called from ${filename}`);
// });

// const mypath = "/home/gowtam/Desktop/gowtam/Javascript/nodejs/index.js";
// console.log("basename", path.dirname(mypath));

// console.log("os", os.cpus());

// console.log("fs", fs.writeFileSync('myfile.txt', "Hello boss learn node.js",));
// console.log("fs", fs.appendFileSync('myfile.txt', "Hello node.js. how old are you boss"));

// const readFile = fs.readFile('myfile.txt', (error, data)=> { // this is async fun
//   console.log("ee", data);
//   console.log("ee", data.toString());
// })

// console.log("test asyn");

// console.log("fs file with buffer", readFile);
// console.log("fs file read", readFile.toString());

// event module
// const newimmter = new event.EventEmitter()
//  newimmter.on("beelring", (period)=> {
//   console.log("please hit tht log", period);

//  })
//  newimmter.emit('beelring', 'i am learning node.js core module')

// file system

// fs.readFile(`${__dirname}/myfile.txt`, (error, data) => {
//   if (error) {
//     console.log("error", error);
//   }
//   // console.log("data", data.toString());
// });

// // stream and buffer
// // get data by stream

// // console.log(`${__dirname}/doc.txt`);

// const readDatabyStream = fs.createReadStream(`${__dirname}/myfile.txt`); // "utf8"
// readDatabyStream.on("data", (chunk) => {
//   console.log("testing chunk", chunk.toString());
// });

// readDatabyStream.on("end", () => {
//   console.log("File reading finished");
// });
// const writeStream = fs.createWriteStream(`${__dirname}/output.txt`); // here chunk write

// // readDatabyStream.on("data", (chunk) => {
// //   console.log("testing chunk", chunk);
// //   writeStream.write(chunk);
// // });

// // this olternative for Stream
// readDatabyStream.pipe(writeStream);

// // buffer

// fs.readFile(`${__dirname}/myfile.txt`, (error, data) => {
//   if (error) {
//     console.log("error", error);
//   }

//   const readBuffer = Buffer.from(data);

//   console.log("readBuffer", readBuffer.toString());
// });
// // process info
// console.log("PID:", process.pid);
// console.log("Memory:", process.memoryUsage());
// console.log("Uptime:", process.uptime(), "seconds");

// process.on("SIGINT", () => {
//   console.log("Process is interrupted");
//   process.exit();
// });

// process.on("SIGTERM", () => {
//   console.log("Process is terminated");
//   process.exit();
// });

// // const readBuffer = Buffer.from(`${__dirname}/myfile.txt`);

// // console.log("readBuffer", readBuffer);
// // console.log("Buffer file", readBuffer.toString());
// setInterval(() => {
//   const mem = process.memoryUsage().rss / 1024 / 1024;
//   console.log("Memory Usage:", mem.toFixed(2), "MB");
// }, 1000);

// const bufFromString = Buffer.from("Hello, Node.js!");
// console.log("Buffer from string:", bufFromString);
// const safeBuffer = Buffer.alloc(10);
// console.log("Safe buffer:", safeBuffer);

// const fufArry = Buffer.from([72, 101, 108, 108, 111]);
// console.log(fufArry.toString("utf-8"));

// Convert String -> Base64 Buffer
// const str = "Node.js";
// const base64Str = Buffer.from(str).toString("base64");
// console.log("Base64 encoded string:", base64Str);

// // Convert Base64 -> UTF-8 String
// const decodedStr = Buffer.from(base64Str, "base64").toString("utf-8");
// console.log("Decoded string:", decodedStr); // Output: "Node.js"

// http
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // emitter.emit("called", path.basename(__filename));
    // emitter.emit("called", new Error("Something went wrong"));

    res.write("hello node.js Home api");

    res.end();
  } else if (req.url === "/about") {
    res.write("hello node.js about api");
    res.end();
  } else if (req.url === "/big-data") {
    const readDatabyStream = fs.createReadStream(`${__dirname}/myfile.txt`); // "utf8"
    readDatabyStream.pipe(res);
  } else {
    res.end("This Route is not found");
  }
});

server.listen(3001, () => {
  console.log("node js server is running..");
});
