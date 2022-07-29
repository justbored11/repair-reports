// packages
const express = require('express')

//modules
const dataBase = require('../modules/database.js'); //database interface



// create router instance
const router = express.Router();

// test ID 62cdbb3b08a07c547dca5505




//post repair to database
router.post('/repair', async (request, response)=>{
    try {
        let entry = (request.body)
        console.log(`post at /repairform`,entry)

        const result = await dataBase.insertLogEntry(entry)
        console.log(`done uploading at server`)
        response.send(result)

    } catch (error) {
        response.status(400).json({message:'failed to save repair', "error":error})
    }
})


router.get('/repair/search/',async (request,response)=>{

    
    const searchTerm = request.body.searchPhrase//
    console.log(`request`,searchTerm )
    const results = await dataBase.search(searchTerm);

    // console.log(results)
    // response.status(200).json({repairs:results})
    response.status(200).json(results)

})




// retrieve latest repairs with limit 
router.get('/repair/latest/:num',async (request,response)=>{

    const numRepairs =   request.params.num > 0 ? +request.params.num : 1;
   
  
    //retrieve latest repairs
    const results = await dataBase.latest(numRepairs);

    // console.log(results)
    response.status(200).json({repairs:results})

})


//details of single repair by ID
router.get('/repair/:id', async (request,response)=>{
  
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

