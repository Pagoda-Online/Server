var express = require("express");
var router = express.Router();
const CourseController = require("../../controllers/notification.controller");

//COURSES
router.get("/", CourseController.getNotification);

router.put("/", CourseController.readAll);

router.put("/:id", CourseController.readById);

module.exports = router;
