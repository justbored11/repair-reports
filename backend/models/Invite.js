const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
  inviteCode: {
    type: String,
    required: true,
  },
  //security for specific invite optional
  invitePassword: {
    type: String,
  },
  groupsId: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Invite", InviteSchema);
