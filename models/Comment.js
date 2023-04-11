const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    repairid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    reply: {
        default: null,
        type: mongoose.ObjectId,
        ref: "comment",
    },
    createdate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("comment", commentSchema);
