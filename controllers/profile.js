module.exports.getProfile = async (req, res) => {
  res.render("userprofile.ejs", {
    title: "User Profile",
    user: req.user,
  });
};
