const mongoose = require('mongoose')


//user database schema defined
const UserSchema = new mongoose.Schema({
    user_name:{
        type:String,
        unique:true,
        required:true,
        lowercase:true, 
    },
    first_name:{
        type:String,
        lowercase:true,
        required:true
    },
    last_name: {
        type:String,
        lowercase:true,
        required:true
    },
    email:{
        type:String,
        lowercase:true, 
        default:'noEmail@'
    },
    password: {
        type:String, 
        minlength:6,
        required:true
    },

    role:{type:String,
        default:'basic',
        required:true,
    },
    date_created:{
        type:Date,
         default:Date.now(),
          immutable:true
        }
},
{
    collection:"users"
});


module.exports= mongoose.model('User',UserSchema);




