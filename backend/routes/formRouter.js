// packages
const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
const { ensureAuth } = require("../middleware/auth");

// repair form page
router.get("/", ensureAuth, formController.getForm);

// sign repair form
router.get("/sign", ensureAuth, formController.signForm); //! remove this deprecated check if any references
router.post("/sign", ensureAuth, formController.postSignForm); //sidecar for swapping to post instead

module.exports = router;
