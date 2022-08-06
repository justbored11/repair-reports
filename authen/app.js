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


const expTimeTokens = '2h';




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
            return res.status(400).send("User creation failed")
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
        role:'basic'
       })

       console.log(`user`,user)
   
       const credentials = {
            user:user.user_name, //username from database entry
            role:user.role
        }

        console.log(`creds`,credentials)
       //create token
       const accessToken = jwt.sign({user:user_name,role:user.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:expTimeTokens})
       
       console.log(`token`,accessToken)
       res.json({accessToken: accessToken});
    } 
    catch (error) {
        console.log(error)
    }

});





    
// Login
app.post("/login", async(req, res) => {

    try {
            //user input from request
        const {user_name, password}= req.body;

        //validate input must contain username and password
        //if not end request
        if( !(user_name && password ) ){
            res.status(4000).send(`all input is required`)
        }


        //look for an already existing user in database
        const user = await User.findOne({user_name});




        //if user was found compare hash
        if(user && ( await bcrypt.compare(password, user.password) ) ){
        

            //token will contain username and role
            const credentials = {
                user:user.user_name, //username from database entry
                role:user.role
            }


        //create token {data to encrypt, key to use to encrypt, {OPTIONS expiration} }
        const accessToken = jwt.sign(credentials, process.env.ACCESS_TOKEN_SECRET, {expiresIn:expTimeTokens});
        console.log(`token sent `)

        res.status(200).json({accessToken: accessToken});

        }else{
            //else user does not exist
            res.status(400).json({message:"not authorized"})
        }
    } catch (error) {
        console.error(`error login`, error)    
    }
    



});



app.listen(8000)
module.exports = app;