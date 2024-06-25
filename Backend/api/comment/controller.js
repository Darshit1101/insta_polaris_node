const Comment = require("./model");
const mongoose = require("mongoose");

const commentPost = async (req, res) => {
  try {
    const { postId, userId, text } = req.body;

    const comment = new Comment({
      post: postId,
      user: userId,
      text: text,
    });

    // Save the comment to the database
    await comment.save();

    // res.status(201).json({ message: "Comment added successfully", comment });
    res
      .status(201)
      .json({ message: "Comment added successfully", text: comment.text });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId })
      .populate("user", "name Photo")
      .select("user text");

    const commentCount = await Comment.aggregate([
      { $match: { post: new mongoose.Types.ObjectId(postId) } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    if (comments.length === 0) {
      return res.status(200).json({ message: "No comments available" });
    }

    res.status(200).json({ comments, commentCount: commentCount[0].count });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Find the comment by its ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ comment });
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text field is required" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text: text },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res
      .status(200)
      .json({ message: "Comment updated successfully", updatedComment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params; // Get comment ID from request parameters

    // Find the comment by its ID and delete it
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    console.log(deletedComment);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  commentPost,
  getCommentsForPost,
  getCommentById,
  updateCommentById,
  deleteComment,
};
