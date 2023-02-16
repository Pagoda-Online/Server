var express = require("express");
var router = express.Router();
const UserController = require("../../controllers/userController");

/* GET users listing. */
router.get("/:id", UserController.getUserById);

/* GET user listing. */
router.get("/", UserController.getAllUser);

module.exports = router;
