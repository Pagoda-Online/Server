var express = require("express");
var router = express.Router();
const RegisterEventController = require("../../controllers/registerEvent.controller");

router.get("/", RegisterEventController.getAllRegisterEvents);

router.get("/:id", RegisterEventController.checkRegister);

router.post("/", RegisterEventController.createRegisterEvent);

router.delete("/:id", RegisterEventController.deleteRegisterEvent);

/**
 * @swagger
 * tags:
 *   name: EventRegistration
 *   description: API endpoints for managing event registrations
 *
 * /event-registration:
 *   get:
 *     summary: Get all event registrations
 *     tags: [EventRegistration]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *
 *   post:
 *     summary: Create an event registration
 *     tags: [EventRegistration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserId:
 *                 type: string
 *                 description: ID of the user registering for the event
 *               idEvent:
 *                 type: string
 *                 description: ID of the event being registered
 *             required:
 *               - UserId
 *               - idEvent
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 * /event-registration/{id}:
 *   get:
 *     summary: Check if a user is registered for an event
 *     tags: [EventRegistration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event registration
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     summary: Delete an event registration
 *     tags: [EventRegistration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the event registration
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
