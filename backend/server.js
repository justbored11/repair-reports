// import modules
const EXPRESS = require('express')
const BODYPARSER= require('body-parser')
const PORT = 8000;

//instance of express
const app = EXPRESS();



app.get('/', (request, response)=>{

    response.send('<h1>hello </h1>')

})


app.listen(PORT)





