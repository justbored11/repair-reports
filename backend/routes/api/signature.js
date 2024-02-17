const router = require("express").Router();
const signatureController = require("../../controllers/form");

router.get("/", signatureController.signForm);

module.exports = router;
