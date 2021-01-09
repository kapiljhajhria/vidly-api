require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const config = require("config");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");

const app = express();
require("./startup/routes")(app);

winston.exceptions.handle(
  new winston.transports.File({ filename: "exceptionsHandler.log" })
);

process.on("uncaughtException", (exp) => {
  winston.error(exp.message, exp);
  process.exit(1);
});
process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));
winston.add(
  new winston.transports.MongoDB({
    db: "mongodb://localhost/vidly",
    level: "error",
  })
);

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
