const User =  require('../model/user')
// const express = require('express')
// const app = express()
// app.use(express.json())

exports.register = async (req, res, next)=>{
    //destructuring from the body
    const {username, password}=req.body;

    if(password.length < 6){
        return res.status(400).json({message:'password less than 6 characters'})
    }
}