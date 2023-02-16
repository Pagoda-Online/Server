const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  UserId: { type: mongoose.Types.ObjectId, ref: "User" },
  PostId: { type: mongoose.Types.ObjectId, ref: "Post" },
  ContentId: { type: mongoose.Types.ObjectId, ref: "Content" },
});

CommentSchema.plugin(mongoosePaginate);

// tạo model
const Comment = mongoose.model("Role", CommentSchema);

module.exports = Comment;
