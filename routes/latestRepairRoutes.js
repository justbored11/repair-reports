// packages
const express = require('express')

//modules
const dataBase = require('../modules/database.js');



// create router instance
const router = express.Router();




    //routes
router.get('/repairs',async (request,response)=>{

    const results = await dataBase.latest();

    // console.log(results)
    response.status(200).json({repairs:results})

})

module.exports = router;

