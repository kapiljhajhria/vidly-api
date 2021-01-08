require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const config = require("config");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const error = require("./middleware/error");
const app = express();

process.on("uncaughtException", (exp) => {
  console.log("uncaught exception occured");
  winston.error(exp.message, exp);
});
process.on("unhandledRejection", (exp) => {
  console.log("got unhandled rejection");
  winston.error(exp.message, exp);
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/vidly",
    level: "error",
  })
);

// throw new Error("something failed during startup");
const p = Promise.reject(new Error("promise failed , not handled"));
p.then(() => console.log("p done"));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL jwtPrivateKey is not defined");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDb:vidly");
  })
  .catch((error) =>
    console.log("got error connecting to database vidly: " + error)
  );

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
