// import modules
const express = require('express');
const DataBase = require('./DataBase');
const RepairEntry = require('./repairLogEntry');
const RepairStep = require('./RepairStep');
require('dotenv').config(); // to use with enviroment variables initializes enviroment vars




const app = express();
const PORT = 8000;

// let mongodb = new DataBase(process.env.connectStr,'Cata','repair-reports' )


app.set('view engine', 'ejs'); // for template
app.use(express.static('public')) //use templates from folder


app.get('/', (request, response)=>{

    // mongodb.getAll();
    response.render('index.ejs')

})





app.listen(process.env.PORT || PORT,()=>{
    console.log(`server runing on port ${PORT}`)
})




