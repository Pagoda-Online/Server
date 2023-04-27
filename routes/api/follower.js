var express = require("express");
var router = express.Router();
const FollowerController = require("../../controllers/follower.controller");

router.get("/", FollowerController.getAllFollowing);

router.get("/followed", FollowerController.getAllFollowers);

router.get("/:id", FollowerController.getFollower);

router.post("/", FollowerController.createFollower);

router.delete("/:id", FollowerController.deleteFollower);

router.put("/:id", FollowerController.updateFollower);
/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: API for managing user followers
 */

/**
 * @swagger
 * /follow:
 *   get:
 *     summary: Get all users being followed
 *     tags: [Follow]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *
 *   post:
 *     summary: Create a new follower relationship
 *     tags: [Follow]
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userFollowing_id:
 *               type: string
 *               description: ID of the user who is following
 *             userFollowed_id:
 *               type: string
 *               description: ID of the user who is being followed
 *           required:
 *             - userFollowing_id
 *             - userFollowed_id
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 *
 * /follow/followed:
 *   get:
 *     summary: Get all users who are following the current user
 *     tags: [Follow]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 *
 * /follow/{id}:
 *   get:
 *     summary: Get details of a specific follower relationship
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the follower relationship
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     summary: Delete a follower relationship
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the follower relationship
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 *   put:
 *     summary: Update a follower relationship
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the follower relationship
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userFollowing_id:
 *               type: string
 *               description: ID of the user who is following
 *             userFollowed_id:
 *               type: string
 *               description: ID of the user who is being followed
 *           required:
 *             - userFollowing_id
 *             - userFollowed_id
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
