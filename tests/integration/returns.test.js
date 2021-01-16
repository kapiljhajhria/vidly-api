//POST /api/returns {customerIs,movieId}
const request = require("supertest");
const { Genre } = require("../../models/genre");
const { Rental } = require("../../models/rental");
const mongoose = require("mongoose");

let server;

//return 401 if client is not logged in
describe("/api/returns", () => {
  let customerId = mongoose.Types.ObjectId();
  let movieId = mongoose.Types.ObjectId();
  let rental;
  beforeEach(async () => {
    server = require("../../index");
    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "123456",
      },
      movie: {
        _id: movieId,
        title: "some random movie",
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    server.close();
    await Rental.remove({});
  });

  it("should word", async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull();
  });

  it("return 401 if not logged in", async () => {
    const res = await request(server)
      .post("/api/returns")
      .setEncoding({ customerId, movieId });

    expect(res.status).toBe(401);
  });
});

//check if customerId is provided, return 400 if not provided

//check if movieId is provided, return 400 if not provided

//return 404 if no rental found for this customer and movie

//return 400 if rental already processed

//return 200 if valid request

//set return date

//caculate rental fees

//increase the stock

//return rental object
