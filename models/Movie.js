const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    
    trim: true,
  },
  year: {
    type: Number,
    
  },
  image: {
    type: String,
    
  },
  plot: {
    type: String,
   
    trim: true,
  },
  director: {
    type: String,
    
    trim: true,
  },
  imdbRating: {
    type: Number,
    
  },
});

module.exports = mongoose.model("Movie", MovieSchema);