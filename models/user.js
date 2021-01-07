const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

const User = new mongoose.model("User", userSchema);
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}
module.exports.User = User;
module.exports.validate = validateUser;
