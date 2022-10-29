
// packages
const express = require('express')
const router = express.Router();
const formController = require("../controllers/form")
const { ensureAuth } = require('../middleware/auth')

// repair form page
router.get('/repairform',ensureAuth, formController.getForm)

// sign repair form
router.get('/repairform/sign',ensureAuth, formController.signForm)




module.exports = router;