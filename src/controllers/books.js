const uuid = require("uuid");
const BooksModels = require("../models/BooksModels");
const path = require("path");

const addBook = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let { title, author, publishedYear, genere, stock } = req.body;
    if (
      !title ||
      !author ||
      !publishedYear ||
      !genere ||
      !stock ||
      stock <= 0
    ) {
      resolve(res.status(400).json({ message: "please fill all fields" }));
    } else {
      
      let EDFile = req.files.files;
      let fileName = `${uuid.v4().replace(/-/g, "")}${path.extname(
        EDFile.name
      )}`;
      const fullUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${fileName}`;
      EDFile.mv(`uploads/${fileName}`);

      BooksModel.find({
        title: req.sanitize(title),
        author: req.sanitize(author),
        publishedYear: req.sanitize(publishedYear),
        genere: req.sanitize(genere),
      })
        .then((book) => {
          if (book.length > 0) {
            resolve(res.status(401).json({ message: "Book already exists" }));
          } else {
            let newBook = new BooksModel({
              title: req.sanitize(title),
              author: req.sanitize(author),
              publishedYear: req.sanitize(publishedYear),
              genere: req.sanitize(genere),
              stock: req.sanitize(stock),
              image: fullUrl,
            });
            newBook.save();
            resolve(
              res.status(200).json({ message: "Book added susscefully" })
            );
          }
        })
        .catch((err) => {
          reject(
            res
              .status(500)
              .json({ message: "Internal server error", details: err.message })
          );
        });
    }
  });
};

exports.addBook = addBook;