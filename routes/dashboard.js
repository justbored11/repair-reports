///dashboard router
const express = require("express");
const { ensureAuth } = require("../middleware/auth");
const router = express.Router();

//controllers
const dashboardController = require("../controllers/dashboard.js");

// @route '/dashboard/'
router.get("/", dashboardController.getDashboard);
module.exports = router;
