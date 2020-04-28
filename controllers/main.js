const { validationResult } = require("express-validator");

const Memory = require("../models/memory");

exports.getHome = (req, res, next) => {
  // Memory.getMemories().then((memories) => {
  Memory.find().then((memories) => {
    res.render("home.ejs", { viewTitle: "Home", memories: memories });
  });
};

exports.getCreateMemory = (req, res, next) => {
  res.render("create-memory.ejs", {
    viewTitle: "Create a new memory",
    oldMemory: { title: "", imageUrl: "", gps: "", comment: "" },
    validationErrors: [],
  });
};

exports.postCreateMemory = (req, res, next) => {
  const { title, imageUrl, gps, comment } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("messages", {
      text: errors.array()[0].msg,
      type: "danger",
    });
    return res.status(422).render("create-memory.ejs", {
      viewTitle: "Create a new memory",
      oldMemory: { title, imageUrl, gps, comment },
      validationErrors: errors.array()
    });
  }
  const memory = new Memory({ title, imageUrl, gps, comment });

  memory
    .save()
    .then((result) => {
      req.flash("messages", {
        text: "Memory created!",
        type: "success",
      });
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

  if (title.length < 4) {
    req.flash("messages", {
      text: "The title is too short. It should have at least 4 charcters.",
      type: "danger",
    });
    res.render("create-memory", {
      memory: req.body,
      viewTitle: "Create a new memory",
      messages: req.flash("messages"),
    });
  } else {
    Memory.findByIdAndUpdate(
      id,
      { $set: { title, imageUrl, gps, comment } },
      { new: true }
    )
      .then((memory) => {
        req.flash("messages", {
          text: `Memory updated successfully!`,
          type: "success",
        });
        res.render("detail-memory.ejs", {
          viewTitle: "Details",
          memory: memory,
          messages: req.flash("messages"),
        });
      })
      .catch((err) => console.error(err));
  }
};

exports.getDeleteMemory = (req, res, next) => {
  const memoryID = req.params.id;
  // Memory.deleteMemory(memoryID)
  Memory.findOneAndDelete(memoryID)
    .then((result) => {
      req.flash("messages", {
        text: `Memory deleted!`,
        type: "success",
      });
      res.redirect("/");
    })
    .catch((err) => console.error(err));
};

exports.get404 = (req, res, next) => {
  res.status(404).render("404.ejs", { viewTitle: "Error 404" });
};
