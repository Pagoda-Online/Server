const { User } = require("../models/User");

const createAccount = async (req, res, next) => {
  try {
    let data = req.body;
    const user = await User.findOne({ email: data.email });

    if (user) return res.status(400).send("user already exist");

    const hashedPassword = await hashPassword(data.password);

    const newUser = await User.create({ ...data, password: hashedPassword });

    if (!newUser) return res.status(500).send("Internal server error");

    return newUser;
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

const updateAccount = async (req, res, next) => {
  try {
    let data = req.body;

    const newUserUpdate = await User.updateOne({ _id: user._id }, { ...data });

    return newUserUpdate;
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const foundUser = await User.findById(id);

    return foundUser;
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const id = req.params.id;

    const foundUser = await User.deleteOne({ _id: id });

    return foundUser;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  getUserById,
  createAccount,
  updateAccount,
  deleteAccount,
};
