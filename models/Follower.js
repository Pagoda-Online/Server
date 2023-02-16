const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const FollowerSchema = new Schema({
  userFollowing_id: { type: mongoose.Types.ObjectId, ref: "User" },
  userFollowed_id: { type: mongoose.Types.ObjectId, ref: "User" },
});

FollowerSchema.plugin(mongoosePaginate);

// tạo model
const Follower = mongoose.model("Event", FollowerSchema);

module.exports = Follower;
