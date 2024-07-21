const Member = require("../../models/Member");

const getUsersGroups = async (req, res) => {
  const userId = req.user.id;
  const usersGroups = await Member.find({ userId });
  res.send(usersGroups);
};

module.exports = { getUsersGroups };
