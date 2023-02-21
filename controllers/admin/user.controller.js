const User = require("../../models/User");

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 19 ~ router.post ~ error", error);
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const foundUser = await User.findById(id);

    if (!foundUser) return res.status(403).send("Can't find any user");

    res.json(foundUser);
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 47 ~ router.post ~ error", error);
    next(error);
  }
};

module.exports = {
  getAllUser,
  getUserById,
};
