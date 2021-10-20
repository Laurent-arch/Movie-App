const express = require("express");
const router = express.Router();

const {
    getAllMovies,
    insertMovie,
    getMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movies');

router.route('/').get(getAllMovies).post(insertMovie)
router.route('/:id').get(getMovie).patch(updateMovie)
// .delete(deleteMovie);

module.exports = router;