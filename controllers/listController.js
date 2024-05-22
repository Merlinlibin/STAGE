const User = require("../models/userModel");
const Movies = require("../models/movieModel");
const tvShows = require("../models/tvShowsModel");

const addList = async (req, res) => {
  try {
    const userId = req.user._id;
    const showId = req.params.id;

    // Find user by ID
    const user = await User.findById(userId);

    //Check the show was already in your list or not
    const tvshowIdx = user.myList.tvShows.indexOf(showId);
    const movieIdx = user.myList.movies.indexOf(showId);

    if (tvshowIdx >= 0 || movieIdx >= 0) {
      return res.status(400).send({ message: "Show Was already in your List" });
    }

    // Find show by ID
    const tvshow = await tvShows.findById(showId);
    const movie = await Movies.findById(showId);

    if (!tvshow && !movie) {
      return res.status(404).send({ message: "No content found" });
    }
    //if movie comes in push to the movies array
    if (movie) {
      user.myList.movies.push(movie);
      user.save();
    }
    //if tvShow comes in push to the tvShow array
    if (tvshow) {
      user.myList.tvShows.push(tvshow);
      user.save();
    }

    //returning response with the user
    res.status(200).send({ message: "show added to user's list", user });
  } catch (error) {
    console.error("Error adding TV show to user's list:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const removeList = async (req, res) => {
  try {
    const userId = req.user._id;
    const showId = req.params.id;

    // Find user by ID
    const user = await User.findById(userId);

    // Find show by ID
    const tvshow = user.myList.tvShows.indexOf(showId);
    const movie = user.myList.movies.indexOf(showId);

    if (tvshow === -1 && movie === -1) {
      return res
        .status(400)
        .send({ message: "No show found in My list to remove" });
    }
    //if movie id found splice it from the movies array
    if (movie !== -1) {
      user.myList.movies.splice(movie, 1);
      await user.save();
    }
    //if tvshow id found splice it from the tvshow array
    if (tvshow !== -1) {
      user.myList.tvShows.splice(tvshow, 1);
      await user.save();
    }

    //returning response with the user
    res.status(200).send({ message: "show removed from user's list", user });
  } catch (error) {
    console.error("Error deleiting show from user's list:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getList = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find user by ID
    const user = await User.findById(userId);

    //populating movies from the myList
    await user.myList.populate("movies");
    //populating tvShows from the myList
    await user.myList.populate("tvShows");

    //if movie list was empty return message instead of return []
    if (user.myList.movies.length === 0 && user.myList.tvShows.length === 0) {
      return res.status(400).send({ message: "No show found in My list " });
    }

    const myList = [...user.myList.movies, ...user.myList.tvShows];

    //returning all the list to the user
    res.status(200).send({ message: "Fetched user's list", myList });
  } catch (error) {
    console.error("Error getting user's list:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  addList,
  removeList,
  getList,
};
