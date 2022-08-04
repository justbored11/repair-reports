const mongoose=  require('mongoose');

const databaseUri = process.env.databaseUri;



exports.connect =async ()=>{

try {
    const result = await mongoose.connect(databaseUri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false,
    })

    console.log(`database connected auth`)

} catch (error) {
    console.log('auth database connection failed');
    console.error(error);
    process.exit(1);
}
    


    
}