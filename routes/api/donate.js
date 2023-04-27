var express = require("express");
var router = express.Router();
const DonateController = require("../../controllers/donate.controller");

router.get("/", DonateController.getAllDonates);

router.get("/donateHistoryReceived", DonateController.getAllDonatesReceive);

router.get("/donateHistorySended", DonateController.getAllDonatesSend);

router.get("/donateStatisticsReceived", DonateController.getStatisticsReceive);

router.get("/donateStatisticsSended", DonateController.getStatisticsSend);

router.post("/:userReceive", DonateController.createDonate);

router.get("/:id", DonateController.getDonate);

/**
 * @swagger
 * tags:
 *   name: Donates
 *   description: API for managing donation transactions
 */

/**
 * @swagger
 * /donates:
 *   get:
 *     summary: Get all donation transactions
 *     tags: [Donates]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error

 *   post:
 *     summary: Create a new donation transaction
 *     tags: [Donates]
 *     parameters:
 *       - in: path
 *         name: userReceive
 *         required: true
 *         schema:
 *           type: string
 *         description: The user who will receive the donation
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             UserId:
 *               type: string
 *               description: ID of the user making the donation
 *             paymentId:
 *               type: string
 *               description: ID of the payment for the donation
 *             Amount:
 *               type: number
 *               description: Amount of the donation
 *             Description:
 *               type: string
 *               description: Description of the donation
 *           required:
 *             - UserId
 *             - paymentId
 *             - Amount
 *             - Description
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error

 * /donates/donateHistoryReceived:
 *   get:
 *     summary: Get all donation transactions received by the user
 *     tags: [Donates]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error

 * /donates/donateHistorySended:
 *   get:
 *     summary: Get all donation transactions sent by the user
 *     tags: [Donates]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error

 * /donates/donateStatisticsReceived:
 *   get:
 *     summary: Get statistics of donation transactions received by the user
 *     tags: [Donates]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error

 * /donates/donateStatisticsSended:
 *   get:
 *     summary: Get statistics of donation transactions sent by the user
 *     tags: [Donates]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error

 * /donates/{id}:
 *   get:
 *     summary: Get details of a specific donation transaction
 *     tags: [Donates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the donation transaction
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

module.exports = router;
