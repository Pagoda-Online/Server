var express = require("express");
var router = express.Router();
const CourseController = require("../../controllers/notification.controller");

//COURSES
router.get("/", CourseController.getNotification);

router.put("/", CourseController.readAll);

router.put("/:id", CourseController.readById);

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: API endpoints for managing notifications
 *
 * /notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Notification]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *
 * /notifications/{id}:
 *   put:
 *     summary: Mark a notification as read by ID
 *     tags: [Notification]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the notification
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
