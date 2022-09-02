
const mongoose = require('mongoose');
const Repair = require('../models/Repair')

module.exports.getIndex = async (req, res)=>{
    try {
            console.log(`index controller`)
            console.log( `number of repairs requested`,req.params.num)
            const numRepairs =   req.params.num > 0 ? +req.params.num : 7;
    
            // const results = await dataBase.latest(numRepairs);
            const results = await Repair.find().sort({_id:-1}).limit(numRepairs);
            console.log( `number of repairs returned`,results.length)
            console.log(results)
            // console.log(results)
            res.render('index.ejs',{repairs:results});
        
    } catch (error) {
        res.status(400).json({message:'failed toget index', "error":error.message})
    }
}
