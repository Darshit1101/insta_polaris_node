const express = require("express");
const router = express.Router();
const requireLogin = require("../../middleware/requireLogin"); // Import requireLogin middleware

const {
  commentPost,
  getCommentsForPost,
  getCommentById,
  updateCommentById,
  deleteComment,
} = require("./controller");

router.route("/comment").post(commentPost);
router.route("/comments/:postId").get(getCommentsForPost);
router.route("/comment/:commentId").get(requireLogin, getCommentById);
router.route("/comment/:commentId").put(requireLogin, updateCommentById);

router.route("/comments/:commentId").delete(requireLogin, deleteComment);

module.exports = router;
