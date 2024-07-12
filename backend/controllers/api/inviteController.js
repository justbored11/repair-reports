const Invite = require("../../models/Invite");
const Member = require("../../models/Member");
const uuidv4 = require("uuid").v4;

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
  const { password, groups } = req.body;
  const userId = req.user.id;
  // const userId = "userid";

  //no groups provided to create invite
  if (!groups) {
    res.status(404).send({ groups });
    return;
  }

  // const allowedGroups: [{ id: string, name: string }] = [];
  let allowedGroups = [];
  try {
    allowedGroups = await verifyGroupMembership(groups, userId);

    //not allowed to invite in any group
    if (allowedGroups.length === 0) throw Error("User Not Allowed");
  } catch (error) {
    console.error("error.message", error.message);

    res.status(401).send({
      message: "failed to create invite",
      groups,
    });
    return;
  }

  //todo create the invite document with random uuid with maybe 6 chars
  //must be unique invite code
  const newInvite = new Invite({
    inviteCode: uuidv4().slice(0, 6),
    groups: allowedGroups,
    createdBy: userId,
  });

  try {
    await newInvite.save();
    res.send({ newInvite });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "failed to create invite",
      groups,
    });
  }
};

//utility functions
//pass in group ids to verify user is member with valid role
//todo verify user has correct permissions to create invite
//TODO create an allowed group
async function verifyGroupMembership(groupIds = [], userId) {
  if (groupIds.length == 0) return [];

  const allowed = await Member.find({
    userId,
    groupId: { $in: groupIds },
  });

  console.log("allowed", allowed);

  return allowed.map((g) => {
    return { id: g.groupId, name: g.groupName };
  });
}

module.exports = { getInvite, getUsersInvites, postInvite };
