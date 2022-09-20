
// packages
const express = require('express')
const router = express.Router();
const formController = require("../controllers/form")
const { ensureAuth } = require('../middleware/auth')

// repair form page
router.get('/repairform',ensureAuth, async (request, response)=>{

    response.render('repairform.ejs',{title:"Repair Submission"});
})

// sign repair form
router.get('/repairform/sign',ensureAuth, async (request, response)=>{

    response.render('repairform.ejs',{title:"Repair Submission"});
})




module.exports = router;