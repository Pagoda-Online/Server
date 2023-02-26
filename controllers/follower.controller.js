const FollowerServices = require("../services/follower.service");
const { decodeToken } = require("../utils/jwt");

const getAllFollowers = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);

  const Followers = await FollowerServices.getAllFollowers(payload._id);
  res.send(Followers);
};

const getAllFollowing = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);

  const Followers = await FollowerServices.getAllFollowing(payload._id);
  res.send(Followers);
};

const getFollower = async (req, res, next) => {
  const id = req.params.id;

  const Follower = await FollowerServices.getFollowerById(id);

  if (!Follower) res.sendStatus(400);

  console.log("🚀 ~ file: Follower.js ~ line 16 ~ Follower", Follower);

  res.send(Follower);
};

const createFollower = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.userFollowing_id = payload._id;

    const Follower = await FollowerServices.createFollower(req.body);

    if (!Follower) return res.sendStatus(500);

    return res.status(200).send(Follower);
  } catch (error) {
    console.log(
      "🚀 ~ file: FollowerController.js ~ line 32 ~ createFollower ~ error",
      error
    );
    res.sendStatus(500);
  }
};

const deleteFollower = async (req, res, next) => {
  try {
    // DELETE : req.params, req.query
    if (!req.params.id) return res.sendStatus(400);

    const Follower = await FollowerServices.deleteFollowerById(req.params.id);

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

    const Follower = await FollowerServices.updateFollowerById(
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
