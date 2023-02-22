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

    // Mã hóa payload bằng thuật toán AES-256-CBC
    const cipher = crypto.createCipheriv(algorithm, process.env.SECRET_KEY, iv);
    let encryptedPayload = cipher.update(
      JSON.stringify(payload),
      "utf8",
      "hex"
    );
    encryptedPayload += cipher.final("hex");

    // Tạo phần payload của JWT
    const payloadJwt = { data: encryptedPayload, iv: iv.toString("hex") };

    const token = jwt.sign(payloadJwt, process.env.SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });

    return token;
  } catch (error) {
    console.log("🚀 ~ file: jwt.js:21 ~ createToken ~ error:", error);
    return error;
  }
};

const decryptPayload = (encryptedPayload, iv) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.SECRET_KEY,
    Buffer.from(iv, "hex")
  );
  let decryptedPayload = decipher.update(encryptedPayload, "hex", "utf8");
  decryptedPayload += decipher.final("utf8");
  return decryptedPayload;
};

const decodeToken = (token) => {
  try {
    if (!token) {
      return res.send("Don't have access token");
    }
    const decoded = jwt.decode(token, { complete: true });
    const iv = decoded.payload.iv;
    const encryptedPayload = decoded.payload.data;
    const decryptedPayload = decryptPayload(encryptedPayload, iv);
    const payload = JSON.parse(decryptedPayload);
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
