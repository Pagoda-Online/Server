var express = require("express");
var router = express.Router();
const UserController = require("../../controllers/user.controller");
const PostController = require("../../controllers/post.controller");
const EventController = require("../../controllers/event.controller");
const CourseController = require("../../controllers/course.controller");

// ACCOUNTS ROUTERS
router.get("/users/:id", UserController.getUserById);

router.get("/users", UserController.getAllUser);

router.post("/users/create", UserController.createAccount);

router.put("/users/update/:id", UserController.updateAccount);

// POST ROUTERS
router.get("/posts", PostController.getAllPostsForAdmin);

router.get("/posts/:id", PostController.getPost);

router.delete("/posts/delete/:id", PostController.deletePost);

router.put("/posts/edit/:id", PostController.updatePost);

// EVENTS ROUTERS

router.get("/events", EventController.getAllEventsForAdmin);

router.get("/events/:id", EventController.getEvent);

router.delete("/events/delete/:id", EventController.deleteEvent);

router.put("/events/edit/:id", EventController.updateEvent);

//COURSES ROUTERS

router.get("/courses", CourseController.getAllCoursesForAdmin);

router.get("/courses/:id", CourseController.getCourse);

router.post("/courses/create", CourseController.createCourse);

router.delete("/courses/delete/:id", CourseController.deleteCourse);

router.put("/courses/edit/:id", CourseController.updateCourse);

module.exports = router;
