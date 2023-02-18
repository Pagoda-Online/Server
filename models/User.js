const mongoose = require("mongoose");
const { ADMIN_ROLE, USER_ROLE, STAFF_ROLE } = require("../constansts/role");

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

module.exports = User;
