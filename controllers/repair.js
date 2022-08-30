const dataBase = require('../modules/database.js'); //database interface
const mongoose = require('mongoose');
const Repair = require('../models/Repair')


//add repair to database
module.exports.addRepair = async (req, res)=>{
        try {
            let entry = (request.body)
            console.log(`post at /repairform`,entry)

            const result = await dataBase.insertLogEntry(entry)
            console.log(`done uploading at server`)
            response.send(result)

        } catch (error) {
            response.status(400).json({message:'failed to save repair', "error":error})
        }
    }

//retrieve repairs matching query
module.exports.searchRepairs = async (req, res)=>{
    try {

        console.log(`repairsController.searchRepairs`,req.query)
        const searchStr = req.query.searchPhrase
        // const results = await dataBase.search(searchStr);
        const results = await Repair.aggregate(
            [
                { 
                  $search: {
                    index: 'repairs_search',
                    text: {
                      query: searchStr,
                      path:["title","searchtags","procedureArr"],
                      fuzzy:{maxEdits:2,prefixLength:2}
                    }
                  }
                }
              ]);



        res.render('search.ejs',{repairs:results});

    } catch (error) {
        res.status(400).json({message:'failed to get repairs', "error":error.message})
    }
}

//get a number of newest repairs
module.exports.getNewestRepairs = async (req, res)=>{
    try {
        console.log(`controller repair.getNewestRepairs`)
        console.log( `number of repairs requested`,req.params.num)
        const numRepairs =   req.params.num > 0 ? +req.params.num : 1;

        // const results = await dataBase.latest(numRepairs);
        const results = await Repair.find().sort({_id:-1}).limit(numRepairs);
        console.log( `number of repairs returned`,results.length)
        // console.log(results)
        res.status(200).json({repairs:results})
    
    } catch (error) {
        res.status(500).json({message:'failed get repairs', "error":error.message})
    }
}