const { hashPassword, checkPassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwt");
const { User, validate } = require("../models/User");
const Otp = require("../models/Otp");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const crypto = require("crypto");
const passwordComplexity = require("joi-password-complexity");

const register = async (req, res) => {
  try {
    let data = req.body;

    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: data.email });

    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const hashedPassword = await hashPassword(data.password);

    const newUser = await User.create({ ...data, password: hashedPassword });

    if (!newUser) return res.status(500).send("Internal server error");

    res.send({
      message:
        "In a few minutes, an email will be sent to your account please verify",
    });

    const otp = await new Otp({
      userId: newUser._id,
      VerificationCode: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.URL_SERVER}auth/${newUser.id}/verify/${otp.VerificationCode}`;
    await sendEmail(newUser.email, "Verify Email", url);

    return res.status(201);
    // .send({ message: "An Email sent to your account please verify" });

    // return res.status(200).send(newUser);
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 19 ~ router.post ~ error", error);
    res.status(500).send({ message: "Internal Server Error" });
    // next(error);
  }
};

const verify = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const otp = await Otp.findOne({
      userId: user._id,
      VerificationCode: req.params.VerificationCode,
    });
    if (!otp) return res.status(400).send({ message: "Invalid link" });

    await user.updateOne({ _id: user._id, isActive: true });
    await otp.remove();

    res.status(200).redirect(`${process.env.BASE_URL}login`);
  } catch (error) {
    res.status(500).send("NOT_FOUND");
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const foundUser = await User.findOne({ email });

    if (!foundUser)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const isValidPassword = await checkPassword(password, foundUser.password);

    if (!isValidPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    if (!foundUser.isActive) {
      const otp = await Otp.findOne({ userId: foundUser._id });
      if (!otp) {
        otp = await new Otp({
          userId: foundUser._id,
          VerificationCode: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${foundUser._id}/verify/${otp.VerificationCode}`;
        await sendEmail(foundUser.email, "Verify Email", url);
      }

      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }

    // const { _id: UserId, email: userEmail, role, fullname } = foundUser;

    // const payload = { _id: UserId, email: userEmail, role, fullname };

    const { _id: UserId } = foundUser;

    const payload = { _id: UserId };

    const token = await createToken(payload);

    // res.cookie("token", token, {
    //   httpOnly: true,
    // });

    return res
      .status(200)
      .send({ data: token, message: "logged in successfully" });
  } catch (error) {
    console.log("🚀 ~ file: auth.controller.js:109 ~ login ~ error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    const { error } = emailSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });

    res.send({
      message:
        "Within minutes, a reset password link is sent to your email account",
    });

    let otp = await Otp.findOne({ userId: user._id });

    if (!otp) {
      otp = await new Otp({
        userId: user._id,
        VerificationCode: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const url = `${process.env.BASE_URL}reset-password/${user._id}/${otp.VerificationCode}/`;
    await sendEmail(user.email, "Password Reset", url);

    return res.status(200);
  } catch (error) {
    console.log(
      "🚀 ~ file: auth.controller.js:142 ~ resetPassword ~ error:",
      error
    );
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const resetPasswordVerification = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const otp = await Otp.findOne({
      userId: user._id,
      VerificationCode: req.params.VerificationCode,
    });
    if (!otp) return res.status(400).send({ message: "Invalid link" });

    return res.status(200).send("Valid Url");
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const setNewPassword = async (req, res) => {
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const otp = await Otp.findOne({
      userId: user._id,
      VerificationCode: req.params.VerificationCode,
    });
    if (!otp) return res.status(400).send({ message: "Invalid link" });

    if (!user.verified) user.verified = true;

    const hashedPassword = await hashPassword(req.body.password);

    user.password = hashedPassword;
    await user.save();
    await otp.remove();

    return res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = {
  register,
  login,
  verify,
  resetPassword,
  resetPasswordVerification,
  setNewPassword,
};
