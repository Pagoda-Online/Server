var express = require("express");
var router = express.Router();

const {
  register,
  login,
  verify,
  resetPassword,
  resetPasswordVerification,
  setNewPassword,
} = require("../../controllers/auth.controller");

/* GET home page. */
router.post("/register", register);

router.get("/:id/verify/:VerificationCode", verify);

//send password reset link
router.post("/forgot-password", resetPassword);
// verify password reset link
router.get("/reset-password/:id/:VerificationCode", resetPasswordVerification);
//  set new password
router.post("/reset-password/:id/:VerificationCode", setNewPassword);

router.post("/login", login);

module.exports = router;
