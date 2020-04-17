const Memory = require("../models/memory");

exports.getHome = (req, res, next) => {
  Memory.getMemories((memories) => {
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
  memory.save();
  res.redirect("/create-memory");
};

exports.getMemory = (req, res, next) => {
  const memoryID = req.params.id;
  Memory.getMemory(memoryID, (memory) => {
    res.render("detail-memory.ejs", {
      viewTitle: "Details",
      memory: memory,
    });
  });
};

exports.getEditMemory = (req, res, next) => {
  const memoryID = req.params.id;
  Memory.getMemory(memoryID, (memory) => {
    res.render("edit-memory.ejs", {
      viewTitle: "Details",
      memory: memory,
    });
  });
};

exports.postEditMemory = (req, res, next) => {
  const memoryID = req.body.id;
  Memory.getMemories((memories) => {
    const memoryTitle = req.body.title;
    const memoryGPS = req.body.gps;
    const memoryImageURL = req.body.imageURL;
    const memoryComment = req.body.comment;
    const updateMemory = new Memory(
      memoryTitle,
      memoryImageURL,
      memoryGPS,
      memoryComment,
      memoryID
    );
    updateMemory.update(memoryID);
    res.redirect(`detail-memory/${memoryID}`);
  });
};

exports.getDeleteMemory = (req, res, next) => {
  const memoryID = req.params.id;
  Memory.deleteMemory(memoryID)
  res.redirect("/");
};

exports.get404 = (req, res, next) => {
  res.status(404).render("404.ejs", { viewTitle: "Error 404" });
};
