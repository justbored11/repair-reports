// import modules
const express = require('express');
const DataBase = require('./database');
const database = require('./database')



const app = express();
const PORT = 8000;



app.get('/', (request, response)=>{

    response.send('<h1>repair reports server </h1>')

})





app.listen(PORT)


let test = new DataBase

test.connect()
