
require('dotenv').config(); // to use with enviroment variables


const MongoClient = require('mongodb').MongoClient

class DataBase {
    constructor(connectStr_='empty string', db_='empty database select', collection_='empty collection select'){
        this.connectStr = connectStr_
        this.dbName = db_
        this.colName=collection_

        this.collection
        this.db

        this.connect() //test settings

    }
//test connection with settings
   async connect(){
        try{  
            const client = await MongoClient.connect(this.connectStr)

            console.log(this.dbName)

            this.db = await client.db(this.dbName)
            this.collection = await this.db.collection(this.colName)
            console.log(`connected to database`)  
        }
        catch(err){
            console.error('dataBase.connect error:'+ err);
            console.error(JSON.stringify(this))
        }
    }


//get all entries
    async getAll(){
        try{
            const all = await this.collection.find().toArray();
            // console.log(all)
            return new Promise((resolve, reject) => {
                resolve(all)
            })
        }
        catch(err){
            console.error('error at DataBase.getAll'+err)
        }
    }



    async insertLogEntry(logEntry_){


        const result = await this.collection.insertOne(logEntry_)

        return result;
    }



}

// TESTS




module.exports=DataBase