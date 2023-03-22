const PostRepository = require("../repository/post.repository");
const { decodeToken } = require("../utils/jwt");
const { uploadToCloudinary } = require("../services/upload.service");
const { ErrorHandler } = require("../utils/errorHandler");
const { bufferToDataURI } = require("../utils/file");

const getAllPosts = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    const Posts = await PostRepository.findAllPost(payload._id);
    res.send(Posts);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAllPostsOfFollower = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    const Posts = await PostRepository.findAllPostOfFollower(payload._id);

    res.send(Posts);
  } catch (err) {
    res.send(err);
  }
};

const getAllPostsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.UserId;
    const Posts = await PostRepository.findAllPost(userId);
    res.send(Posts);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAllPostsForAdmin = async (req, res, next) => {
  try {
    const Posts = await PostRepository.getAllPostsForAdmin();
    res.send(Posts);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getPost = async (req, res, next) => {
  try {
    const id = req.params.id;

    const Post = await PostRepository.getPostById(id);

    if (!Post) res.sendStatus(400);

    res.send(Post);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createPost = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    const { file } = req;
    // if (!file) throw new ErrorHandler(400, "Image is required");
    if (file) {
      const fileFormat = file.mimetype.split("/")[1];
      const { base64 } = bufferToDataURI(fileFormat, file.buffer);

      const imageDetails = await uploadToCloudinary(base64, fileFormat);
      req.body.UrlImagePath = imageDetails.url;
    }

    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const Post = await PostRepository.createPost(req.body);

    if (!Post) return res.sendStatus(500);

    return res.status(200).send(Post);
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

// const createPostAdmin = async (req, res, next) => {
//   try {
//     // GET : req.params, req.query
//     if (!req.body) return res.sendStatus(400);

//     req.body.UserId = "6403990fbb75a53ed142763a";

//     const { file } = req;
//     // if (!file) throw new ErrorHandler(400, "Image is required");

//     const fileFormat = file.mimetype.split("/")[1];
//     const { base64 } = bufferToDataURI(fileFormat, file.buffer);

//     const imageDetails = await uploadToCloudinary(base64, fileFormat);

//     req.body.UrlImagePath = imageDetails.url;

//     const Post = await PostRepository.createPost(req.body);

//     if (!Post) return res.sendStatus(500);

//     return res.status(200).json(Post);
//   } catch (error) {
//     next(new ErrorHandler(error.statusCode || 500, error.message));
//   }
// };

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
    const { file } = req;
    if (file) {
      const fileFormat = file.mimetype.split("/")[1];
      const { base64 } = bufferToDataURI(fileFormat, file.buffer);

      const imageDetails = await uploadToCloudinary(base64, fileFormat);

      req.body.UrlImagePath = imageDetails.url;
    }
    // UPDATE : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const Post = await PostRepository.updatePostById(
      { _id: req.body.PostId },
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
  getAllPostsByUserId,
  getAllPostsOfFollower,
};
