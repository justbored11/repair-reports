
require('dotenv').config(); // to use with enviroment variables
const MongoClient = require('mongodb').MongoClient
// const ImageUpload = require('./imageupload')


//cludinary config
// cloudinary.config({ 
//     cloud_name: process.env.cloud_name, 
//     api_key: process.env.cloud_key, 
//     api_secret:process.env.cloud_secret,
//     secure: true
//   });




//mongo config
class DataBase {
     constructor(connectStr_='empty string', db_='empty database select', collection_='empty collection select'){
        this.connectStr = connectStr_
        this.dbName = db_
        this.colName=collection_
        this.client
        this.collection = 'empty'
        this.db = 'empty'

        // this.connect() //test settings
        

    }


    
//test connection with settings
   async connect(){
        try{  
            const client = await MongoClient.connect(this.connectStr)

            console.log(this.dbName)

            this.db = await client.db(this.dbName)
            this.collection = await this.db.collection(this.colName)
            console.log(`connected to database`)  
            // console.log(this.collection)
            // return this.collection
            return 'ok'
        }
        catch(err){
            console.error('dataBase.connect error:'+ err);
            console.error(JSON.stringify(this))
        }
    }


//get all entries
    async getAll(){
        try{
            const cursor = await this.collection.find().toArray();
            console.log(cursor)
   
            // this.collection.find().close()
            return cursor;
        }
        catch(err){
            console.error('error at DataBase.getAll'+err)
        }
    }



    async insertLogEntry(logEntry_){

        try {
            const result = await this.collection.insertOne(logEntry_)
            return result;

        } catch (error) {
            console.error('error at insertLogEngtry'+error)
        }
        
    }



}


// let imageDatabase = new ImageUpload



module.exports=DataBase