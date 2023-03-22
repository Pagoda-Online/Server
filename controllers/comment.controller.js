const CommentRepository = require("../repository/comment.repository");
const { decodeToken } = require("../utils/jwt");

const getAllComments = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401);

  const Comments = await CommentRepository.findAllComment(req.query.PostId);
  console.log(
    "🚀 ~ file: comment.controller.js:10 ~ getAllComments ~ Comments:",
    Comments
  );

  res.send(Comments);
};

const getComment = async (req, res, next) => {
  const id = req.params.id;

  const Comment = await CommentRepository.getCommentById(id);

  if (!Comment) res.sendStatus(400);

  console.log("🚀 ~ file: Comment.js ~ line 16 ~ Comment", Comment);

  res.send(Comment);
};

const createComment = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    const Comment = await CommentRepository.createComment(req.body);

    if (!Comment) return res.sendStatus(500);

    return res.status(200).send(Comment);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    // DELETE : req.params, req.query
    if (!req.params.id) return res.sendStatus(400);

    const Comment = await CommentRepository.deleteCommentById(req.params.id);

    if (!Comment) return res.sendStatus(500);

    return res.status(200).send(Comment);
  } catch (error) {
    console.log(
      "🚀 ~ file: follower.controller.js:52 ~ deleteComment ~ error",
      error
    );

    res.sendStatus(500);
  }
};

const updateComment = async (req, res, next) => {
  try {
    // UPDATE : req.params, req.query
    if (!req.params.id && req.body) return res.sendStatus(400);

    const Comment = await CommentRepository.updateCommentById(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (!Comment) return res.sendStatus(500);

    return res.status(200).send(Comment);
  } catch (error) {
    console.log(
      "🚀 ~ file: follower.controller.js:75 ~ updateComment ~ error",
      error
    );

    res.sendStatus(500);
  }
};

module.exports = {
  getAllComments,
  getComment,
  createComment,
  deleteComment,
  updateComment,
};
