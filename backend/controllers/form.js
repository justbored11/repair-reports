const signature = require("../modules/signuploadform");
const router = require("express").Router();
const User = require("../models/User");
const mongoose = require("mongoose");

const getForm = async (req, res) => {
  const foundUser = await User.findById(req.user._id);
  console.log("found user from database", foundUser);

  if (!foundUser.groups) {
    //correction if user was an old version without groups
    foundUser.groups = [foundUser.username];
    await foundUser.save();
  }
  const userGroups = [...foundUser.groups];

  res.render("repairform.ejs", {
    title: "Repair Submission",
    user: req.user,
    groups: userGroups,
  });
};

const signForm = async (req, res) => {
  const userId = req.user._id;

  //requested folder user wants to upload to
  //todo folder validation. Does user have auth to save in this folder maybe its a company folder
  const desiredFolder = `${req.query?.folder ? req.query.folder : "no_folder"}`;

  //folder to organize this image in
  //composed of folder requested by user and the userId
  const imageFolder = `${desiredFolder}/${userId}`;

  const sig = signature.signuploadform(imageFolder);

  console.log(`signform signature received `, sig);

  try {
    res.status(200).json({
      signature: sig.signature,
      timestamp: sig.timestamp,
      cloudname: process.env.cloud_name,
      apikey: process.env.cloud_key,
      folder: imageFolder,
    });
  } catch (error) {}
};

module.exports = { signForm, getForm };
