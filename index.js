const express = require("express");
const { PORT, mongodburl } = require("./config.js");
const mongoose = require("mongoose");
const { Book } = require("./models/bookmodel.js");
const bodyPaser = require("body-parser");
const booksRoute = require("./routes/booksRoute.js");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const app = express();
app.use(bodyPaser.json());
app.use(cors());
//app.use(
//cors({
//origin: "http://localhost:3000/",
//methods: ["GET", "POST", "PUT", "DELETE"],
//allowedHeaders: ["content-Type"],
//})
//);
app.use(morgan("dev"));
app.use("/books", booksRoute);
app.use(express.static(path.join(__dirname, "./dist")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

mongoose
  .connect(mongodburl)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })

  .catch((error) => {
    console.log(error);
  });
