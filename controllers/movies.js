const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find({});
    res.status(201).render("movies.ejs", {
      allMovies,
    });
  } catch (error) {
    res.status(500).json({ msg: "no movies" });
  }
};


const insertMovie = async (req, res) => {
  try {
    const movie = await new Movie({
      title: req.body.title,
      image: req.body.image,
      plot: req.body.plot,
      year: req.body.year,
      director: req.body.director,
      imdbRating: req.body.rating,
    });
     await movie.save();

    res.status(200).render("insertMovie.ejs", {
      movie,
      path: '/movies/insert'
    });
    return res.redirect('/movies')
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "no movie inserted" });
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });
    if (!movie) {
      return res.json({ msg: `no movie with id: ${req.params.id}` });
    }
    res.status(200).render("singleMovie.ejs", {
      movie,
    });
  } catch (error) {
    res.status(500).json({ msg: "no movie with this id" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!movie) {
      return res
        .status(404)
        .json({ msg: `no movie with id: ${req.params.id}` });
    }
    res.status(200).render("update.ejs", {
      movie,
      path: "/update/:id",
    });
  } catch (error) {
    res.status(500).json({ msg: "no movie with this id" });
  }
};

const deleteMovie = (req, res, next) => {
  const movieId = req.body.movieId;
  Movie.findByIdAndRemove(movieId).then(() => {
    console.log("movie removed");
    res.redirect("/movies");
  });
};

module.exports = {
  getAllMovies,
  insertMovie,
  getMovie,
  updateMovie,
  deleteMovie,
};
