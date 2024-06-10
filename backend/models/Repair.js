const mongoose = require("mongoose");
const uuid = require("uuid");
//version: 2 contains imageObjs:[imageObj] for images on procedures
const imageObj = new mongoose.Schema({
  _id: { type: String, default: uuid.v4() },
  imageUrl: { type: String, default: "" },
  imageThumb: { type: String, default: "" },
  caption: { type: String, default: "" },
  imageId: {
    type: String,
    default: "",
  },
  folder: {
    type: String,
    default: "test",
  },
});

//subdocument of RepairSchema
const ProcedureSchema = new mongoose.Schema({
  _id: String,
  images: [String],
  imageObjs: [imageObj], //version 2 to be used instead of seperate images[],thumbs[],imagesIdArr[]
  procedureNum: {
    type: Number,
    default: 0,
  },
  instructions: {
    type: String,
  },
  thumbs: [String],
  imagesIdArr: [String],
});

// const memberSchema = new mongoose.Schema({
//    user:{
//     type:String,
//    },
//    role:{
//     type:String,
//     default:'1'
//    }

//   })

//parent schema
//version 3 has searchTags:string[] to allow for sorting
const RepairSchema = new mongoose.Schema(
  {
    version: {
      type: String,
      required: true,
      default: "3",
    },
    title: {
      type: String,
      required: true,
    },
    boardType: {
      type: String,
      required: true,
    },
    searchTags: {
      type: [String],
      default: [],
    },
    engineMake: {
      type: String,
      required: true,
    },
    procedureArr: {
      type: [ProcedureSchema],
    },
    group: {
      //client sent group repair belongs to
      type: String,
      default: "public",
    },
    visibility: {
      //client sent allows to be seen to public feed
      default: "public",
      type: String,
    },
    createdBy: {
      //asigned serverside
      type: String,
      default: "public",
    },
    removed: {
      //soft delete
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "repair-reports",
  }
);

module.exports = mongoose.model("Repair", RepairSchema);
