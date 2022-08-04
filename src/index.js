const express = require("express");
const axios = require("axios");
const middlewares = require("./libs/middleware/middleware");
const authRoutes = require("./routes/authRoutes").router;
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 9000;
const dotenv = require("dotenv");
dotenv.config();

var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

middlewares.setupMiddleware(app);

require("./libs/database/database");

app.use("/auth", authRoutes);

app.listen(port, () => console.log("Server started on port", port));

exports.app = app;