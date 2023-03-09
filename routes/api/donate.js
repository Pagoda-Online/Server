var express = require("express");
var router = express.Router();
const DonateController = require("../../controllers/donate.controller");
// const { isLoggedIn } = require("../../middlewares/authMiddleware");
// const { canDeleteDonate } = require("../../permissions/Donate");
/**
 * @swagger
 * /api/Donates:
 *   get:
 *     tags:
 *       - Donate
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Donates.
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

router.get("/", DonateController.getAllDonates);

/**
 * @swagger
 * /api/Donate/:id:
 *   get:
 *     tags:
 *       - Donate
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of Donates.
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

router.get("/received", DonateController.getAllDonatesReceive);

router.post("/", DonateController.createDonate);

router.get("/:id", DonateController.getDonate);

module.exports = router;
