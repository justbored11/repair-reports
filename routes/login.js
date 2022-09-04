const Router = require('express').Router()
const authController = require('../controllers/auth')


Router.get('/', authController.getLogin)

Router.get('/login', authController.getLogin) //todo 
Router.post('/login', authController.postLogin) 

Router.get('/signup',authController.getSignup)
Router.post('/signup',authController.postSignup)

Router.get('/logout',authController.logout)
module.exports = Router