import express, { request, response } from "express";
import { PORT, mongodburl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import bodyPaser from "body-parser";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import path from "path";
import morgan from "morgan";

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
