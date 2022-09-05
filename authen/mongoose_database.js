const mongoose=  require('mongoose');
require("dotenv").config();
const databaseUri = process.env.connectStrU_;



exports.connect =async ()=>{

try {
    const result = await mongoose.connect(databaseUri)

    console.log(`database connected auth`)

} catch (error) {
    console.log('auth database connection failed');
    console.error(error);
    process.exit(1);
}
    


    
}