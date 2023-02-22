var express = require("express");
var router = express.Router();
const CourseController = require("../../controllers/course.controller");
const EventController = require("../../controllers/event.controller");

//COURSES
router.get("/courses", CourseController.getAllCourses);

router.get("/courses/:id", CourseController.getCourse);

router.post("/courses/create", CourseController.createCourse);

router.delete("/courses/delete/:id", CourseController.deleteCourse);

router.put("/courses/edit/:id", CourseController.updateCourse);

//EVENTS

router.get("/events", EventController.getAllEvents);

router.get("/events/:id", EventController.getEvent);

router.post("/events/create", EventController.createEvent);

router.delete("/events/delete/:id", EventController.deleteEvent);

router.put("/events/edit/:id", EventController.updateEvent);

module.exports = router;
