const Router = require("express").Router();
const authController = require("../controllers/auth");

// @route /login/*
Router.get("/", authController.getLogin);
Router.post("/", authController.postLogin);

Router.get("/signup", authController.getSignup);
Router.post("/signup", authController.postSignup);

module.exports = Router;
