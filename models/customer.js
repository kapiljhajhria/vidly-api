const mongoose = require("mongoose");
const Joi = require("joi");
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  phone: { type: String, required: true, minlength: 5, maxlength: 50 },
  isGold: { type: Boolean, default: false },
});

const Customer = new mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.customerSchema = customerSchema;
module.exports.validate = validateCustomer;
