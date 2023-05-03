var express = require("express");
var router = express.Router();
const CourseController = require("../../controllers/course.controller");
const EventController = require("../../controllers/event.controller");
const { upload } = require("../../services/upload.service");

//EVENTS
router.get("/", EventController.getAllRegisteredEvent);

router.get("/:UserId", EventController.getAllEventsByUserId);

router.get("/idEvent/:id", EventController.getEvent);
/**
 * @swagger
 * tags:
 *   name: Event
 *   description: API endpoints for managing events
 *
 * /events:
 *   get:
 *     summary: Get all registered events
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *
 * /events/{UserId}:
 *   get:
 *     summary: Get all events by User ID
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: UserId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 * /events/idEvent/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
