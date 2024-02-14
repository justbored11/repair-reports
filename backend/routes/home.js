//home page
const express = require("express");
const router = express.Router();

//controllers
const homeController = require("../controllers/home");

// @route '/'
router.get("/", homeController.getHome);

module.exports = router;
