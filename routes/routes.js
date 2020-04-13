const express = require("express");

const router = express.Router();

const mainController = require('../controllers/main')

router.get("/", mainController.getHome);

router.get("/create-memory", mainController.getCreateMemory);

router.post("/create-memory", mainController.postCreateMemory);

router.use(mainController.get404);

module.exports = router;