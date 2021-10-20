const Movie = require('../models/Movie');


const getAllMovies = async (req, res) => {
    try {
       const allMovies = await Movie.find({})
       res.status(201).render("movies.ejs", { allMovies })
       console.log(allMovies);
    } catch (error) {
        res.status(500).json({ msg: "no movie inserted" });
    }
}

const insertMovie = async(req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({ movie });
    } catch (error) {
        res.status(500).json({ msg: 'no movie inserted' });
    }
}

const getMovie = async(req, res) => {
    try {
        const movie = await Movie.findOne({_id: req.params.id})
        if (!movie) {
          return res
            .status(404)
            .json({ msg: `no movie with id: ${req.params.id}` });
        }
        res.status(200).json({ movie });
    } catch (error) {
        res.status(500).json({ msg: "no movie with this id" });
    }
}

const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        });
        if (!movie) {
          return res
            .status(404)
            .json({ msg: `no movie with id: ${req.params.id}` });
        }
        res.status(200).json({movie})
    } catch (error) {
        res.status(500).json({ msg: "no movie with this id" });
    }
}

module.exports = {
  getAllMovies,
  insertMovie,
  getMovie,
  updateMovie,
//   deleteMovie,
};