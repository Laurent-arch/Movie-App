
const express = require('express');
const app = express();
const movies = require ('./routes/movies')
const axios = require ('axios')
const connectDB = require('./db/connect')
require('dotenv').config()
const path = require('path')


app.use(express.json());
app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({
    extended: true
}))
app.set("view engine", "ejs");

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