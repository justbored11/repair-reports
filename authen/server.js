const express = require('express');
const { ServerApiVersion } = require('mongodb');
const app = express();
const PORT = 8000;
const connect = require('./db')


try {
    connect();
} catch (error) {
    console.error(`connection error: ${error}`)
}


const server = app.listen(PORT,()=>console.log(`server connected on ${PORT}`))


//when something is unhandled close server
process.on('unhandledRejection',err=>{
    console.log(`an error occured: ${err.message}`)
    server.close(()=>process.exit(1))
})