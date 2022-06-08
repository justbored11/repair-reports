const secrets = require('../secrets.js')

const MongoClient = require('mongodb').MongoClient
// const uri = `mongodb+srv://mongo:pass123456@cluster0.losdw.mongodb.net/?retryWrites=true&w=majority`
const uri = `mongodb+srv://${secrets.cata_key}@cluster0.losdw.mongodb.net/?retryWrites=true&w=majority`

class DataBase {
    constructor(){
       

    }

   async connect(){
        const client = await MongoClient.connect(uri,{useUnifiedTopology:true})
        const db = await client.db('Cata')
        const collection = await db.collection('repair-reports')

        const all = await collection.find().toArray();
        console.log(all)

    }
}


let a = new DataBase

a.connect();

