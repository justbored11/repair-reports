// packages
const router = require("express").Router();
const commentController = require("../controllers/comments.js");
const { ensureAuth } = require("../middleware/auth");

router.get("/:id", commentController.getComments);
router.post("/:id", commentController.addComments);

module.exports = router;
