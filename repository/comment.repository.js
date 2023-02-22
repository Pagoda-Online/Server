const CommentModel = require("../models/Comment");

const findAllComment = async (UserId) => {
  try {
    const Comments = await CommentModel.find({ UserId: UserId });
    return Comments;
  } catch (error) {
    console.log(
      "🚀 ~ file: CommentRepository.js ~ line 25 ~ findAll ~ error",
      error
    );
  }
};

const findCommentById = async (id) => {
  try {
    const Comment = await CommentModel.findById(id);
    return Comment;
  } catch (error) {
    console.log(
      "🚀 ~ file: CommentRepository.js ~ line 33 ~ findCommentById ~ error",
      error
    );
  }
};

const createComment = async (data) => {
  try {
    const Comment = await CommentModel.create(data);
    return Comment;
  } catch (error) {
    console.log(
      "🚀 ~ file: CommentRepository.js ~ line 31 ~ createComment ~ error",
      error
    );
  }
};

const deleteCommentById = async (id) => {
  try {
    const Comment = await CommentModel.deleteMany({ _id: id });
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
    const Comment = await CommentModel.updateMany(id, data);
    return Comment;
  } catch (err) {
    return err;
  }
};

module.exports = {
  findAllComment,
  findCommentById,
  createComment,
  deleteCommentById,
  updateCommentById,
};
