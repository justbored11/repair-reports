///dashboard controller
const User = require("../../models/User");
const Repair = require("../../models/Repair");
const mongoose = require("mongoose");
const { getUserRepairs } = require("../repair");

async function getDashboard(req, res) {
    const userRepairs = await getUserRepairs(req.user);
    const foundUser = await User.findById({ _id: req.user._id }).lean();
    const userGroups = foundUser.groups;

    console.log(userRepairs);
    res.render("dashboard.ejs", {
        title: "Dashboard",
        user: req.user,
        groups: userGroups,
        repairs: userRepairs,
    });
}

module.exports = { getDashboard };
