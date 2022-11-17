const Groups = require("../models/Group");
const Repairs = require("../models/Repair");

//get one group details for user
module.exports.getGroupItems = async (req, res) => {
  const groupName = req.params.name;
  const foundGroup = await Groups.find({ name: groupName }).lean();
  const repairsInGroup = await Repairs.find({
    createdBy: req.user.username,
    group: groupName,
  }).lean();

  console.log(repairsInGroup);
  res.send(repairsInGroup);
};
