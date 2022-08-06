require("dotenv").config();

//modules
const express = require("express");
const app = express();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')

//database management
require("./mongoose_database").connect();

//models
const User = require('./models/user');

//middleware
app.use(express.json());





// ======================================
//ROUTES
// ======================================


//register
// =================================
app.post("/register", async (req, res) => {

    try {
        console.log(`register route`)
        

        const {user_name,first_name, last_name, email, password}= req.body;

        console.log(`body`,req.body)
        //validate input
        if( !(first_name && last_name && password && user_name ) ){
            console.log(`missing info`)
            res.status(400).json({message:`all input is required`})
        }

        //look for an already existing user
        const entry = await User.findOne({user_name});
        // console.log(`entry`,entry)

        if(entry){
            return res.status(400).send("User Already in use. Please Login")
        }

       
        //hash password 
       const salt = await bcrypt.genSalt(10);
       const passHash = await bcrypt.hash(password, salt);
       

       //create user in database
       const user = await User.create({
        user_name,
        first_name,
        last_name,
        email,
        password: passHash,
       })

       console.log(`user`,user)
   


       //create token
    //    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
       

    //    res.json({accessToken: accessToken});
       res.json({"end":"end"})
    } 
    catch (error) {
        console.log(error)
    }

});





    
// Login
app.post("/login", async(req, res) => {
// our login logic goes here

    const {user_name, password}= req.body;

    const passHash = await bcrypt.hash(password,10)

    //validate input
    if( !(user_name && password ) ){
        res.status(4000).send(`all input is required`)
    }

    //look for an already existing user
    const user = await User.findOne({user_name});




    //if user was found compare database password with local hash
    if(user.password === passHash){
       
        const credentials = {
            user:user_name,
            role:user.role
        }


        // jwt.sign({
        //     data: 'foobar'
        //   }, 'secret', { expiresIn: '1h' });

       //create token {data to encrypt, key to use to encrypt, {OPTIONS expiration} }
       const accessToken = jwt.sign(credentials, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'2h'});
    
       res.json({accessToken: accessToken});

    }else{
        //else user does not exist
        res.status(400).json({message:" not authorized"})
    }



});



app.listen(8000)
module.exports = app;