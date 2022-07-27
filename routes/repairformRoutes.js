
// packages
const express = require('express')

//modules
const dataBase = require('../modules/database.js');



// create router instance
const router = express.Router();




// repair form page
router.get('/repairform', async (request, response)=>{

    response.render('repairform.ejs');
})


module.exports = router;