const { User, validate } = require("../models/user");
const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //cehck if user is registered

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("user already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  await user.save();
  res.send(_.pick(user, ["name", "email"]));
});

module.exports = router;
