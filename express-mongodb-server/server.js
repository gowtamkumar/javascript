const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("./src/middlewares/logger");
const colors = require("colors");
const errorHandler = require("./src/middlewares/errorHandler");
const app = express();

const { connectDb } = require("./src/config/db");
// load env vars
// dotenv.config({ path: './src/config/config.env' });
dotenv.config();

// all routes
const mainRoutes = require("./src/routes/routes");

// Connect to database
if (process.env.NODE_ENV !== "test") {
  connectDb();
}
// middleware
app.use(cookieParser()); // body parser
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable cros

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// logger assign
app.use(logger);

//main route
mainRoutes(app);
// error Handler
app.use(errorHandler);

//root route
app.get("/", (req, res) => {
  res.send("Welcome to nodejs server");
});

//not found route
app.get("*", (req, res) => {
  res.send("Not found route");
});
// Port
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    colors.magenta(
      `Server running in ${process.env.NODE_ENV} Mode on Port ${PORT}`
    )
  )
);

//handle and unhandle promise rejections
process.on("unhandledRejection", (err, message) => {
  console.log(colors.red(`Error ${err.message}`));
  // close server & process exit
  server.close(() => process.exit(1));
});