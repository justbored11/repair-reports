// import modules
const express = require('express');
const DataBase = require('./database');
require('dotenv').config(); // to use with enviroment variables



const app = express();
const PORT = 8000;



app.get('/', (request, response)=>{

    response.send('<h1>repair reports server </h1>')

})





app.listen(PORT)


let test = new DataBase(process.env.connectStr,'Cata','repair-reports' )
test.connect()
