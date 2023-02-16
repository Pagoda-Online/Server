const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const PostSchema = new Schema({
  UserId: { type: mongoose.Types.ObjectId, ref: "User" },
  CommentId: { type: mongoose.Types.ObjectId, ref: "Comment" },
  PostTitle: String,
  PostDescr: String,
  UrlImagePath: String,
  UrlFileAttach: String,
});

PostSchema.plugin(mongoosePaginate);

// tạo model
const Post = mongoose.model("Role", PostSchema);

module.exports = Post;
