

const submitBtn = document.getElementById("submit-btn");
const deleteBtn = document.getElementById('btn-delete')

submitBtn.addEventListener("submit", (e) => {
  e.preventDefault();
});

deleteBtn.addEventListener("submit", (req, res) => {
  try {
    const movie = Movie.deleteOne({ _id: req.params.id });
    res.status(201).render("movies.ejs", { movie });
  } catch (error) {
    res.status(500).json({ msg: "no movie with this id" });
  }
});