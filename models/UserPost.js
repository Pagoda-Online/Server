const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const UserPostSchema = new Schema(
  {
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    PostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    isLike: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

UserPostSchema.plugin(paginate);
const UserPost = mongoose.model("UserPost", UserPostSchema);

module.exports = UserPost;
