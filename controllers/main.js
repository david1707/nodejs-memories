const Memory = require("../models/memory");

exports.getHome = (req, res, next) => {
  Memory.getMemories().then((memories) => {
    res.render("home.ejs", { viewTitle: "Home", memories: memories });
  });
};

exports.getCreateMemory = (req, res, next) => {
  res.render("create-memory.ejs", { viewTitle: "Create a new memory" });
};

exports.postCreateMemory = (req, res, next) => {
  const memoryTitle = req.body.title;
  const memoryGPS = req.body.gps;
  const memoryImageURL = req.body.imageURL;
  const memoryComment = req.body.comment;

  const memory = new Memory(
    memoryTitle,
    memoryImageURL,
    memoryGPS,
    memoryComment
  );
  memory
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.error(err));
};

exports.getMemory = (req, res, next) => {
  const memoryID = req.params.id;
  Memory.getMemory(memoryID)
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
  Memory.getMemory(memoryID)
    .then((memory) => {
      res.render("edit-memory.ejs", {
        viewTitle: "Details",
        memory: memory,
      });
    })
    .catch((err) => console.error(err));
};

exports.postEditMemory = (req, res, next) => {
  const memoryID = req.body.id;
  const memoryTitle = req.body.title;
  const memoryImageUrl = req.body.imageURL;
  const memoryGps = req.body.gps;
  const memoryComment = req.body.comment;

  Memory.updateMemory(memoryID, {
    title: memoryTitle,
    imageUrl: memoryImageUrl,
    gps: memoryGps,
    comment: memoryComment,
  })
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
  Memory.deleteMemory(memoryID)
    .then((result) => res.redirect("/"))
    .catch((err) => console.error(err));
};

exports.get404 = (req, res, next) => {
  res.status(404).render("404.ejs", { viewTitle: "Error 404" });
};
