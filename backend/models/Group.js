const mongoose = require("mongoose");

//user groups schema
//user is a member of a group
const MemberSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    // 1 - read , 2 - read write , 3 - read, write, soft delete
    type: String,
    default: "1",
  },
});

//parent schema
//user can be part of one or many groups to view repairs from those groups
const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [MemberSchema],
  },
  createdBy: {
    type: String,
    immutable: true,
  },
  subGroup: {
    // to organize repairs by subgroups to choose from when submitting repairs
    //will use it as a set
    type: [String],
    default: ["public"],
  },
});

module.exports = mongoose.model("Group", GroupSchema);
