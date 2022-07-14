// packages
const express = require('express')

//modules
const DataBase = require('../modules/database.js');



// create router instance
const router = express.Router();

//database instance
const dataBase = new DataBase(process.env.connectStr_,'Cata','repair-reports' )
    dataBase.connect()



// ROUTES
// ======================================================


//get a specified repair from database
router.get('/repairid/:repairId', async (request, response)=>{
   
    try{
         // get paremeter from url
        const repairId = request.params.repairId
        const repairObj = await dataBase.findRepair(repairId)

        console.log(`getting repair for render`,repairObj)
        response.status(200).json(repairObj)
     }
     catch(err){
        response.status(400).json({message:`ID: ${request.params.repairId}  NOT FOUND`, error:err})
    }
})




//get a specified repair from database
router.get('/repairinfo/:repairId', async (request, response)=>{
    // get paremeter from url
    try{
    const repairId = request.params.repairId
    const repairObj = await dataBase.findRepair(repairId)

    console.log(`getting repair for render`,repairObj)
    response.render('repairinfo.ejs',{repair:repairObj})
    }catch(err){
        response.status(400).json({message:`ID: ${request.params.repairId}  NOT FOUND`, error:err} )
    }
    
})


//exporting router instace of express.Router()
module.exports = router;