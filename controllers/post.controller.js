const PostServices = require("../services/post.service");

const getAllPosts = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const Posts = await PostServices.getAllPosts({ page, limit });
  res.send(Posts);
};

const getPost = async (req, res, next) => {
  const id = req.params.id;

  const Post = await PostServices.getPostById(id);

  if (!Post) res.sendStatus(400);

  console.log("🚀 ~ file: Post.js ~ line 16 ~ Post", Post);

  res.send(Post);
};

const createPost = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const Post = await PostServices.createPost(req.body);

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

    const Post = await PostServices.deletePostById(req.params.id);

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

    const Post = await PostServices.updatePostById(
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
};
