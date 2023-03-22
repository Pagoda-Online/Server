var express = require("express");
var router = express.Router();
const CourseController = require("../../controllers/course.controller");

//COURSES
router.get("/", CourseController.getAllRegisteredCourse);

router.get("/:UserId", CourseController.getAllCoursesByUserId);

router.get("/idCourse/:id", CourseController.getCourse);

module.exports = router;
