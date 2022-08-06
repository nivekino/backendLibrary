const mongoose = require("mongoose");

const BooksModels = mongoose.model("Books", {
  title: String,
  author: String,
  publishedYear: Number,
  genere: String,
  stock: Number,
  image: String,
});

module.exports = BooksModels;