const UserPost = require("../models/userPost");

async function getByUserId(userId) {
  return await UserPost.find({ UserId: userId });
}

module.exports = {
  getByUserId,
};
