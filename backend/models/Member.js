const mongoose = require("mongoose");

//Member collection will track group to user relationships,
//user can have multiple member entries detailing their role in a group

//user groups schema
//user is a member of a group
const MemberSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    // 1 - read , 2 - read write , 3 - read, write, soft delete
    type: [String],
    default: ["read"],
  },
  groupId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Member", MemberSchema);
