const mongoose = require("mongoose");
const Joi = require("joi");
const genres = require("./routes/genres");
const express = require("express");
const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
