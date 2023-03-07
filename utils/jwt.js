const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16);

const createToken = (payload) => {
  try {
    // Kiểm tra độ dài của SECRET_KEY
    if (process.env.SECRET_KEY.length !== 32) {
      throw new Error("SECRET_KEY phải có độ dài 32 byte");
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });
    return token;
  } catch (error) {
    console.log("🚀 ~ file: jwt.js:21 ~ createToken ~ error:", error);
    return error;
  }
};

const decodeToken = (token) => {
  try {
    if (!token) {
      return res.send("Don't have access token");
    }

    // const tokenVerified = await jwt.verify(token, process.env.SECRET_KEY);

    // if (!tokenVerified) return res.status(400).send("token is not valid !!!");

    const decoded = jwt.decode(token, { complete: true });
    // const iv = decoded.payload.iv;
    // const encryptedPayload = decoded.payload.data;
    // const decryptedPayload = decryptPayload(encryptedPayload, iv);
    // const payload = JSON.parse(decryptedPayload);
    const payload = decoded.payload;
    return payload;
  } catch (error) {
    console.log("Error decoding token:", error);
    return null;
  }
};

module.exports = {
  createToken,
  decodeToken,
};
