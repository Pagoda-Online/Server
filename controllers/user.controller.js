const { User } = require("../models/User");
const Follower = require("../models/Follower");
const mongoose = require("mongoose");
const { decodeToken } = require("../utils/jwt");
const { hashPassword, checkPassword } = require("../utils/bcrypt");
const { uploadToCloudinary } = require("../services/upload.service");
const { ErrorHandler } = require("../utils/errorHandler");
const { bufferToDataURI } = require("../utils/file");
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
    next(error);
  }
};

const inactiveAccount = async (req, res, next) => {
  try {
    const account = req.params.id;
    console.log(
      "🚀 ~ file: user.controller.js:80 ~ inactiveAccount ~ account:",
      account
    );

    const updatedAccount = await User.findOneAndUpdate(
      { _id: account },
      { isActive: false },
      { new: true }
    );
    console.log(
      "🚀 ~ file: user.controller.js:68 ~ inactiveAccount ~ updatedAccount:",
      updatedAccount
    );
    return res.json(updatedAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating accounts" });
  }
};

const activeAccount = async (req, res, next) => {
  try {
    const account = req.params.id;
    console.log(
      "🚀 ~ file: user.controller.js:80 ~ inactiveAccount ~ account:",
      account
    );

    const updatedAccount = await User.findOneAndUpdate(
      { _id: account },
      { isActive: true },
      { new: true }
    );
    console.log(
      "🚀 ~ file: user.controller.js:92 ~ activeAccount ~ updatedAccount:",
      updatedAccount
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
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);
  const userIdToExclude = payload._id;

  const query = req.query.q;

  if (query) {
    User.find({
      _id: { $ne: userIdToExclude },
      $or: [
        { fullname: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
      .lean()
      .exec(async function (err, users) {
        if (err) {
          // handle error
        } else {
          for (let user of users) {
            const isFollowed = await Follower.findOne({
              userFollowing_id: userIdToExclude,
              userFollowed_id: user._id,
            }).lean();

            if (!isFollowed) {
              user.isFollow = false;
            } else {
              user.isFollow = true;
            }
          }
          return res.json(users);
        }
      });
  } else {
    User.find({
      _id: { $ne: userIdToExclude },
    })
      .lean()
      .exec(async function (err, users) {
        if (err) {
          // handle error
        } else {
          for (let user of users) {
            const isFollowed = await Follower.findOne({
              userFollowing_id: userIdToExclude,
              userFollowed_id: user._id,
            }).lean();

            if (!isFollowed) {
              user.isFollow = false;
            } else {
              user.isFollow = true;
            }
          }
          return res.json(users);
        }
      });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);

    const id = req.params.id;

    const foundUser = await User.findById(id);

    if (!foundUser) return res.status(403).send("Can't find any user");

    // Tìm bản ghi trong model Follower
    const follower = await Follower.findOne({
      userFollowed_id: id,
      userFollowing_id: payload._id,
    });

    // Nếu follower được tìm thấy, đó có nghĩa là bạn đã follow người dùng này
    const isFollowing = !!follower;

    return res.status(200).json({ foundUser, isFollowing });
  } catch (error) {
    next(error);
  }
};

const updateAccountForMySelf = async (req, res, next) => {
  try {
    let data = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);

    const { file } = req;

    if (file) {
      const fileFormat = file.mimetype.split("/")[1];

      const { base64 } = bufferToDataURI(fileFormat, file.buffer);

      const imageDetails = await uploadToCloudinary(base64, fileFormat);
      req.body.UrlImagePath = imageDetails.url;
    }

    if (data.password) {
      const hashedPassword = await hashPassword(data.password);

      const newUserUpdate = await User.updateOne(
        { _id: payload._id },
        {
          ...data,
          password: hashedPassword,
        }
      );

      return res.status(200).send(newUserUpdate);
    }

    const newUserUpdate = await User.updateOne(
      { _id: payload._id },
      { ...data }
    );
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

const getMySelf = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);

    const foundUser = await User.findById(payload._id);

    if (!foundUser) return res.status(403).send("Can't find any user");

    return res.status(200).json(foundUser);
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const id = req.params.id;

    const foundUser = await User.deleteOne({ _id: id });

    res.json(foundUser);
  } catch (error) {
    next(error);
  }
};

const updatePasswordForMySelf = async (req, res, next) => {
  try {
    let data = req.body;

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);

    const user = await User.findById(payload._id);

    const checkOldPassword = await checkPassword(
      data.oldPassword,
      user.password
    );

    if (!checkOldPassword) {
      return res.send(400);
    }

    const hashedPassword = await hashPassword(data.newPassword);

    const newUserUpdate = await User.updateOne(
      { _id: payload._id },
      {
        ...data,
        password: hashedPassword,
      }
    );

    return res.status(200).send(newUserUpdate);
  } catch (error) {
    return res.status(500).send("Internal server error");
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
  getMySelf,
  updateAccountForMySelf,
  updatePasswordForMySelf,
  uploadImage: upload.single("image"),
};
