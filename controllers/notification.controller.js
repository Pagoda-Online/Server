const { decodeToken } = require("../utils/jwt");
const NotificationRepository = require("../repository/notification.repository");

const getNotification = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    const UserId = payload._id;

    const notification = await NotificationRepository.getAllNotificationsByUser(
      UserId
    );

    return res.json(notification);
  } catch (error) {
    return res.status(500);
  }
};

const readById = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    // const UserId = payload._id;
    const { id } = req.params;

    const readById = await NotificationRepository.readByIdNotificationsByUser(
      id
    );

    return res.json(readById);
  } catch (error) {
    return res.status(500);
  }
};

const readAll = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    const UserId = payload._id;
    // const UserId = "6403990fbb75a53ed142763a";

    const readAll = await NotificationRepository.readAllNotificationsByUser(
      UserId
    );

    return res.json(readAll);
  } catch (error) {
    return res.status(500);
  }
};

module.exports = { getNotification, readAll, readById };
