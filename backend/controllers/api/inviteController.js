const Invite = require("../../models/Invite");

//get specific invite
const getInvite = async (req, res) => {
  const inviteCode = req.params["inviteCode"];

  try {
    if (!inviteCode || !invitePhrase)
      throw new Error("no invite code or phrase");

    const invite = await Invite.findOne({ inviteCode, invitePhrase });

    if (!invite) {
      res.status(404).send({ inviteCode, invitePhrase });
      return;
    }

    res.send({ invite });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "failed to get invite",
      invite: { inviteCode, invitePhrase },
    });
  }
};

//get all invites user has created
const getUsersInvites = async (req, res) => {
  const userId = req.user.id;
  try {
    const invites = await Invite.find({ createdBy: userId });

    if (invites.length === 0) {
      res.status(404).send({
        message: "no invites found",
      });
      return;
    }

    res.send({ invites });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "failed to get users invites",
    });
  }
};

//create single invite

/* 
type Invite = {
inviteCode:string
groupsId:string[]
createdAt:Date
createdBy:string
}

*/
const postInvite = async (req, res) => {
  const { inviteCode, groupsId } = req.body;
  const userId = req.user.id;
  // const userId = "userid";

  if (!inviteCode) {
    res.status(404).send({ inviteCode, invitePhrase });
    return;
  }

  //todo create the invite document
  const newInvite = new Invite({
    inviteCode,
    groupsId,
    createdBy: userId,
  });

  try {
    await newInvite.save();
    res.send({ newInvite });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "failed to get invite",
      invite: { inviteCode },
    });
  }
};

//utility functions
//pass in group ids to verify user is member with valid role
//todo verify user has correct permissions to create invite
function verifyGroupMembership(groupsId = []) {
  if (groupsId.length == 0) return false;
}

module.exports = { getInvite, getUsersInvites, postInvite };
