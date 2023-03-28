const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    userCommentId: { type: mongoose.Types.ObjectId, ref: "User" },
    postId: { type: mongoose.Types.ObjectId, ref: "Post" },
    commentId: { type: mongoose.Types.ObjectId, ref: "Comment" },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

NotificationSchema.plugin(mongoosePaginate);

// tạo model
const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
