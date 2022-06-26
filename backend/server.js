// import modules
const DataBase = require('./database.js');
const RepairEntry = require('./repairLogEntry');
const RepairStep = require('./RepairStep');

const express = require('express');

require('dotenv').config(); // to use with enviroment variables initializes enviroment vars
const cors = require('cors');
const fileUpload = require('express-fileupload');

let testobj={
    
    "tags": ['search this'],
    "title": "cummins no 100v",
    "board": "model 4473",
    "engine": "cummins engine model",
    "procedure": [
    {
    "images": [
    "wwww url",
    "wwww url2"
    ],
    "description": "this is how to fix it step 1"
    },
    {
    "images": [
    "wwww url",
    "wwww url2"
    ],
    "description": "this is how to fix it step 2"
    }
    ]
    }



const app = express();
const PORT = 8000;


app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})); //get body data

app.set('view engine', 'ejs'); // for template
app.use(express.static('public')) //use templates from folder




let dataBase = new DataBase(process.env.connectStr_,'Cata','repair-reports' )
dataBase.connect()



app.get('/', async (request, response)=>{

  
    response.render('index.ejs');

    
    

})



 app.post('/',async (request, response)=>{
    console.log(`post at /`)
   
    // let result = await dataBase.getAll();
    // console.log(request.files);

    
    

    response.send('read')

})





app.listen(process.env.PORT || PORT,()=>{
    console.log(`server runing on port ${PORT}`)
})




