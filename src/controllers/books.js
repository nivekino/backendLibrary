const uuid = require("uuid");
const BooksModels = require("../models/BooksModels");
const path = require("path");

const addBook = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let { title, author, publishedYear, genere, stock } = req.body;
    if (!title || !author || !publishedYear || !genere || !stock) {
      resolve(res.status(400).json({ message: 'Missing data' }));
    } else {
      BooksModels.find({
        title: req.sanitize(title),
        author: req.sanitize(author),
        publishedYear: req.sanitize(publishedYear),
        genre: req.sanitize(genere),
      })
        .then((book) => {
          if (book.length > 0) {
            resolve(res.status(401).json({ message: 'Book already exists' }));
          } else {
            let newBook = new BooksModels({
              title: req.sanitize(title),
              author: req.sanitize(author),
              publishedYear: req.sanitize(publishedYear),
              genere: req.sanitize(genere),
              stock: req.sanitize(stock),
            });
            newBook.save();
            resolve(res.status(200).json({ message: 'Book added' }));
          }
        })
        .catch((err) => {
          reject(
            res
              .status(500)
              .json({ message: 'Internal server error', details: err.message })
          );
        });
    }
  });
};

const getBooks = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let { page } = req.params;
    let limit = 8;
    let offset = (page - 1) * limit;

    let numPages = 1;

    const count = await BooksModels.countDocuments();
    numPages = Math.ceil(count / limit);

    BooksModels.find({})
      .skip(offset)
      .limit(limit)
      .then((books) => {
        if (books.length > 0) {
          resolve(res.status(200).json({ numPages: numPages, books: books }));
        } else {
          resolve(res.status(200).json({ message: "No books found" }));
        }
      })
      .catch((err) => {
        reject(
          res
            .status(500)
            .json({ message: "Internal server error", details: err.message })
        );
      });
  });
};

const getBookById = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let { idBook } = req.params;
    BooksModels.findById(idBook)
      .then((book) => {
        if (book) {
          resolve(res.status(200).json(book));
        } else {
          resolve(res.status(401).json({ message: "Book not found" }));
        }
      })
      .catch((err) => {
        reject(
          res
            .status(500)
            .json({ message: "Internal server error", details: err.message })
        );
      });
  });
};

const getBooksByPagination = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let { page } = req.params;
    let limit = 8;
    let offset = (page - 1) * limit;

    let numPages = 1;

    const count = await BooksModels.countDocuments();
    numPages = Math.ceil(count / limit);

    BooksModels.find({})
      .skip(offset)
      .limit(limit)
      .then((books) => {
        if (books.length > 0) {
          resolve(res.status(200).json({ numPages: numPages, books: books }));
        } else {
          resolve(res.status(401).json({ message: "No books found" }));
        }
      })
      .catch((err) => {
        reject(
          res
            .status(500)
            .json({ message: "Internal server error", details: err.message })
        );
      });
  });
};

const searchBook = (req, res) => {
  return new Promise(async (resolve, reject) => {
    let { title, author, publishedYear, genere } = req.body;
    let { page } = req.params;

    let limit = 8;
    let offset = (page - 1) * limit;

    let query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (author) {
      query.author = { $regex: author, $options: "i" };
    }
    if (publishedYear) {
      query.publishedYear = publishedYear;
    }
    if (genere) {
      query.genere = { $regex: genere, $options: "i" };
    }

    let numPages = 1;

    const count = await BooksModels.countDocuments(query);
    numPages = Math.ceil(count / limit);

    BooksModels.find(query)
      .skip(offset)
      .limit(limit)
      .then((books) => {
        if (books.length > 0) {
          resolve(res.status(200).json({ numPages: numPages, books: books }));
        } else {
          resolve(
            res.status(200).json({ message: "No books found", books: [] })
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
  });
};

exports.addBook = addBook;
exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.getBooksByPagination = getBooksByPagination;
exports.searchBook = searchBook;
