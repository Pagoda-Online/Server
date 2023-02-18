const CommentServices = require("../services/comment.service");

const getAllComments = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const Comments = await CommentServices.getAllComments({ page, limit });
  res.send(Comments);
};

const getComment = async (req, res, next) => {
  const id = req.params.id;

  const Comment = await CommentServices.getCommentById(id);

  if (!Comment) res.sendStatus(400);

  console.log("🚀 ~ file: Comment.js ~ line 16 ~ Comment", Comment);

  res.send(Comment);
};

const createComment = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const Comment = await CommentServices.createComment(req.body);

    if (!Comment) return res.sendStatus(500);

    return res.status(200).send(Comment);
  } catch (error) {
    console.log(
      "🚀 ~ file: CommentController.js ~ line 32 ~ createComment ~ error",
      error
    );
    res.sendStatus(500);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    // DELETE : req.params, req.query
    if (!req.params.id) return res.sendStatus(400);

    const Comment = await CommentServices.deleteCommentById(req.params.id);

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

    const Comment = await CommentServices.updateCommentById(
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
