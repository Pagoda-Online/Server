var express = require("express");
var router = express.Router();
const RegisterCourseController = require("../../controllers/registerCourse.controller");

router.get("/", RegisterCourseController.getAllRegisterCourses);

router.get("/:id", RegisterCourseController.checkRegister);

router.post("/", RegisterCourseController.createRegisterCourse);

router.delete("/:id", RegisterCourseController.deleteRegisterCourse);

/**
 * @swagger
 * tags:
 *   name: Course Registration
 *   description: API endpoints for managing course registration
 *
 * /course-registration:
 *   get:
 *     summary: Get all registered courses
 *     tags: [Course Registration]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *
 *   post:
 *     summary: Register for a course
 *     tags: [Course Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserId:
 *                 type: string
 *                 description: ID of the user
 *               idCourse:
 *                 type: string
 *                 description: ID of the course
 *             required:
 *               - UserId
 *               - idCourse
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 * /course-registration/{id}:
 *   get:
 *     summary: Check if a course is registered
 *     tags: [Course Registration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the registered course
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     summary: Unregister from a course
 *     tags: [Course Registration]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the registered course
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
