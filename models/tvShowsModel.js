const mongoose = require("mongoose");
const { Schema } = mongoose;

const episodeSchema = new Schema({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
});

const tvShowSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: { type: [String], required: true },
  episodes: { type: [episodeSchema], required: true },
});

// Create a model using the schema
const tvShows = mongoose.model("tvShows", tvShowSchema);

module.exports = tvShows;
