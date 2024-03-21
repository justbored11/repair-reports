const router = require("express").Router();
const imagesController = require("../../controllers/images.js");

router.delete("/", imagesController.deleteImage);

module.exports = router;
