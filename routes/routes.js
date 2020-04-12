const path = require("path");

const express = require("express");

const router = express.Router();

const memories = [];

// router.get('/', (req, res, next) => {
//     console.log('HOME')
//     res.send('<html><head><title>Home</title></head><body><h1>Home</h1></body></html>')
// })

// router.get('/create-memory', (req, res, next) => {
//     console.log('CREATE MEMORY')
//     res.send('<h1>Create a new memory</h1>')
// })

// router.use((req, res, next) => {
//     res.status(404).send('<h1>This route is invalid, sorry :( </h1>')
// })

router.get("/", (req, res, next) => {
  console.log(memories);
  // res.sendFile(path.join(rootPath, "views", "home.html"));
  res.render("home.ejs", {viewTitle: 'Home', memories: memories});
});

router.get("/create-memory", (req, res, next) => {
  // res.sendFile(path.join(rootPath, "views", "create-memory.html"));
  res.render("create-memory.ejs", {viewTitle: 'Create a new memory'});
});

router.post("/create-memory", (req, res, next) => {
  const postedTitle = req.body.title;
  memories.push({ title: postedTitle });
  res.redirect("/create-memory");
});

router.use((req, res, next) => {
  // res.status(404).sendFile(path.join(rootPath, "views", "404.html"));
  res.status(404).render("404.ejs", {viewTitle: 'Error 404'});
});

module.exports = router;
