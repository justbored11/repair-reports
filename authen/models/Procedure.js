import mongoose from 'mongoose';
//same as const mongoose = require('mongoose')

const ProcedureSchema = new mongoose.Schema({
    images:[String],
    procedureNum:{
        type:Number,
        default:0
    },
    instructions:{
        type:String,
    },
    thumbs:[String],

})

module.exports = mongoose.model('Procedure', ProcedureSchema)
