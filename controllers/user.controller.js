const User = require("../models/User");
const { hashPassword } = require("../utils/bcrypt");

const createAccount = async (req, res, next) => {
  try {
    let data = req.body;
    const user = await User.findOne({ email: data.email });

    if (user) return res.status(400).send("user already exist");

    const hashedPassword = await hashPassword(data.password);

    const newUser = await User.create({ ...data, password: hashedPassword });

    if (!newUser) return res.status(500).send("Internal server error");

    return res.status(200).send(newUser);
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 19 ~ router.post ~ error", error);
    next(error);
  }
};

const updateAccount = async (req, res, next) => {
  try {
    let data = req.body;
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(400).send("user account is not exist");

    if (req.body.password) {
      const hashedPassword = await hashPassword(data.password);
      const newUserUpdate = await User.updateOne(
        { _id: user._id },
        {
          ...data,
          password: hashedPassword,
        }
      );
      if (!newUserUpdate) return res.status(500).send("Internal server error");

      return res.status(200).send(newUserUpdate);
    }

    const newUserUpdate = await User.updateOne({ _id: user._id }, { ...data });

    if (!newUserUpdate) return res.status(500).send("Internal server error");

    return res.status(200).send(newUserUpdate);
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 19 ~ router.post ~ error", error);
    next(error);
  }
};

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
  createAccount,
  updateAccount,
};
