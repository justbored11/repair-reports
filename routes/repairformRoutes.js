
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




// repair form page
router.post('/repairform',async (request, response)=>{
   
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

module.exports = router;