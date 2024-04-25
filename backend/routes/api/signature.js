const router = require("express").Router();
const formController = require("../../controllers/formController");

router.get("/", formController.signForm);

module.exports = router;
