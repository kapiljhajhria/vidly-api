const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Genre = new mongoose.model("Genre", genreSchema);

module.exports.Genre = Genre;
module.exports.genreSchema = Genre;
