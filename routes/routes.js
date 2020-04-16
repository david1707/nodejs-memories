const express = require("express");

const router = express.Router();

const mainController = require('../controllers/main')

router.get("/", mainController.getHome);

router.get("/create-memory", mainController.getCreateMemory);

router.post("/create-memory", mainController.postCreateMemory);

router.get("/detail-memory/:id", mainController.getMemory);

router.get("/edit-memory/:id", mainController.getEditMemory);

router.post("/edit-memory/", mainController.postEditMemory);

router.use(mainController.get404);

module.exports = router;