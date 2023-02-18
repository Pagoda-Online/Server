const FollowerRepository = require("../repository/follower.repository");

const getAllFollowers = async (options) => {
  try {
    const Follower = await FollowerRepository.findAllFollower(options);
    return Follower;
  } catch (error) {
    console.log(
      "🚀 ~ file: Followerervices.js ~ line 25 ~ getAllFollower ~ error",
      error
    );
  }
};

const getFollowerById = async (id) => {
  try {
    const Follower = await FollowerRepository.findFollowerById(id);
    return Follower;
  } catch (error) {
    console.log(
      "🚀 ~ file: Followerervices.js ~ line 33 ~ getFollowerById ~ error",
      error
    );
  }
};

const createFollower = async (data) => {
  try {
    const Follower = await FollowerRepository.createFollower(data);
    return Follower;
  } catch (error) {
    console.log(
      "🚀 ~ file: Followerervices.js ~ line 32 ~ createFollower ~ error",
      error
    );
  }
};

const deleteFollowerById = async (id) => {
  try {
    const Follower = await FollowerRepository.deleteFollowerById(id);
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
    const Follower = await FollowerRepository.updateFollowerById(id, data);
    return Follower;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllFollowers,
  getFollowerById,
  createFollower,
  deleteFollowerById,
  updateFollowerById,
};
