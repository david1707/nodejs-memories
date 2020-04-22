const Memory = require("../models/memory");

exports.getHome = (req, res, next) => {
  // Memory.getMemories().then((memories) => {
  Memory.find().then((memories) => {
    res.render("home.ejs", { viewTitle: "Home", memories: memories });
  });
};

exports.getCreateMemory = (req, res, next) => {
  res.render("create-memory.ejs", { viewTitle: "Create a new memory" });
};

exports.postCreateMemory = (req, res, next) => {
  const { title, imageUrl, gps, comment } = req.body;
  const memory = new Memory({ title, imageUrl, gps, comment });
  memory
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.error(err));
};

exports.getMemory = (req, res, next) => {
  const memoryID = req.params.id;
  // Memory.getMemory(memoryID)
  Memory.findById(memoryID)
    .then((memory) => {
      res.render("detail-memory.ejs", {
        viewTitle: "Details",
        memory: memory,
      });
    })
    .catch((err) => console.error(err));
};

exports.getEditMemory = (req, res, next) => {
  const memoryID = req.params.id;
  Memory.findById(memoryID)
    .then((memory) => {
      res.render("edit-memory.ejs", {
        viewTitle: "Details",
        memory: memory,
      });
    })
    .catch((err) => console.error(err));
};

exports.postEditMemory = (req, res, next) => {
  const { id, title, imageUrl, gps, comment } = req.body;

  // Memory.updateMemory(memoryID, {
  //   title,
  //   imageUrl,
  //   gps,
  //   comment,
  // })
  Memory.findByIdAndUpdate(
    id,
    { $set: { title, imageUrl, gps, comment } },
    { new: true }
  )
    .then((memory) => {
      res.render("detail-memory.ejs", {
        viewTitle: "Details",
        memory: memory,
      });
    })
    .catch((err) => console.error(err));
};

exports.getDeleteMemory = (req, res, next) => {
  const memoryID = req.params.id;
  // Memory.deleteMemory(memoryID)
  Memory.findOneAndDelete(memoryID)
    .then((result) => res.redirect("/"))
    .catch((err) => console.error(err));
};

exports.get404 = (req, res, next) => {
  res.status(404).render("404.ejs", { viewTitle: "Error 404" });
};
