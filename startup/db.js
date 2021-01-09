const winston = require("winston");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      winston.info("Connected to mongoDb:vidly");
    })
    .catch((error) => {});
};
