const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

app.get("/api/genres", (req, res) => {
  //send list of all genres
  return res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  //check if the genre with given id exist or not
  const genreIdRequested = parseInt(req.params.id);
  const genreFound = genres.find((g) => g.id === genreIdRequested);
  //if genre found then return that genre, else return 404 error, not found
  if (genreFound) {
    return res.send(genreFound);
  } else {
    return res.status(404).send(`No genre found with id:${genreIdRequested}`);
  }
});

//add new genres
app.post("/api/genres/", (req, res) => {
  //validate genre
  const { error } = validateGenre(req.body);
  //if there is error return the error
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // if no error then check if the genre already exist or not,
  //if not then add the genre

  const newGenreName = req.body.name;
  const genreFound = genres.findIndex(
    (g) => g.name.toLowerCase() == newGenreName.toLowerCase()
  );

  if (genreFound >= 0) return res.send("genre already exist");
  //add new genre and return it
  const newGenre = { id: genres.length + 1, name: newGenreName };
  genres.push(newGenre);

  return res.send(newGenre);
});

//modify the current genre with id
app.put("/api/genres/:id", (req, res) => {

  const genreId = parseInt(req.params.id);
  //look for the genre with given id, if not found return error
  const genre = genres.find((c) => c.id === genreId);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  //validate genre
  const { error } = validateGenre(req.body);
  //if there is error return the error
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // if no error then add the new genre,

  const genreNewName = req.body.name;
  genre.name = genreNewName;

  return res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {

  //find the genre with given ID
  const genre = genres.find((c) => c.id === parseInt(req.params.id));

  //if genre not found, return 404 error , not found
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  //delete given genre
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
  });
  return schema.validate(genre);
};
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("started listening on port: ", port);
});
