const jwt = require("jsonwebtoken");
const { ADMIN_ROLE, USER_ROLE, STAFF_ROLE } = require("../constansts/role");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.access_token || req.headers.access_token;
    console.log(
      "🚀 ~ file: authMiddleware.js ~ line 6 ~ isLoggedIn ~ token",
      token
    );

    if (!token) return res.status(400).send("Haven't logged in yet !!!");

    const { _id, email, role, fullname } = await jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    req._id = _id;
    req.email = email;
    req.role = role;
    req.fullname = fullname;

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

    const { email, role, fullname } = await jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    if (role != ADMIN_ROLE)
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

    const { email, role, fullname } = await jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    if (role != STAFF_ROLE)
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
