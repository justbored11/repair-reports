const express = require("express");
// const dataBase = require('../modules/database.js'); //database interface
// const { ensureAuth } = require('../middleware/auth')

const router = express.Router();
// test ID 62cdbb3b08a07c547dca5505

//controllers
const repairsController = require("../controllers/repair");

// @route '/repair/*'
//GET
router.get("/test", repairsController.testPost);
router.get("/", repairsController.getNewestRepairs);
router.get("/getrecords/:num", repairsController.getNewestRepairs);
router.get("/delete/:id", repairsController.deletePost);
router.get("/search", repairsController.searchRepairs);
router.get("/searchpage", repairsController.getSearchPage);
router.get("/edit/:id", repairsController.getEditPage);
router.get("/:id", repairsController.getRepairPage);

//POST
router.post("/", repairsController.addRepair);

//PUT
router.put("/edit/:id", repairsController.editRepair);

module.exports = router;
