const mongoose = require("mongoose");

//user groups schema
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
  partsManufacturer: {
    // to organize repairs by subgroups to choose from when submitting repairs
    type: [String],
    default: ["public"],
  },
});

module.exports = mongoose.model("Group", GroupSchema);
