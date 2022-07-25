// packages
const express = require('express')

//modules
const dataBase = require('../modules/database.js'); //database interface



// create router instance
const router = express.Router();

// test ID 62cdbb3b08a07c547dca5505




// retrieve latest repairs
router.get('/repair/latest/:num',async (request,response)=>{
    const numRepairs =   request.params.num ? +request.params.num : 1;
    //how many repairs to retrieve newest to oldest
  
    //retrieve latest repairs
    const results = await dataBase.latest(numRepairs);

    // console.log(results)
    response.status(200).json({repairs:results})

})



router.get('/repair/info/:id', async (request,response)=>{
  
    try{
        // get paremeter from url
       const repairId = request.params.id
       const repairObj = await dataBase.findRepair(repairId)

       console.log(`getting repair for render`,repairObj)
       response.status(200).json(repairObj)
    }
    catch(err){
       response.status(400).json({message:`ID: ${request.params.repairId}  NOT FOUND`, error:err})
   }

})





module.exports = router;

