const mongoose = require('mongoose')

//subdocument of RepairSchema
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
    imagesIdArr: [String]

})

// const memberSchema = new mongoose.Schema({
//    user:{
//     type:String,
//    },
//    role:{
//     type:String,
//     default:'1'
//    }
  
//   })

//parent schema
const RepairSchema = new mongoose.Schema({
   title:{
        type:String,
        required:true,
    },
   boardType:{
        type:String,
        required:true,
    },
   engineMake:{
        type:String,
        required:true,
    },
    procedureArr:{
        type:[ProcedureSchema]
    },
    group:{//client sent group repair belongs to
        type:String,
        default:'public'
    },
    visibility:{//client sent allows to be seen to public feed
        default:'public',
        type:String,
    },
    createdBy:{//asigned serverside
        type:String,
        default:'public'
    },
    removed:{//soft delete
        type:Boolean,
        default:false,
    },
},
{
    collection:"repair-reports"
}
)

module.exports  = mongoose.model('Repair', RepairSchema)