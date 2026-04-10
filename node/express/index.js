// index.js
const express = require("express"); // Import the installed package
const app = express();
const EventEmitter = require("events");
const port = 3000;

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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
