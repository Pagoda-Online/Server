const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    console.log("🚀 ~ file: jwt.js ~ line 7 ~ createToken ~ error", error);
    return error;
  }
};

module.exports = {
  createToken,
};
