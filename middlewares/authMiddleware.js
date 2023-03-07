const jwt = require("jsonwebtoken");
const { ADMIN_ROLE, STAFF_ROLE } = require("../constansts/role");
const { decodeToken } = require("../utils/jwt");
const { User } = require("../models/User");

const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(400).send("Haven't logged in yet !!!");

    const tokenVerified = await jwt.verify(token, process.env.SECRET_KEY);

    if (!tokenVerified) return res.status(400).send("token is not valid !!!");

    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: authMiddleware.js ~ line 14 ~ isLoggedIn ~ error",
      error
    );

    return res.sendStatus(500);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    const tokenVerified = await jwt.verify(token, process.env.SECRET_KEY);

    if (!tokenVerified) return res.status(400).send("token is not valid !!!");

    const payload = decodeToken(token);

    const data = await User.findOne({ _id: payload._id });

    if (!data) return res.status(400).send("user is not exist !!!");

    if (data.role != ADMIN_ROLE)
      return res.status(400).send("You are not Admin !!!");

    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: authMiddleware.js ~ line 14 ~ isLoggedIn ~ error",
      error
    );

    return res.sendStatus(500);
  }
};

const isStaff = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    const tokenVerified = await jwt.verify(token, process.env.SECRET_KEY);

    if (!tokenVerified) return res.status(400).send("token is not valid !!!");

    const payload = decodeToken(token);

    const data = await User.findOne({ _id: payload._id });

    if (!data) return res.status(400).send("user is not exist !!!");

    if (data.role != STAFF_ROLE)
      return res.status(400).send("You are not Staff !!!");

    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: authMiddleware.js ~ line 14 ~ isLoggedIn ~ error",
      error
    );

    return res.sendStatus(500);
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
  isStaff,
};
