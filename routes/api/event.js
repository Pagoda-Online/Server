var express = require("express");
var router = express.Router();
const CourseController = require("../../controllers/course.controller");
const EventController = require("../../controllers/event.controller");
const { upload } = require("../../services/upload.service");

//EVENTS
router.get("/", EventController.getAllRegisteredEvent);

router.get("/:UserId", EventController.getAllEventsByUserId);

router.get("/idEvent/:id", EventController.getEvent);

module.exports = router;
