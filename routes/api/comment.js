var express = require("express");
var router = express.Router();
const CommentController = require("../../controllers/comment.controller");
// const { isLoggedIn } = require("../../middlewares/authMiddleware");
// const { canDeleteComment } = require("../../permissions/Comment");
/**
 * @swagger
 * /api/Comments:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Comments.
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

router.get("/", CommentController.getAllComments);

/**
 * @swagger
 * /api/Comment/:id:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Comments.
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

router.get("/:id", CommentController.getComment);

router.post("/create", CommentController.createComment);

router.delete("/delete/:id", CommentController.deleteComment);

router.put("/edit/:id", CommentController.updateComment);

module.exports = router;
