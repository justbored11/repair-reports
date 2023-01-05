///dashboard controller
const User = require("../models/User");
const Repair = require("../models/Repair");
const mongoose = require("mongoose");

async function getDashboard(req, res) {
    // console.log(req.user)

    getUserRepairs(req.user);
    const foundUser = await User.findById({ _id: req.user._id }).lean();
    const userGroups = foundUser.groups;

    // console.log("foundUser", foundUser);
    // console.log("usergroups", userGroups);

    res.render("dashboard.ejs", {
        title: "Dashboard",
        user: req.user,
        groups: userGroups,
    });
}

async function getUserRepairs(user) {
    const results = await Repair.find({ createdBy: user._id }).lean();
    console.log("results ", results);
}

module.exports = { getDashboard };
