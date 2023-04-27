var express = require("express");
var router = express.Router();
const PostController = require("../../controllers/post.controller");
const { upload } = require("../../services/upload.service");

router.get("/", PostController.getAllPosts);

router.get("/all-follower", PostController.getAllPostsOfFollower);

router.get("/allPost/:UserId", PostController.getAllPostsByUserId);

router.get("/:id", PostController.getPost);

router.post("/", upload.single("image"), PostController.createPost);

router.delete("/:id", PostController.deletePost);

router.put("/", upload.single("image"), PostController.updatePost);

router.post("/:id/like", PostController.like);

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: API for managing posts
 */

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error

 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               UserId:
 *                 type: string
 *                 description: ID of the user creating the post
 *               PostDesc:
 *                 type: string
 *                 description: Description of the post
 *           required:
 *             - UserId
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error

 * /post/all-follower:
 *   get:
 *     summary: Get all posts of followers
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error

 * /post/allPost/{UserId}:
 *   get:
 *     summary: Get all posts by user ID
 *     tags: [Post]
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

 * /post/{id}:
 *   get:
 *     summary: Get details of a specific post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error

 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error

 *   put:
 *     summary: Update a post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               PostId:
 *                 type: string
 *                 description: ID of the post
 *               UserId:
 *                 type: string
 *                 description: ID of the user who owns the post
 *               PostDesc:
 *                 type: string
 *                 description: Description of the post
 *           required:
 *             - PostId
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error

 * /post/{id}/like:
 *   post:
 *     summary: Like/Unlike a post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isLike:
 *                 type: boolean
 *                 description: Boolean indicating whether to like or unlike the post
 *           required:
 *             - isLike
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
