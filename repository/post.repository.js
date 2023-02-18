const PostModel = require("../models/Post");

const findAllPost = async (options) => {
  try {
    const Posts = await PostModel.paginate({}, options);
    return Posts;
  } catch (error) {
    console.log(
      "🚀 ~ file: PostRepository.js ~ line 25 ~ findAll ~ error",
      error
    );
  }
};

const findPostById = async (id) => {
  try {
    const Post = await PostModel.findById(id);
    return Post;
  } catch (error) {
    console.log(
      "🚀 ~ file: PostRepository.js ~ line 33 ~ findPostById ~ error",
      error
    );
  }
};

const createPost = async (data) => {
  try {
    const Post = await PostModel.create(data);
    return Post;
  } catch (error) {
    console.log(
      "🚀 ~ file: PostRepository.js ~ line 31 ~ createPost ~ error",
      error
    );
  }
};

const deletePostById = async (id) => {
  try {
    const Post = await PostModel.deleteMany({ _id: id });
    return Post;
  } catch (error) {
    console.log(
      "🚀 ~ file: PostRepository.js ~ line 33 ~ findPostById ~ error",
      error
    );
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
};
