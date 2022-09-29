const express = require("express");

// Dependencies

const compression = require("compression");
const multer = require("multer");
var upload = multer({ dest: "./public/uploads" });

const mongoose = require("mongoose");
var cors = require("cors");
const app = express();
app.use(cors());
const tourRoute = require("./routes/tour.routes");
// app.use(express.json())
app.use(express.json());

const coonectionToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
};

const dotenv = require("dotenv").config();

const port = process.env.PORT || 8000;

app.use("/api/v1/", tourRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sets ejs as the template engine
app.set("view engine", "ejs");

// Enables Gzip compression
app.use(compression());

// Serving files in the public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/send", upload.array("fileName", 3), (req, res) => {
  console.log(req.files);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  coonectionToDb();
});
