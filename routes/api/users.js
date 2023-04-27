var express = require("express");
var router = express.Router();
const UserController = require("../../controllers/user.controller");
const { upload } = require("../../services/upload.service");

router.get("/:id", UserController.getUserById);

router.get("/my-self/infor", UserController.getMySelf);

router.put(
  "/my-self/infor",
  upload.single("image"),
  UserController.updateAccountForMySelf
);

router.put("/my-self/infor/password", UserController.updatePasswordForMySelf);

router.get("/", UserController.getAllUser);

module.exports = router;
