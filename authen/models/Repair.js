const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
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
    procedureArr:[]

    
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




module.exports  = mongoose.model('User', UserSchema)