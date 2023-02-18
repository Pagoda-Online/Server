var express = require("express");
var router = express.Router();
const RegisterCourseController = require("../../controllers/registerCourse.controller");
// const { isLoggedIn } = require("../../middlewares/authMiddleware");
// const { canDeleteRegisterCourse } = require("../../permissions/RegisterCourse");
/**
 * @swagger
 * /api/RegisterCourses:
 *   get:
 *     tags:
 *       - RegisterCourse
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of RegisterCourses.
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

router.get("/", RegisterCourseController.getAllRegisterCourses);

/**
 * @swagger
 * /api/RegisterCourse/:id:
 *   get:
 *     tags:
 *       - RegisterCourse
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of RegisterCourses.
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

router.get("/:id", RegisterCourseController.getRegisterCourse);

router.post("/create", RegisterCourseController.createRegisterCourse);

router.delete("/delete/:id", RegisterCourseController.deleteRegisterCourse);

// router.put("/edit/:id", RegisterCourseController.updateRegisterCourse);

module.exports = router;
