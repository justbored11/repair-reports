

const express = require('express');
const DataBase = require('./modules/database');
const RepairEntry = require('./modules/repairLogEntry');
const RepairStep = require('./modules/RepairStep');

const signature = require('./modules/signuploadform');

require('dotenv').config(); // to use with enviroment variables initializes enviroment vars

require('dotenv').config(); // to use with enviroment variables




// let collection = new DataBase(process.env.connectStr,'Cata','repair-reports' )



 async function test() {
    // let database =  new DataBase(process.env.connectStr,'Cata','repair-reports' )
    // let result = await database.connect()

    console.log(signature.signuploadform());

    }



    
test()

