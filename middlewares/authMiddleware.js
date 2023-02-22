const jwt = require("jsonwebtoken");
const { ADMIN_ROLE, STAFF_ROLE } = require("../constansts/role");
const { decodeToken } = require("../utils/jwt");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.access_token || req.headers.access_token;

    if (!token) return res.status(400).send("Haven't logged in yet !!!");

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
    const token = req.cookies.access_token || req.headers.access_token;
    const payload = decodeToken(token);

    if (payload.role != ADMIN_ROLE)
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
    const token = req.cookies.access_token || req.headers.access_token;
    const payload = decodeToken(token);

    if (payload.role != STAFF_ROLE)
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
