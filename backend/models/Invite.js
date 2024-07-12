const mongoose = require("mongoose");

const GroupData = new mongoose.Schema({ id: String, name: String });

const InviteSchema = new mongoose.Schema({
  inviteCode: {
    type: String,
    required: true,
  },
  //security for specific invite optional
  invitePassword: {
    type: String,
  },
  groups: {
    type: [GroupData],
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
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Invite", InviteSchema);
