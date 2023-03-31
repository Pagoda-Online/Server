const PostModel = require("../models/Post");
const FollowerModel = require("../models/Follower");
const UserPost = require("../models/userPost");

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

// const findAllPostOfFollower = async (UserId) => {
//   try {
//     const followers = await FollowerModel.find({
//       userFollowing_id: UserId,
//     }).populate("userFollowed_id");

//     const followedUserIds = followers.map(
//       (follower) => follower.userFollowed_id._id
//     );

//     const posts = await PostModel.find({
//       UserId: { $in: followedUserIds },
//     })
//       .populate("UserId")
//       .sort({ createdAt: -1 });

//     for (const post of posts) {
//       const userPost = await UserPost.findOne({
//         UserId: UserId,
//         PostId: post._id,
//       });

//       if (userPost) {
//         post.isLike = userPost.isLike;
//       } else {
//         post.isLike = false;
//       }
//     }

//     return posts; // các bài post của người đang follow
//   } catch (error) {
//     throw error;
//   }
// };

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
      .lean()
      .sort({ createdAt: -1 });

    const postsWithLike = posts.map(async (post) => {
      const userPost = await UserPost.findOne({
        UserId: UserId,
        PostId: post._id,
      });

      if (userPost) {
        post.isLike = userPost.isLike;
      } else {
        post.isLike = false;
      }

      return post;
    });

    return Promise.all(postsWithLike); // các bài post của người đang follow
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

const like = async (postId, userId) => {
  try {
    let post = await PostModel.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    let userPost = await UserPost.findOne({ PostId: postId, UserId: userId });

    if (!userPost) {
      userPost = new UserPost({
        UserId: userId,
        PostId: postId,
        isLike: true,
      });

      await userPost.save();

      post.likeCount++;
      await post.save();
    } else if (userPost.isLike === false) {
      userPost.isLike = true;

      await userPost.save();

      post.likeCount++;
      await post.save();
    } else if (userPost.isLike) {
      userPost.isLike = false;

      await userPost.save();

      post.likeCount--;
      await post.save();
    }

    return post;
  } catch (error) {
    console.error(error);
    throw new Error(error);
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
  like,
};
