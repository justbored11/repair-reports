const signature = require('../modules/signuploadform')
const router =  require('express').Router()


module.exports={
    getForm:async (request, response)=>{

        response.render('repairform.ejs',{title:"Repair Submission"});
    },


    signForm:async (request, response)=>{
        
      //todo get signature and respond
      const sig = signature.signuploadform();
      console.log(`signform signature received `, sig)
  
      try{
          response.status(200).json({
              signature: sig.signature,
              timestamp: sig.timestamp,
              cloudname: process.env.cloud_name,
              apikey: process.env.cloud_key
          })
      }catch(error){
      } 
    }


}
