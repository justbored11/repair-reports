// import packages
const express = require('express');
require('dotenv').config(); // to use with enviroment variables initializes enviroment vars
const cors = require('cors');

// import modules

// const RepairEntry = require('./modules/repairLogEntry');
// const RepairStep = require('./modules/RepairStep');
// const signature = require('./modules/signuploadform');





// routes files
const repairInfoRoutes = require('./routes/repairInfoRoutes')
const signformRoutes = require('./routes/signformRoutes')
const repairFormRoutes = require('./routes/repairformRoutes')
const repairRoutes = require('./routes/repairRoutes')


const app = express();
const PORT = 8000;


//midleware
//redirect to HTTPS
// app.use((req, res, next) => {
//     if (process.env.NODE_ENV !== 'development') {
//         if (req.headers['x-forwarded-proto'] !== 'https')
//             // the statement for performing our redirection
//             return res.redirect('https://' + req.headers.host + req.url);
//         else
//             return next();
//     } else
//         return next();
// });

app.use(require('./midware/httpsRedirect').httpsRedirect)


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); //get body data

app.set('view engine', 'ejs'); // for template
app.use(express.static('public')) //use templates from folder

//database collection connection
const dataBase = require('./modules/database.js');




// =============================================================
// ROUTES
app.use(repairInfoRoutes)
app.use(repairRoutes)
app.use(repairFormRoutes)
app.use(signformRoutes)


//root route gets latest repairs
app.get('/', async (request, response)=>{
    const results  = await dataBase.latest()
    console.log(results)
    response.render('search.ejs',{repairs:results});

})


//ecm logs page
app.get('/ecm-logs', async (request, response)=>{

    response.render('ecm-logs.ejs');
})


app.listen(process.env.PORT || PORT,()=>{
    console.log(`server runing on port ${PORT}`)
})




