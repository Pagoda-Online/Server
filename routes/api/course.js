var express = require("express");
var router = express.Router();
const CourseController = require("../../controllers/staff/course.controller");
// const { isLoggedIn } = require("../../middlewares/authMiddleware");
/**
 * @swagger
 * /api/Courses:
 *   get:
 *     tags:
 *       - Course
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Courses.
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

router.get("/", CourseController.getAllCourses);

/**
 * @swagger
 * /api/Course/:id:
 *   get:
 *     tags:
 *       - Course
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Courses.
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

router.get("/:id", CourseController.getCourse);

router.post("/create", CourseController.createCourse);

router.delete("/delete/:id", CourseController.deleteCourse);

router.put("/edit/:id", CourseController.updateCourse);

module.exports = router;
