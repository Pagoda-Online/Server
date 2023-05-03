const CommentRepository = require("../repository/comment.repository");
const { decodeToken } = require("../utils/jwt");
const NotificationRepository = require("../repository/notification.repository");
const PostRepository = require("../repository/post.repository");

const createComment = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    const comment = await CommentRepository.createComment(req.body);

    if (!comment) return res.sendStatus(500);

    // create notification
    const postOwnerId = await PostRepository.findPostById(req.body.PostId);

    const notification = await NotificationRepository.createNotification({
      userCommentId: payload._id,
      userId: postOwnerId.UserId,
      postId: req.body.PostId,
      commentId: comment._id,
      message: comment.Content,
      isRead: false,
    });

    return res.status(200).send(comment);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAllComments = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401);

  const Comments = await CommentRepository.findAllComment(req.query.PostId);
  res.send(Comments);
};

const getComment = async (req, res, next) => {
  const id = req.params.id;
  const Comment = await CommentRepository.getCommentById(id);
  if (!Comment) res.sendStatus(400);
  console.log("🚀 ~ file: Comment.js ~ line 16 ~ Comment", Comment);
  res.send(Comment);
};

const deleteComment = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    const userId = payload._id;

    const findComment = await CommentRepository.findCommentById(req.params.id);

    const findPost = await PostRepository.findPostById(findComment.PostId);

    if (
      findPost.UserId.toString() !== userId.toString() &&
      findComment.UserId.toString() !== userId.toString()
    ) {
      return res.sendStatus(400);
    }

    const Comment = await CommentRepository.deleteCommentById(req.params.id);

    return res.status(200).send(Comment);
  } catch (error) {
    return res.sendStatus(500);
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
