const Repair = require("../../models/Repair");

const getRepairById = async (req, res) => {
  // get paremeter from url
  const repairId = req.params.id;
  try {
    const repairObj = await Repair.findOne({ _id: repairId }).lean();
    res.status(200).json(repairObj);
  } catch (err) {
    res.status(400).json({
      message: `error getting repair by ID: ${repairId}`,
      error: err,
    });
  }
};

const addRepair = async (req, res) => {
  const { title, boardType, engineMake, procedureArr, searchTags, group } =
    req.body.repairData;

  const createdBy = req.user._id;
  const groupId = group; //TODO check group allowed or not

  try {
    const entry = {
      procedureArr,
      searchTags,
      title,
      boardType,
      engineMake,
      createdBy,
      removed: false,
      group: groupId,
    };

    const result = await Repair.create(entry);
    const repairId = result._id; //add link to repair

    res.send({
      message: "repair added successfully",
      result: entry,
      repairId,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "failed to save repair", error: error.message });
  }
};

//get a number of newest repairs
const getNewestRepairs = async (req, res) => {
  try {
    // console.log(`controller repair.getNewestRepairs`);
    // console.log(`number of repairs requested`, req.params.num);
    const numRepairs = req.query.num ? req.query.num : 8;

    // console.log("req.params", req.query.num);
    //retrieve certain number of repairs that have not been removed
    const results = await Repair.find({ removed: { $ne: true } })
      .sort({ _id: -1 })
      .limit(numRepairs);
    console.log(`number of repairs returned`, results.length);

    res.json({
      repairs: results,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed get repairs", error: error.message });
  }
};

const updateRepair = async (req, res) => {
  let updateResponse;
  try {
    const updatedDoc = req.body.repairData;
    const filter = { _id: updatedDoc._id };
    updatedDoc.boardType = updatedDoc.boardType.toUpperCase();

    console.log("repair data", updatedDoc);
    console.log("filter", filter);

    try {
      updateResponse = await Repair.findOneAndUpdate(filter, updatedDoc, {
        returnOriginal: false,
      });
    } catch (err) {
      res.status(400).json({
        message: `ID: ${updatedDoc._id}  NOT FOUND for edit`,
        error: err?.message,
      });
      return;
    }

    res
      .status(200)
      .json({ message: "repair update", status: "success", updatedDoc });
  } catch (error) {
    res.status(400).json({
      message: `failed to update document: ${updatedDoc._id}`,
      error: error.message,
    });
  }
};

//soft delete post
const deletePost = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const report = await Repair.findById({ _id: req.params.id });

    if (user.role === "admin" || report.createdBy === user.username) {
      report.removed = true;
      await report.save();
      // res.send({message:'user is admin or creator',rep:report})

      res.json({ removed: report });
    } else {
      console.log("user not allowed");
      throw new Error(`user: ${user.username} not allowed`);
    }
  } catch (error) {
    res.send({
      err: "delete error implemented ID: " + req.params.id,
      message: error.message,
    });
  }
};

//retrieve repairs matching query
const searchRepairs = async (req, res) => {
  try {
    console.log(`repairsController.searchRepairs`, req.body);
    const searchStr = req.body.searchPhrase;
    const limit = Number(req.body.limit) || 10;
    const results = await Repair.aggregate([
      {
        $search: {
          index: "repairs_search",
          text: {
            query: searchStr,
            //   path:["title","searchtags","procedureArr","instructions"],
            path: { wildcard: "*" },
            fuzzy: { maxEdits: 2, prefixLength: 3 },
          },
        },
      },
    ]).limit(limit);
    res.json({ repairs: results });
  } catch (error) {
    res
      .status(400)
      .json({ message: "failed to get repairs", error: error.message });
  }
};

//!permanent delete
//const deletePost = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.user.username });
//     const report = await Repair.findById({ _id: req.params.id });

//     // if(user.role === 'admin' || report.createdBy === user.username ){
//     //     report.removed = true;
//     //     await report.save()
//     //     res.redirect('/repair/')
//     // }else{
//     //     console.log('user not allowed')
//     //     throw new Error(`user: ${user.username} not allowed`)
//     // }
//   } catch (error) {
//     res.send({
//       err: "delete error implemented ID: " + req.params.id,
//       message: error.message,
//     });
//   }
// };

module.exports = { getRepairById, addRepair, getNewestRepairs, updateRepair };
