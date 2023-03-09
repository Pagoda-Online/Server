var express = require("express");
var router = express.Router();
const FollowerController = require("../../controllers/follower.controller");
// const { isLoggedIn } = require("../../middlewares/authMiddleware");
// const { canDeleteFollower } = require("../../permissions/Follower");
/**
 * @swagger
 * /api/Followers:
 *   get:
 *     tags:
 *       - Follower
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Followers.
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

router.get("/", FollowerController.getAllFollowing);

/**
 * @swagger
 * /api/Follower/:id:
 *   get:
 *     tags:
 *       - Follower
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Followers.
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

router.get("/followed", FollowerController.getAllFollowers);

router.get("/:id", FollowerController.getFollower);

router.post("/", FollowerController.createFollower);

router.delete("/:id", FollowerController.deleteFollower);

router.put("/:id", FollowerController.updateFollower);

module.exports = router;
