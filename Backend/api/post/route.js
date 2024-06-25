const express = require("express");
const router = express.Router();
const requireLogin = require("../../middleware/requireLogin"); // Import requireLogin middleware
const {
  createPost,
  getPost,
  getPostList,
  likePost,
  unlikePost,
  deletePost,
  updatePost,
  getUsersWhoLikedPost,
  getPostById,
  getPostByCommentText,
} = require("./controller");

// Apply requireLogin middleware where authentication is required
router.route("/createPost").post(requireLogin, createPost);
router.route("/getpost").get(getPost);
router.route("/search").get(getPostByCommentText);
router.route("/post/:postId").get(getPostById);
router.route("/postList/:id").get(requireLogin, getPostList);

// PUT route to update a post by ID
router.route("/update/:postId").put(requireLogin, updatePost);

router.route("/likes/:postId").get(requireLogin, getUsersWhoLikedPost);

router.route("/like").post(likePost);
router.route("/unlike").put(unlikePost);

router.route("/delete/:postId").delete(requireLogin, deletePost);

module.exports = router;
