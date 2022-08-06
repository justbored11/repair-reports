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
        
       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user))



    } catch (error) {
        
    }
}

