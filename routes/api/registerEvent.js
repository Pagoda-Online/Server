var express = require("express");
var router = express.Router();
const RegisterEventController = require("../../controllers/registerEvent.controller");
// const { isLoggedIn } = require("../../middlewares/authMiddleware");
// const { canDeleteRegisterEvent } = require("../../permissions/RegisterEvent");
/**
 * @swagger
 * /api/RegisterEvents:
 *   get:
 *     tags:
 *       - RegisterEvent
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of RegisterEvents.
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

router.get("/", RegisterEventController.getAllRegisterEvents);

/**
 * @swagger
 * /api/RegisterEvent/:id:
 *   get:
 *     tags:
 *       - RegisterEvent
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of RegisterEvents.
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

router.get("/:id", RegisterEventController.getRegisterEvent);

router.post("/", RegisterEventController.createRegisterEvent);

router.delete("/:id", RegisterEventController.deleteRegisterEvent);

// router.put("/edit/:id", RegisterEventController.updateRegisterEvent);

module.exports = router;
