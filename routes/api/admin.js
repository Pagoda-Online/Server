var express = require("express");
var router = express.Router();
const UserController = require("../../controllers/user.controller");
const PostController = require("../../controllers/post.controller");
const EventController = require("../../controllers/event.controller");
const CourseController = require("../../controllers/course.controller");
const { upload } = require("../../services/upload.service");

// ACCOUNTS ROUTERS
router.get("/users/:id", UserController.getUserById);

router.get("/users", UserController.getAllUser);

router.put("/users/:id", UserController.updateAccount);

router.delete("/users/:id", UserController.deleteAccount);

router.post("/users/email", UserController.sendMail);

router.put("/users/activation/:id", UserController.activeAccount);

router.put("/users/deactivation/:id", UserController.inactiveAccount);

router.post("/users/email", UserController.sendMail);

// POST ROUTERS
router.get("/posts", PostController.getAllPostsForAdmin);

// router.post("/posts", upload.single("image"), PostController.createPostAdmin);

router.get("/posts/:id", PostController.getPost);

router.delete("/posts/:id", PostController.deletePost);

router.put("/posts/:id", upload.single("image"), PostController.updatePost);

// EVENTS ROUTERS

router.get("/events", EventController.getAllEventsForAdmin);

router.get("/events/:id", EventController.getEvent);

router.delete("/events/:id", EventController.deleteEvent);

router.put("/events/:id", upload.single("image"), EventController.updateEvent);

//COURSES ROUTERS

router.get("/courses", CourseController.getAllCoursesForAdmin);

router.get("/courses/:id", CourseController.getCourse);

router.post("/courses", upload.single("image"), CourseController.createCourse);

router.delete("/courses/:id", CourseController.deleteCourse);

router.put(
  "/courses/:id",
  upload.single("image"),
  CourseController.updateCourse
);

module.exports = router;
