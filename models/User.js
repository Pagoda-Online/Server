const mongoose = require("mongoose");
const { ADMIN_ROLE, USER_ROLE, STAFF_ROLE } = require("../constansts/role");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    address: String,
    phoneNumber: String,
    password: String,
    fullname: String,
    UrlImagePath: { type: String, default: "null" },
    isRequestChangeRole: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    role: {
      type: String,
      enum: [USER_ROLE, ADMIN_ROLE, STAFF_ROLE],
      default: USER_ROLE,
    },
  },
  { timestamps: true }
);

// tạo model
const User = mongoose.model("User", UserSchema);

const validate = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().label("Full Name"),
    address: Joi.string().label("Address"),
    role: Joi.string().label("Role"),
    phoneNumber: Joi.string()
      .regex(/^(0\d{9,10})$/)
      .label("Phone Number"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
