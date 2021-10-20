const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "must provide a year"],
  },
  image: {
    type: String,
    required: [true, "must provide an image"],
  },
  plot: {
    type: String,
    required: [true, "must provide a plot"],
    trim: true,
  },
  director: {
    type: String,
    required: [true, "must provide a director"],
    trim: true,
  },
  imdbRating: {
    type: Number,
    required: [true, "must provide a rating"],
  },
});

module.exports = mongoose.model("Movie", MovieSchema);