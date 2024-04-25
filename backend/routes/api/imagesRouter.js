const router = require("express").Router();
const imagesController = require("../../controllers/api/imagesController.js");

router.delete("/", imagesController.deleteImage);

module.exports = router;
