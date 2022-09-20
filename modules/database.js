const { json } = require('express');
const { ObjectId } = require('mongodb');
const RepairEntry = require('./repairLogEntry');

require('dotenv').config(); // to use with enviroment variables
const MongoClient = require('mongodb').MongoClient

//mongo config
class DataBase {
     constructor(connectStr_='empty string', db_='empty database select', collection_='empty collection select'){
        this.connectStr = connectStr_
        this.dbName = db_
        this.colName=collection_
        this.client
        this.collection = 'empty'
        this.db = 'empty'

        this.connect()
    }



//search documents
async search(term_='celect engine', limit=6, matchParams={}){


      const query3 = [
        { 
          $search: {
            index: 'repairs_search',
            text: {
              query: term_,
              path:["title","searchtags","procedureArr"],
              fuzzy:{maxEdits:2,prefixLength:2}
            }
          }
        }
      ]

      //will include filters using match mongo stage
    //   const query4 = [
    //     { $match:matchParams,
    //       $search: {
    //         index: 'repairs_search',
    //         text: {
    //           query: term_,
    //           path:["title","searchtags","procedureArr"],
    //           fuzzy:{maxEdits:2,prefixLength:2}
    //         }
    //       }
    //     }
    //   ]


    try{
        const results = await this.collection.aggregate(query3).limit(limit).toArray();
    
        return results;
    }catch(error){
        console.error(`error at database search`, error)
        return error
    }
  

}





async latest(limitNum=6){
    // const results = await this.collection.find({$query: {}, $orderby: {$natural : -1}}).limit(6)
    const results = await this.collection.find().sort({_id:-1}).limit(limitNum).toArray();
    
    return results;

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


//get single specified document from database by ID
async findRepair(repairId){
    const id = new ObjectId(repairId)
    let repair = await this.collection.findOne({_id:id})

    return repair
}


 
    
//test connection with settings
   async connect(){
        try{  
            const client = await MongoClient.connect(this.connectStr)

            this.db = await client.db(this.dbName)
            this.collection = await this.db.collection(this.colName)
            console.log(`connected to database ${this.dbName}`)  
 
            return {status:"ok"}
        }
        catch(err){
            console.error('dataBase.connect error:'+ err);
            console.error(JSON.stringify(this))
        }
    }


    
    async insertLogEntry(logEntry_){
        try {
            console.log(`inserting`,logEntry_)
            const result = await this.collection.insertOne(logEntry_)
            return result;

        } catch (error) {
            console.error('error at insertLogEngtry'+ error)
            return error;
        }
    }
}


//instance of database
const dataBase = new DataBase(process.env.connect_string,'Cata','repair-reports' )
// dataBase.connect() //moved to constructor

module.exports=dataBase


