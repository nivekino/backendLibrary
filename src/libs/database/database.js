const mongoose = require("mongoose");
require("dotenv").config();

/* Connecting to the database. */
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB")
);
