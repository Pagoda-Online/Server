var express = require("express");
var router = express.Router();
const CourseController = require("../../controllers/course.controller");
const EventController = require("../../controllers/event.controller");
const { upload } = require("../../services/upload.service");
//COURSES
router.get("/courses", CourseController.getAllCourses);

router.get("/courses/:id", CourseController.getCourse);

router.post("/courses", upload.single("image"), CourseController.createCourse);

router.delete("/courses/:id", CourseController.deleteCourse);

// router.put(
//   "/courses/:id",
//   upload.single("image"),
//   CourseController.updateCourse
// );

router.put("/courses/:id", CourseController.updateCourse);

//EVENTS

router.get("/events", EventController.getAllEvents);

router.get("/events/:id", EventController.getEvent);

router.post("/events", upload.single("image"), EventController.createEvent);

router.delete("/events/:id", EventController.deleteEvent);

// router.put("/events/:id", upload.single("image"), EventController.updateEvent);
router.put("/events/:id", EventController.updateEvent);
module.exports = router;
