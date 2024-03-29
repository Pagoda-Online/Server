const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    UserId: { type: mongoose.Types.ObjectId, ref: "User" },
    PostDesc: { type: String, default: "null" },
    UrlImagePath: { type: String, default: "null" },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PostSchema.plugin(mongoosePaginate);

// tạo model
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
