const express = require("express");
const { check } = require("express-validator/check");

const router = express.Router();

const apiController = require("../controllers/api");
const mainController = require("../controllers/main");

router.get("/", mainController.getHome);

router.get("/create-memory", mainController.getCreateMemory);

router.post(
  "/create-memory",
  [
    check("title", "The title must be between 5 and 100 characters")
      .isLength({ min: 5, max: 100 })
      .trim(),
    check("imageUrl", "Please, use a proper URL").isURL().trim(),
    check('gps').trim().custom((value) => {
        if(value.split(', ').length === 2) {
            return true
        } 
        throw new Error('Please, introduce an array of two numerical values')
    }),
    check("comment", "Please, introduce a short comment of, at least, 20 characters")
    .isLength({ min: 20 })
    .trim(),
  ],
  mainController.postCreateMemory
);

router.get("/detail-memory/:id", mainController.getMemory);

router.get("/edit-memory/:id", mainController.getEditMemory);

router.post("/edit-memory/", mainController.postEditMemory);

router.get("/delete-memory/:id", mainController.getDeleteMemory);

// API-like route

router.get("/api/get-memories", apiController.getMemories);

router.use(mainController.get404);

module.exports = router;
