const express = require("express");
const router = express.Router();
const middlewares = require("../libs/middleware/auth");
const booksHttpHandler = require("../controllers/books");
const authHttpHandler = require("../libs/auth/auth");
const requestsHttpHandler = require("../controllers/request");

router.route("/createUsers").post(middlewares.isLibrarian, authHttpHandler.createUser);

router.route("/add").post(middlewares.isLibrarian, booksHttpHandler.addBook);

router.get(
  "/getBooks/:page",
  middlewares.isLibrarian,
  booksHttpHandler.getBooks
);

router
  .route("/books/details/:idBook")
  .get(middlewares.protectWithJwt, booksHttpHandler.getBookById);

router
  .route("/getRequestedBooks/:page")
  .post(middlewares.isLibrarian, requestsHttpHandler.getRequestedBooks);

router
  .route("/returnBook")
  .post(middlewares.isLibrarian, requestsHttpHandler.ReturnBook);

router
  .route("/requestBookDetail/:requestId")
  .get(middlewares.isLibrarian, requestsHttpHandler.getRequestById);

exports.router = router;
