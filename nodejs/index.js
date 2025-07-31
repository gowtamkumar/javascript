const path = require("path");
const os = require("os");
const fs = require("fs");

const event = require("events");

const http = require("http");

// const mypath = '/home/gowtam/Desktop/gowtam/Javascript/nodejs/index.js'
// console.log("basename", path.parse(mypath) );

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

// stream and buffer
// get data by stream

console.log(`${__dirname}/doc.txt`);

const readDatabyStream = fs.createReadStream(`${__dirname}/myfile.txt`); // "utf8"
const writeStream = fs.createWriteStream(`${__dirname}/output.txt`); // here chunk write

// readDatabyStream.on("data", (chunk) => {
//   console.log("testing chunk", chunk);
//   writeStream.write(chunk);
// });

// this olternative for Stream
readDatabyStream.pipe(writeStream);

// http
const server = http.createServer((req, res) => {
  if (req.url === "/") {
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
