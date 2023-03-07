const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    UserId: { type: mongoose.Types.ObjectId, ref: "User" },
    PostTitle: String,
    PostDesc: String,
    UrlImagePath: String,
  },
  { timestamps: true }
);

PostSchema.plugin(mongoosePaginate);

// tạo model
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
