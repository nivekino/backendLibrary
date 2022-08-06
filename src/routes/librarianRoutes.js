const express = require("express");
const router = express.Router();
const middlewares = require("../libs/middleware/auth");
const booksHttpHandler = require("../controllers/books");
const authHttpHandler = require("../libs/auth/auth");

router
  .route("/register")
  .post(middlewares.isLibrarian, authHttpHandler.createUser);

router.route("/add").post(middlewares.isLibrarian, booksHttpHandler.addBook);

exports.router = router;
