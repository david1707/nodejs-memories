const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var flash = require("connect-flash");
const session = require("express-session");

const app = express();

// Template engine
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(
  session({
    secret: "my_secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.messages = req.flash("messages");
  next();
});

// Routes
const routes = require("./routes/routes");

app.use(routes);

mongoose
  .connect(
    "mongodb+srv://david:nonono33@cluster0-qnzrq.mongodb.net/tutorial?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
