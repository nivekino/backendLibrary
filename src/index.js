const express = require("express");
const authRoutes = require("./routes/authRoutes").router;
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 9000;
const mongoose = require("mongoose");



require("dotenv").config();

// mongodb connection
require("./libs/database/database");

var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.status(200).send("welcome to api library");
});

app.listen(port, () => console.log("Server started on port", port));
