const router = require("express").Router();
const apiController = require("../../controllers/api/repairsController");

router.get("/", apiController.getNewestRepairs);
router.post("/", apiController.addRepair);
router.put("/", apiController.updateRepair);
router.get("/:id", apiController.getRepairById);

module.exports = router;
