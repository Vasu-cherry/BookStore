import express, { request, response } from "express";
import { PORT, mongodburl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import bodyPaser from "body-parser";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

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

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);

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
