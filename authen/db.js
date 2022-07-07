const Mongoose = require("mongoose");
const RemoteDB = 'stringconnection';

const connectDB =async ()=>{
   await Mongoose.connect(RemoteDB)
    .then(client=>{
        console.log("connected to database")
    })
}

module.exports = connectDB