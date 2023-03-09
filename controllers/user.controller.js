const { User } = require("../models/User");
// const User = require("../repository/user.repository");
const sendEmail = require("../utils/sendEmail");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const updateAccount = async (req, res, next) => {
  try {
    let data = req.body;
    // if (req.file) {
    //   data.UrlImagePath = req.file.filename;
    // }

    const user = await User.findOne({ _id: req.params.id });

    if (!user) return res.status(400).send("user account is not exist");

    if (data.password) {
      const hashedPassword = await hashPassword(data.password);

      const newUserUpdate = await User.updateOne(
        { _id: user._id },
        {
          ...data,
          password: hashedPassword,
        }
      );
      if (!newUserUpdate) return res.status(500).send("Internal server error");

      return res.status(200).send(data);
    }

    const newUserUpdate = await User.updateOne({ _id: user._id }, { ...data });

    if (!newUserUpdate) return res.status(500).send("Internal server error");

    return res.status(200).send(data);
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 19 ~ router.post ~ error", error);
    next(error);
  }
};

const inactiveAccount = async (req, res, next) => {
  try {
    const account = req.body;
    console.log(
      "🚀 ~ file: user.controller.js:80 ~ inactiveAccount ~ account:",
      account
    );

    const updatedAccount = await User.findOneAndUpdate(
      { email: account.email },
      { isActive: false },
      { new: true }
    );
    return res.json(updatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating accounts" });
  }
};

const activeAccount = async (req, res, next) => {
  try {
    const account = req.body;
    console.log(
      "🚀 ~ file: user.controller.js:80 ~ inactiveAccount ~ account:",
      account
    );

    const updatedAccount = await User.findOneAndUpdate(
      { email: account.email },
      { isActive: true },
      { new: true }
    );
    return res.json(updatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating accounts" });
  }
};

const sendMail = async (req, res, next) => {
  try {
    const Account = req.body.email;
    const text = req.body.text;
    const subject = req.body.subject;
    const sendmail = await sendEmail(Account, subject, text);

    return res.status(200).json({ message: "send email successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "can not send email" });
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log(
      "🚀 ~ file: user.controller.js:61 ~ getAllUser ~ error:",
      error
    );

    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const foundUser = await User.findById(id);

    if (!foundUser) return res.status(403).send("Can't find any user");

    return res.status(200).json(foundUser);
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 47 ~ router.post ~ error", error);
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const id = req.params.id;

    const foundUser = await User.deleteOne({ _id: id });

    res.json(foundUser);
  } catch (error) {
    console.log(
      "🚀 ~ file: user.controller.js:95 ~ deleteAccount ~ error:",
      error
    );
    next(error);
  }
};

module.exports = {
  getAllUser,
  getUserById,
  updateAccount,
  inactiveAccount,
  activeAccount,
  sendMail,
  deleteAccount,
  uploadImage: upload.single("image"),
};
