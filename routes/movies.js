const express = require("express");
const router = express.Router();
const isAuth = require('../middleware/is-auth')

const {
  getAllMovies,
  insertMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  
} = require("../controllers/movies");

const {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  postLogout,
} = require('../controllers/authentication')

router.get("/", getAllMovies);
router.get("/insert", isAuth, insertMovie).post(insertMovie);
router.get("/edit-movie/:id", isAuth, getMovie)
router.get("/update/:id", isAuth, updateMovie).post(updateMovie);
router.post('/delete-movie', isAuth, deleteMovie);
router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.post('/logout', postLogout);


module.exports = router;