const Fawn = require("fawn");
const moment = require("moment");
const Joi = require("joi");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const validate = (validator) => {
  return function (req, res, next) {
    const { error } = validateReturn(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
};

router.post("/", auth, validate(validateReturn), async (req, res) => {
  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) return res.status(404).send("Rental Not found");

  if (rental.dateReturned)
    return res.status(400).send("return processes already");

  rental.dateReturned = new Date();
  const rentalDays = moment().diff(rental.dateOut, "days");
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;

  await rental.save();
  //update movie stock
  await Movie.updateOne(
    { _id: rental.movie._id },
    { $inc: { numberInStock: 1 } }
  );
  return res.status(200).send(rental);
});
function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(req);
}
module.exports = router;
