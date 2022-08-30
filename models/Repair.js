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
    procedureArr:[ProcedureSchema]

    
},
{
    collection:"repairs-reports"
}
)

// Password hash middleware.
UserSchema.pre('save', function save(next) {
  // console.log(`pre save`, this)
    const user = this
    if (!user.isModified('password')) { return next() }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err) }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { return next(err) }
        user.password = hash
        console.log(user)
        next()
      })
    })
  })
  

// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch)
    })
  }




module.exports  = mongoose.model('Repair', RepairSchema)