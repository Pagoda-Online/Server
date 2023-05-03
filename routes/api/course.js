var express = require("express");
var router = express.Router();
const CourseController = require("../../controllers/course.controller");

//COURSES
router.get("/", CourseController.getAllRegisteredCourse);

router.get("/:UserId", CourseController.getAllCoursesByUserId);

router.get("/idCourse/:id", CourseController.getCourse);
/**
 * @swagger
 * tags:
 *   name: Course
 *   description: API endpoints for managing courses
 *
 * /courses:
 *   get:
 *     summary: Get all registered courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *
 * /courses/{UserId}:
 *   get:
 *     summary: Get all courses by User ID
 *     tags: [Course]
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
 * /courses/idCourse/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
