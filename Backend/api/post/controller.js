const Post = require("./model");
const mongoose = require("mongoose");

const createPost = async (req, res) => {
  const { body, pic, postedBy } = req.body;

  try {
    const newPost = new Post({
      body,
      Photo: pic,
      postedBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getPost = async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query; // Default to page 1 and limit 2

    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "postedBy",
        },
      },
      { $unwind: "$postedBy" },
      {
        $addFields: {
          likeCount: { $size: "$likes" },
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },
      { $addFields: { commentCount: { $size: "$comments" } } },
      { $unset: "comments" },
      {
        $lookup: {
          from: "users",
          localField: "likes",
          foreignField: "_id",
          as: "likes",
        },
      },
      {
        $project: {
          body: 1,
          Photo: 1,
          likeCount: 1,
          commentCount: 1,
          postedBy: { _id: 1, name: 1, Photo: 1 },
          likes: "$likes._id",
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: (page - 1) * limit, // Skip documents for pagination
      },
      {
        $limit: parseInt(limit, 10), // Limit the number of documents returned
      },
    ]);

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
};

const getPostByCommentText = async (req, res) => {
  try {
    const { searchKey } = req.query;

    if (!searchKey) {
      return res.status(400).json({ message: "Search key is required" });
    }

    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$post", "$$postId"] },
                    {
                      $regexMatch: {
                        input: "$text",
                        regex: searchKey,
                        options: "i", //A and a banne search karshe
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: "matchingComments",
        },
      },
      {
        $match: {
          "matchingComments.0": { $exists: true },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "postedBy",
        },
      },
      { $unwind: "$postedBy" },
      {
        $addFields: {
          likeCount: { $size: "$likes" },
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },
      { $addFields: { commentCount: { $size: "$comments" } } },
      { $unset: "comments" },
      {
        $lookup: {
          from: "users",
          localField: "likes",
          foreignField: "_id",
          as: "likes",
        },
      },
      {
        $project: {
          body: 1,
          Photo: 1,
          likeCount: 1,
          commentCount: 1,
          postedBy: { _id: 1, name: 1, Photo: 1 },
          likes: "$likes._id",
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
};

const getPostList = async (req, res) => {
  const userId = req.params.id;
  try {
    const posts = await Post.find({ postedBy: userId })
      .populate("postedBy", "_id name Photo")
      .sort("-createdAt");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  const { body, Photo } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { body, Photo },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsersWhoLikedPost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId).populate(
      "likes",
      "_id name Photo"
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const likes = post.likes;

    // Aggregate to get the likes count
    const likesCountAggregate = await Post.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(postId) } },
      { $project: { likesCount: { $size: "$likes" } } },
    ]);
    if (likesCountAggregate.length === 0) {
      return res.status(500).json({ error: "Failed to get likes count" });
    }

    // Send the count of likes and the list of users who liked the post as a JSON response
    res.json({ likesCount: likesCountAggregate[0].likesCount, likes });
  } catch (error) {
    // Handle errors
    console.error("Error fetching users who liked the post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const likePost = async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true }
    ).populate("likes", "_id");

    const likedUserIds = updatedPost.likes.map((user) => user._id);

    res.json({ likes: likedUserIds });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Unlike Post API
const unlikePost = async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    ).populate("likes", "_id");

    const likedUserIds = updatedPost.likes.map((user) => user._id);

    res.json({ likes: likedUserIds });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const result = await Post.findOne({ _id: req.params.postId });
    if (result) {
      await Post.deleteOne({ _id: req.params.postId });
      return res.status(200).json({ message: "Post deleted successfully" });
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate("postedBy", "name Photo");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    console.log(post);
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
// const getPost = async (req, res) => {
//   try {
//     const posts = await Post.find().populate("postedBy", "name Photo");
//     res.status(200).json(posts);
//     console.log(posts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };

module.exports = {
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
};
