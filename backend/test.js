

const express = require('express');
const DataBase = require('./DataBase');
const RepairEntry = require('./repairLogEntry');
const RepairStep = require('./RepairStep');
require('dotenv').config(); // to use with enviroment variables initializes enviroment vars

require('dotenv').config(); // to use with enviroment variables




// let collection = new DataBase(process.env.connectStr,'Cata','repair-reports' )



 async function getAll() {
    let database =  new DataBase(process.env.connectStr,'Cata','repair-reports' )
    let result = await database.connect()


    // database.connect()


    const items = await database.getAll();

    
    console.log(items)
    }



    
getAll()

