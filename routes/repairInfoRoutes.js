// packages
const express = require('express')

//modules
const dataBase = require('../modules/database.js');



// create router instance
const router = express.Router();

// test ID 62cdbb3b08a07c547dca5505


// ROUTES
// ======================================================

//get a specified repair from database
router.get('/repairinfo/:repairId', async (request, response)=>{
    // get paremeter from url
    try{
    const repairId = request.params.repairId
    const repairObj = await dataBase.findRepair(repairId)

    console.log(`getting repair for render`,repairObj)

    //render 
    response.render('repairinfo.ejs',{repair:repairObj})
    
    }catch(err){
        response.status(400).json({message:`ID: ${request.params.repairId}  NOT FOUND`, error:err} )
    }
    
})


//exporting router instace of express.Router()
module.exports = router;