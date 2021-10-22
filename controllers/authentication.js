const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getLogin = (req, res, next) => {
  res.render("login", {
    path: "/login",

    isAuthenticated: req.session.isLoggedIn,
  });
};

const getSignup = (req, res, next) => {
  res.render("signup", {
    path: "/signup",

    isAuthenticated: req.session.isLoggedIn,
  });
};

const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/movies/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;

            return req.session.save((err) => {
              console.log(err);
              res.redirect("/movies");
            });
          }
          res.redirect("/movies/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/movies/login");
        });
    })
    .catch((err) => console.log(err));
};

const postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/movies/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/movies/login");
        });
    })

    .catch((err) => {
      console.log(err);
    });
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/movies");
  });
};

module.exports = {
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  postLogout,
};
