const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    UserId: { type: mongoose.Types.ObjectId, ref: "User" },
    PostId: { type: mongoose.Types.ObjectId, ref: "Post" },
    Content: String,
  },
  { timestamps: true }
);

CommentSchema.plugin(mongoosePaginate);

// tạo model
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
