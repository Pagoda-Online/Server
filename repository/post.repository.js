const PostModel = require("../models/Post");
const FollowerModel = require("../models/Follower");

const findAllPost = async (UserId) => {
  try {
    const Posts = await PostModel.find({ UserId: UserId })
      .sort({ createdAt: -1 })
      .populate("UserId");
    return Posts;
  } catch (error) {
    return error.message;
  }
};

const findAllPostOfFollower = async (UserId) => {
  try {
    const followers = await FollowerModel.find({
      userFollowing_id: UserId,
    }).populate("userFollowed_id");

    const followedUserIds = followers.map(
      (follower) => follower.userFollowed_id._id
    );

    const posts = await PostModel.find({
      UserId: { $in: followedUserIds },
    })
      .populate("UserId")
      .sort({ createdAt: -1 });

    return posts; // các bài post của người đang follow
  } catch (error) {
    throw error;
  }
};

const getAllPostsForAdmin = async () => {
  try {
    const Posts = await PostModel.find().populate("UserId");
    return Posts;
  } catch (error) {
    return error.message;
  }
};

const findPostById = async (id) => {
  try {
    const Post = await PostModel.findById(id).populate("UserId");
    return Post;
  } catch (error) {
    return error.message;
  }
};

const createPost = async (data) => {
  try {
    const Post = await PostModel.create(data);
    return Post;
  } catch (error) {
    return error.message;
  }
};

const deletePostById = async (id) => {
  try {
    const Post = await PostModel.deleteMany({ _id: id });
    return Post;
  } catch (error) {
    return error.message;
  }
};

const updatePostById = async (id, data) => {
  try {
    const Post = await PostModel.updateMany(id, data);
    return Post;
  } catch (err) {
    return err;
  }
};

module.exports = {
  findAllPost,
  findPostById,
  createPost,
  deletePostById,
  updatePostById,
  getAllPostsForAdmin,
  findAllPostOfFollower,
};
