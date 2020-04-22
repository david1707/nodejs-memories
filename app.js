const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Template engine
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

// Routes
const routes = require("./routes/routes");

app.use(routes);

mongoose
  .connect(
    "mongodb+srv://david:nonono33@cluster0-qnzrq.mongodb.net/tutorial?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
