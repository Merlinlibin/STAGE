const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genre = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi"];

// const myListSchema = new Schema({
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "movies",
// });

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    favoriteGenres: {
      type: [String],
      enum: genre,
      required: true,
    },
    dislikedGenres: {
      type: [String],
      enum: genre,
      required: true,
    },
  },
  myList: {
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
      },
    ],
    tvShows: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tvShows",
      },
    ],
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
