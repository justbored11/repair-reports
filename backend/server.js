// import modules
const express = require('express');
const DataBase = require('./DataBase');
const RepairEntry = require('./repairLogEntry');
const RepairStep = require('./RepairStep');
require('dotenv').config(); // to use with enviroment variables initializes enviroment vars




const app = express();
const PORT = 8000;

let mongodb = new DataBase(process.env.connectStr,'Cata','repair-reports' )


app.get('/', (request, response)=>{

    mongodb.getAll();
    response.send('<h1>repair reports server </h1>')

})





app.listen(PORT,()=>{
 
})




