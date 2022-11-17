///dashboard controller
const User = require("../models/User");

module.exports.getDashboard = async (req, res) => {
  // console.log(req.user)
  const foundUser = await User.findById({ _id: req.user._id }).lean();
  const userGroups = foundUser.groups;

  console.log("foundUser", foundUser);
  console.log("usergroups", userGroups);

  res.render("dashboard.ejs", {
    title: "Dashboard",
    user: req.user,
    groups: userGroups,
  });
};
