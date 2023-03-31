var express = require("express");
var router = express.Router();
const PostController = require("../../controllers/post.controller");
const { upload } = require("../../services/upload.service");
// const { isLoggedIn } = require("../../middlewares/authMiddleware");
// const { canDeletePost } = require("../../permissions/Post");
/**
 * @swagger
 * /api/Posts:
 *   get:
 *     tags:
 *       - Post
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Posts.
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

router.get("/", PostController.getAllPosts);

router.get("/all-follower", PostController.getAllPostsOfFollower);

router.get("/allPost/:UserId", PostController.getAllPostsByUserId);
/**
 * @swagger
 * /api/Post/:id:
 *   get:
 *     tags:
 *       - Post
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Posts.
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

router.get("/:id", PostController.getPost);

router.post("/", upload.single("image"), PostController.createPost);

router.delete("/:id", PostController.deletePost);

router.put("/", upload.single("image"), PostController.updatePost);

router.post("/:id/like", PostController.like);

module.exports = router;
