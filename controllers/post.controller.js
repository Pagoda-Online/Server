const PostRepository = require("../repository/post.repository");
const { decodeToken } = require("../utils/jwt");

const getAllPosts = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);
  const Posts = await PostRepository.getAllPosts(payload._id);
  res.send(Posts);
};

const getAllPostsForAdmin = async (req, res, next) => {
  const Posts = await PostRepository.getAllPostsForAdmin();
  res.send(Posts);
};

const getPost = async (req, res, next) => {
  const id = req.params.id;

  const Post = await PostRepository.getPostById(id);

  if (!Post) res.sendStatus(400);

  console.log("🚀 ~ file: Post.js ~ line 16 ~ Post", Post);

  res.send(Post);
};

const createPost = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    const Post = await PostRepository.createPost(req.body);

    if (!Post) return res.sendStatus(500);

    return res.status(200).send(Post);
  } catch (error) {
    console.log(
      "🚀 ~ file: PostController.js ~ line 32 ~ createPost ~ error",
      error
    );
    res.sendStatus(500);
  }
};

const deletePost = async (req, res, next) => {
  try {
    // DELETE : req.params, req.query
    if (!req.params.id) return res.sendStatus(400);

    const Post = await PostRepository.deletePostById(req.params.id);

    if (!Post) return res.sendStatus(500);

    return res.status(200).send(Post);
  } catch (error) {
    console.log("🚀 ~ file: post.controller.js:52 ~ deletePost ~ error", error);

    res.sendStatus(500);
  }
};

const updatePost = async (req, res, next) => {
  try {
    // UPDATE : req.params, req.query
    if (!req.params.id && req.body) return res.sendStatus(400);

    const Post = await PostRepository.updatePostById(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (!Post) return res.sendStatus(500);

    return res.status(200).send(Post);
  } catch (error) {
    console.log("🚀 ~ file: post.controller.js:75 ~ updatePost ~ error", error);

    res.sendStatus(500);
  }
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  getAllPostsForAdmin,
};
