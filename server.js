// import packages
const express = require('express');
require('dotenv').config(); // to use with enviroment variables initializes enviroment vars
const cors = require('cors');
const mongooseDb= require('./config/dbM')





// routes files
const repairInfoRoutes = require('./routes/repairInfoRoutes')
const signformRoutes = require('./routes/signformRoutes')
const repairFormRoutes = require('./routes/repairformRoutes')
const repairRoutes = require('./routes/repairRoutes')


const app = express();
const PORT = 8000;

app.set('view engine', 'ejs'); 

app.use(require('./midware/httpsRedirect').httpsRedirect)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); //get body data



app.use(express.static('public')) 

//database collection connection
const dataBase = require('./modules/database.js');
mongooseDb()



// =============================================================
// ROUTES
// todo change routes to app.use ('/repair',repairRoutes) format
app.use(repairRoutes) // @/repair
app.use(repairInfoRoutes)
app.use(repairFormRoutes)
app.use(signformRoutes)


//root route gets latest repairs
app.get('/', async (request, response)=>{
    const results  = await dataBase.latest()

    response.render('index.ejs',{repairs:results});

})


//ecm logs page
// app.get('/ecm-logs', async (request, response)=>{

//     response.render('ecm-logs.ejs');
// })


app.listen(process.env.PORT || PORT,()=>{
    console.log(`server runing on port ${PORT}`)
})




