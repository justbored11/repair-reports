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
    group:{
        type:String,
        default:'public'
    },
    createdBy:{
        type:String,
        default:'public'
    },
    removed:{
        type:Boolean,
        default:false,
    },
    // members:{
    //     type:[memberSchema]
    // }


    
},
{
    collection:"repair-reports"
}
)




module.exports  = mongoose.model('Repair', RepairSchema)