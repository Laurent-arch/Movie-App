const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

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
  getReset,
  postReset,
  getNewPassword,
  postNewPassword
} = require("../controllers/authentication");

router.get("/", getAllMovies);
router.get("/insert", isAuth, insertMovie).post("/insert", isAuth, insertMovie);
router.get("/edit-movie/:id", isAuth, getMovie);
router
  .get("/update/:id", isAuth, updateMovie)
  .post("/update/:id", isAuth, updateMovie);
router.post("/delete-movie", isAuth, deleteMovie);
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/signup", getSignup);
router.post("/signup", postSignup);
router.post("/logout", postLogout);
router.get("/reset", getReset);
router.post('/reset', postReset)
router.get('/reset/:token', getNewPassword);
router.post("/reset/:token", postNewPassword);

module.exports = router;
