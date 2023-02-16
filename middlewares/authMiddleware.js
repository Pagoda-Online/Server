const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.access_token || req.headers.access_token;
    console.log(
      "🚀 ~ file: authMiddleware.js ~ line 6 ~ isLoggedIn ~ token",
      token
    );

    if (!token) return res.status(400).send("Haven't logged in yet !!!");

    const { email, role, fullname } = await jwt.verify(
      token,
      process.env.SECRET_KEY
    );

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

module.exports = {
  isLoggedIn,
};
