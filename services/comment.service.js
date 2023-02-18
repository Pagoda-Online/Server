const CommentRepository = require("../repository/comment.repository");

const getAllComments = async (options) => {
  try {
    const Comment = await CommentRepository.findAllComment(options);
    return Comment;
  } catch (error) {
    console.log(
      "🚀 ~ file: Commentervices.js ~ line 25 ~ getAllComment ~ error",
      error
    );
  }
};

const getCommentById = async (id) => {
  try {
    const Comment = await CommentRepository.findCommentById(id);
    return Comment;
  } catch (error) {
    console.log(
      "🚀 ~ file: Commentervices.js ~ line 33 ~ getCommentById ~ error",
      error
    );
  }
};

const createComment = async (data) => {
  try {
    const Comment = await CommentRepository.createComment(data);
    return Comment;
  } catch (error) {
    console.log(
      "🚀 ~ file: Commentervices.js ~ line 32 ~ createComment ~ error",
      error
    );
  }
};

const deleteCommentById = async (id) => {
  try {
    const Comment = await CommentRepository.deleteCommentById(id);
    return Comment;
  } catch (error) {
    console.log(
      "🚀 ~ file: CommentRepository.js ~ line 33 ~ findCommentById ~ error",
      error
    );
  }
};

const updateCommentById = async (id, data) => {
  try {
    const Comment = await CommentRepository.updateCommentById(id, data);
    return Comment;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  deleteCommentById,
  updateCommentById,
};
