const Fawn = require("fawn");
const moment = require("moment");
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("customerId not provided");
  if (!req.body.movieId) return res.status(400).send("movieIdId not provided");
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

module.exports = router;
