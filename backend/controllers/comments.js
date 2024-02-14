const Comment = require("../models/Comment.js");

module.exports = {
    getComments: async (req, res) => {
        const repairid = req.params.id;

        const comments = await Comment.find({ repairid });
        res.status(200).json({
            message: "get comments success",
            comments,
        });
    },
    addComments: async (req, res) => {
        //get user ID who created comment
        //get repair id comment belongs to
        //get comment body
        const { comment, title } = req.body;
        const repairId = req.params.id;
        const user = req.user.id;
        const username = req.user.username;
        console.log("user from request", req.user);
        try {
            await Comment.create({
                userid: user,
                repairid: repairId,
                title: title,
                content: comment,
                username: username,
            });
        } catch (err) {
            res.status(400).json({
                message: "failed to save comment",
                error: err.message,
            });
        }
        // console.log("request is ", req.body);
        res.redirect(302, `/repair/${repairId}`);
    },
};
