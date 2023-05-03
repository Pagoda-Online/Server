var express = require("express");
var router = express.Router();
const CommentController = require("../../controllers/comment.controller");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", CommentController.getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *         example: 12345
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Comment not found
 */
router.get("/:id", CommentController.getComment);

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserId:
 *                 type: string
 *                 description: ID of the user who posted the comment
 *                 example: 12345
 *               PostId:
 *                 type: string
 *                 description: ID of the post the comment belongs to
 *                 example: 67890
 *               Content:
 *                 type: string
 *                 description: Content of the comment
 *                 example: "Great post!"
 *             required:
 *               - UserId
 *               - PostId
 *               - Content
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", CommentController.createComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *         example: 12345
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */

router.delete("/:id", CommentController.deleteComment);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment ID
 *         schema:
 *           type: string
 *         example: 12345
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Content:
 *                 type: string
 *                 description: Updated content of the comment
 *                 example: "Awesome post!"
 *             required:
 *               - Content
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 */
router.put("/:id", CommentController.updateComment);

module.exports = router;
