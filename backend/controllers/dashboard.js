///dashboard controller
const User = require("../models/User");
const Repair = require("../models/Repair");
const mongoose = require("mongoose");
const { getUserRepairs } = require("./repair");

async function getDashboard(req, res) {
    // console.log(req.user)

    const userRepairs = getUserRepairs(req.user);
    const foundUser = await User.findById({ _id: req.user._id }).lean();
    const userGroups = foundUser.groups;

    // console.log("foundUser", foundUser);
    // console.log("usergroups", userGroups);

    res.render("dashboard.ejs", {
        title: "Dashboard",
        user: req.user,
        groups: userGroups,
        repairs: userRepairs,
    });
}

// async function getUserRepairs(user) {
//     const results = await Repair.find({ createdBy: user._id }).lean();
//     console.log("results ", results);
// }

module.exports = { getDashboard };
