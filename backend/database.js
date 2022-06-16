const secrets = require('../secrets.js')


const MongoClient = require('mongodb').MongoClient
// const uri = `mongodb+srv://mongo:pass123456@cluster0.losdw.mongodb.net/?retryWrites=true&w=majority`
const uri = `mongodb+srv://${secrets.cata_key}@cluster0.losdw.mongodb.net/?retryWrites=true&w=majority`

class DataBase {
    constructor(){
        let db
        let collection
       

    }

   async connect(){
        console.log(`connect at database`)
        const client = await MongoClient.connect(uri,{useUnifiedTopology:true})
        this.db = await client.db('Cata')
        this.collection = await this.db.collection('repair-reports')

        const all = await this.collection.find().toArray();
        console.log(all)

    }
}

module.exports=DataBase