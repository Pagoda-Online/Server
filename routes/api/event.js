var express = require("express");
var router = express.Router();
const EventController = require("../../controllers/staff/event.controller");
// const { isLoggedIn } = require("../../middlewares/authMiddleware");
// const { canDeleteEvent } = require("../../permissions/Event");
/**
 * @swagger
 * /api/Events:
 *   get:
 *     tags:
 *       - Event
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  title:
 *                    type: string
 *                  price:
 *                    type: number
 */

router.get("/", EventController.getAllEvents);

/**
 * @swagger
 * /api/Event/:id:
 *   get:
 *     tags:
 *       - Event
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  title:
 *                    type: string
 *                  price:
 *                    type: number
 */

router.get("/:id", EventController.getEvent);

router.post("/create", EventController.createEvent);

router.delete("/delete/:id", EventController.deleteEvent);

router.put("/edit/:id", EventController.updateEvent);

module.exports = router;
