const jwt = require('jsonwebtoken')
require('dotenv').config()





function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];

    //if authheader exists then split it and get second element
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){//no token
        return res.status(401).json({message:"token required"})
    }

    try {
        
        //once verify is done decoding it will callback error or the object that was encoded
        // which was credentials object we did during login in this case
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, credentials)=>{
        if(error)return res.sendStatus(403) //if error 'failed to decode' return

        //we did not have any error so set the credentials to the request  and call next 
        //middleware
        req.credentials = credentials;

        next();
       })



    } catch (error) {
        
    }
}

module.exports = authenticateToken