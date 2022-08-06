const express = require("express");
const middlewares = require("./libs/middleware/middleware");
const authRoutes = require("./routes/authRoutes").router;
const librarianRoutes = require("./routes/librarianRoutes").router;
const expressSanitizer = require("express-sanitizer");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const port = process.env.PORT || 9000;

const app = express();

dotenv.config();

var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(fileUpload());
app.use("/uploads", express.static("uploads"));

middlewares.setupMiddleware(app);

require("./libs/database/database");

app.use("/auth", authRoutes);
app.use("/librarian/", librarianRoutes);

app.listen(port, () => console.log("Server started on port", port));

exports.app = app;
