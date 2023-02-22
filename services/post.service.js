const PostRepository = require("../repository/post.repository");

const getAllPosts = async (UserId) => {
  try {
    const Post = await PostRepository.findAllPost(UserId);
    return Post;
  } catch (error) {
    console.log(
      "🚀 ~ file: Postervices.js ~ line 25 ~ getAllPost ~ error",
      error
    );
  }
};

const getAllPostsForAdmin = async () => {
  try {
    const Post = await PostRepository.findAllPostForAdmin();
    return Post;
  } catch (error) {
    console.log(
      "🚀 ~ file: Postervices.js ~ line 25 ~ getAllPost ~ error",
      error
    );
  }
};

const getPostById = async (id) => {
  try {
    const Post = await PostRepository.findPostById(id);
    return Post;
  } catch (error) {
    console.log(
      "🚀 ~ file: Postervices.js ~ line 33 ~ getPostById ~ error",
      error
    );
  }
};

const createPost = async (data) => {
  try {
    const Post = await PostRepository.createPost(data);
    return Post;
  } catch (error) {
    console.log(
      "🚀 ~ file: Postervices.js ~ line 32 ~ createPost ~ error",
      error
    );
  }
};

const deletePostById = async (id) => {
  try {
    const Post = await PostRepository.deletePostById(id);
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
    const Post = await PostRepository.updatePostById(id, data);
    return Post;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
  updatePostById,
  getAllPostsForAdmin,
};
