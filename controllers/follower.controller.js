const FollowerRepository = require("../repository/follower.repository");
const { decodeToken } = require("../utils/jwt");

const getAllFollowers = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);

    const Followers = await FollowerRepository.findAllFollower(payload._id);
    res.send(Followers);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getAllFollowing = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);

    const Followers = await FollowerRepository.findAllFollowing(payload._id);
    res.send(Followers);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getFollower = async (req, res, next) => {
  try {
    const id = req.params.id;

    const Follower = await FollowerRepository.getFollowerById(id);

    if (!Follower) res.sendStatus(400);

    res.send(Follower);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createFollower = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.userFollowing_id = payload._id;

    const Follower = await FollowerRepository.createFollower(req.body);

    if (!Follower) return res.sendStatus(500);

    return res.status(200).send(Follower);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteFollower = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.userFollowing_id = payload._id;
    // DELETE : req.params, req.query
    if (!req.params.id) return res.sendStatus(400);

    const Follower = await FollowerRepository.deleteFollower(
      req.body.userFollowing_id,
      req.params.id
    );

    if (!Follower) return res.sendStatus(500);

    return res.status(200).send(Follower);
  } catch (error) {
    console.log(
      "🚀 ~ file: follower.controller.js:52 ~ deleteFollower ~ error",
      error
    );

    res.sendStatus(500);
  }
};

const updateFollower = async (req, res, next) => {
  try {
    // UPDATE : req.params, req.query
    if (!req.params.id && req.body) return res.sendStatus(400);

    const Follower = await FollowerRepository.updateFollowerById(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (!Follower) return res.sendStatus(500);

    return res.status(200).send(Follower);
  } catch (error) {
    console.log(
      "🚀 ~ file: follower.controller.js:75 ~ updateFollower ~ error",
      error
    );

    res.sendStatus(500);
  }
};

module.exports = {
  getAllFollowers,
  getFollower,
  createFollower,
  deleteFollower,
  updateFollower,
  getAllFollowing,
};
