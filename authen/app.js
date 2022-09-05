require("dotenv").config();

//modules
const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authenticate = require('./middleware/auth')

//database management
require("./mongoose_database").connect();

//models
const User = require('./models/user');

//middleware
app.use(cookieParser);
app.use(express.json());



const expTimeTokens =  30 * 60; //'.5h'; //in seconds
const tokenSecret = process.env.ACCESS_TOKEN_SECRET; //key to hash tokens


// process
// at login or register a token will generate and be hashed
// token will be sent back to client
// client will use authorization headers to provide token
// server wil use middleware to validate token sent in authorization header
// if valid pass to reqested route 
// else redirect to login / register for token



//







// ======================================
//ROUTES
// ======================================


//root route '/' will use middleware authenticate then respond with credentials
app.get('/',authenticate, (req,res)=>{

   
    res.status(200).json({message:" req.credentials"})
})



//register
// =================================
app.post("/users/register", async (req, res) => {


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
       const newUser = await User.create({
        user_name,
        first_name,
        last_name,
        email,
        password: passHash,
        role:'basic'
       })
   
       const credentials = {
            userId:newUser._id,
            user:newUser.user_name, //username from database entry
            role:newUser.role
        }

        console.log(`creds`,credentials)

       //create token
       const accessToken = jwt.sign(credentials, tokenSecret, {expiresIn:expTimeTokens})
       
       console.log(`token`,accessToken)

       //maxAge in millis cookies bad idea to use for authen gets sent with all requests
    //    res.cookie('jwt',accessToken,{
    //     httpOnly:true,
    //     maxAge:expTimeTokens * 1000,
    //    })

       res.status(200).json({
        // accessToken: accessToken
        message:"success registering",
        user:user._id,
       });
    } 
    catch (error) {
        console.log(error)
        res.status(401).json({message:"registration failed", error:error.message})

    }

});





    
// Login
app.post("/users/login", async(req, res) => {

    try {
            //user input from request
        const {user_name, password}= req.body;

        //validate input must contain username and password
        //if not end request
        if( !(user_name && password ) ){
            res.status(400).send(`all input is required`)
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
        const accessToken = jwt.sign(credentials, tokenSecret, {expiresIn:expTimeTokens});
        console.log(`token sent `)

        //maxAge in millis
        // res.cookie('jwt',accessToken,{
        //     httpOnly:true,
        //     maxAge:expTimeTokens * 1000,
        // })

        
        res.status(200).json({
            // accessToken: accessToken
            message:"success login",
            user:user._id,
        });

        }else{
            //else user does not exist
            res.status(400).json({message:"not authorized"})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"login failed", error:error.message})  
    
    }
    



});



app.listen(8000)
module.exports = app;