const express = require("express");
const router = express.Router();

const {
    getAllMovies,
    insertMovie,
    getMovie,
    updateMovie,
    deleteMovie,
} = require('../controllers/movies');

router.route("/").get(getAllMovies)
router.route("/insert").get(insertMovie).post(insertMovie);
router.route("/:id").get(getMovie)
router.route("/update/:id").get(updateMovie).post(updateMovie);
router.route('/delete-movie').post(deleteMovie);


module.exports = router;