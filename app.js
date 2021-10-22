
const User = require("./models/User");
const express = require('express');
const app = express();
const movies = require ('./routes/movies')
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf')
const connectDB = require('./db/connect')
require('dotenv').config()
const path = require('path')





const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});



app.use(express.json());
app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({
    extended: true
}))
const csrfProtection = csrf();

app.set("view engine", "ejs");

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next()
})

app.use('/movies', movies)

// app.get("/movies", async (req, res) => {
//   const response = await axios(`https://www.omdbapi.com/?apikey=9d0177af&s=ba`);
//   const data = response.data.Search
//   console.log(data);
//   res.render('movies.ejs', {data})
// });


const port = 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`));
        
    } catch (error) {
        console.log(error);
    }
}

start()