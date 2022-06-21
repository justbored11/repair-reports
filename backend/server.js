// import modules
const express = require('express');
const DataBase = require('./DataBase');
const RepairEntry = require('./repairLogEntry');
const RepairStep = require('./RepairStep');
require('dotenv').config(); // to use with enviroment variables initializes enviroment vars


const app = express();
const PORT = 8000;

let dataBase = new DataBase(process.env.connectStr,'Cata','repair-reports' )
dataBase.connect()

app.set('view engine', 'ejs'); // for template
app.use(express.static('public')) //use templates from folder


app.get('/', async (request, response)=>{

    let result = await dataBase.getAll();

    
    console.log(result)
    response.send(result)

})





app.listen(process.env.PORT || PORT,()=>{
    console.log(`server runing on port ${PORT}`)
})




