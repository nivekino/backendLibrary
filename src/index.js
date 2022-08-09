const express = require("express");
const middlewares = require("./libs/middleware/middleware");
const authRoutes = require("./routes/authRoutes").router;
const librarianRoutes = require("./routes/librarianRoutes").router;
const studentRoutes = require("./routes/studentsRoutes").router;
const expressSanitizer = require("express-sanitizer");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const port = process.env.PORT || 9000;

const app = express();

dotenv.config();

var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(expressSanitizer());

middlewares.setupMiddleware(app);

require("./libs/database/database");

app.use("/auth", authRoutes);
app.use("/librarian/", librarianRoutes);
app.use("/student/", studentRoutes);

app.listen(port, () => console.log("Server started on port", port));

exports.app = app;