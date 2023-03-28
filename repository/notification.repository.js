const NotificationModel = require("../models/Notification");
const PostModel = require("../models/Post");

const createNotification = async (data) => {
  try {
    const notification = await NotificationModel.create(data);
    return notification;
  } catch (error) {
    return error.message;
  }
};

const getAllNotificationsByUser = async (userId) => {
  try {
    // Step 1: Find all posts by user
    const posts = await PostModel.find({ UserId: userId });

    // Step 2: Find all notifications related to each post
    const postIds = posts.map((post) => post._id);
    const notifications = await NotificationModel.find({
      postId: { $in: postIds },
    })
      .populate("userCommentId")
      .populate("userId")
      .populate("postId")
      .populate("commentId");

    // Step 3: Sort notifications by descending timestamp
    notifications.sort((a, b) => b.createdAt - a.createdAt);

    return notifications;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const readByIdNotificationsByUser = async (id) => {
  try {
    const result = await NotificationModel.findByIdAndUpdate(
      { _id: id },
      {
        isRead: true,
      }
    );

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const readAllNotificationsByUser = async (UserId) => {
  try {
    const result = await NotificationModel.updateMany(
      { userId: UserId },
      { $set: { isRead: true } }
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createNotification,
  getAllNotificationsByUser,
  readByIdNotificationsByUser,
  readAllNotificationsByUser,
};
