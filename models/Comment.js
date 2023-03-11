import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    postid: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdat: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Comment", commentSchema);
