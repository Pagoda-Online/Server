const FollowerModel = require("../models/Follower");

const findAllFollower = async (UserId) => {
  try {
    const Followers = await FollowerModel.find({ userFollowed_id: UserId });
    return Followers;
  } catch (error) {
    console.log(
      "🚀 ~ file: FollowerRepository.js ~ line 25 ~ findAll ~ error",
      error
    );
  }
};

const findAllFollowing = async (UserId) => {
  try {
    const Followers = await FollowerModel.find({ userFollowing_id: UserId });
    return Followers;
  } catch (error) {
    console.log(
      "🚀 ~ file: FollowerRepository.js ~ line 25 ~ findAll ~ error",
      error
    );
  }
};

const findFollowerById = async (id) => {
  try {
    const Follower = await FollowerModel.findById(id);
    return Follower;
  } catch (error) {
    console.log(
      "🚀 ~ file: FollowerRepository.js ~ line 33 ~ findFollowerById ~ error",
      error
    );
  }
};

const createFollower = async (data) => {
  try {
    const Follower = await FollowerModel.create(data);
    return Follower;
  } catch (error) {
    console.log(
      "🚀 ~ file: FollowerRepository.js ~ line 31 ~ createFollower ~ error",
      error
    );
  }
};

const deleteFollowerById = async (id) => {
  try {
    const Follower = await FollowerModel.deleteMany({ _id: id });
    return Follower;
  } catch (error) {
    console.log(
      "🚀 ~ file: FollowerRepository.js ~ line 33 ~ findFollowerById ~ error",
      error
    );
  }
};

const updateFollowerById = async (id, data) => {
  try {
    const Follower = await FollowerModel.updateMany(id, data);
    return Follower;
  } catch (err) {
    return err;
  }
};

module.exports = {
  findAllFollower,
  findFollowerById,
  createFollower,
  deleteFollowerById,
  updateFollowerById,
  findAllFollowing,
};
