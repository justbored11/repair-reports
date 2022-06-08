// import modules
const EXPRESS = require('express')
const BODYPARSER= require('body-parser')
const PORT = 8000;
const RepairEntry = require('./RepairEntry')


//instance of express
const app = EXPRESS();





app.get('/', (request, response)=>{

    response.send('<h1>repair reports server </h1>')

})


//get all reports
app.get('/api/reports')






app.listen(PORT)


let a  = new RepairEntry;

console.log(a)


