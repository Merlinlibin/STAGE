const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: { type: [String], required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
});

const movies = mongoose.model("movies", movieSchema);

module.exports = movies;
