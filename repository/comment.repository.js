const CommentModel = require("../models/Comment");

const findAllComment = async (PostId) => {
  try {
    const Comments = await CommentModel.find({ PostId: PostId }).populate(
      "UserId"
    );
    return Comments;
  } catch (error) {
    return error;
  }
};

const findCommentById = async (id) => {
  try {
    const Comment = await CommentModel.findById(id);
    return Comment;
  } catch (error) {
    return error;
  }
};

const createComment = async (data) => {
  try {
    const Comment = await CommentModel.create(data);
    return Comment;
  } catch (error) {
    return error;
  }
};

const deleteCommentById = async (id) => {
  try {
    const Comment = await CommentModel.deleteMany({ _id: id });
    return Comment;
  } catch (error) {
    return error;
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
