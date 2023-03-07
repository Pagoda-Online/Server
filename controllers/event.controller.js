const EventRepository = require("../repository/event.repository");
const { decodeToken } = require("../utils/jwt");

const getAllEvents = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);
  const Events = await EventRepository.getAllEvents(payload._id);
  res.send(Events);
};

const getAllEventsForAdmin = async (req, res, next) => {
  const Events = await EventRepository.getAllEventsForAdmin();
  res.send(Events);
};

const getEvent = async (req, res, next) => {
  const id = req.params.id;

  const Event = await EventRepository.getEventById(id);

  if (!Event) res.sendStatus(400);

  console.log("🚀 ~ file: Event.js ~ line 16 ~ Event", Event);

  res.send(Event);
};

const createEvent = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    const Event = await EventRepository.createEvent(req.body);

    if (!Event) return res.sendStatus(500);

    return res.status(200).send(Event);
  } catch (error) {
    console.log(
      "🚀 ~ file: EventController.js ~ line 32 ~ createEvent ~ error",
      error
    );
    res.sendStatus(500);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    // DELETE : req.params, req.query
    if (!req.params.id) return res.sendStatus(400);

    const Event = await EventRepository.deleteEventById(req.params.id);

    if (!Event) return res.sendStatus(500);

    return res.status(200).send(Event);
  } catch (error) {
    console.log(
      "🚀 ~ file: Event.controller.js:52 ~ deleteEvent ~ error",
      error
    );

    res.sendStatus(500);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    // UPDATE : req.params, req.query
    if (!req.params.id && req.body) return res.sendStatus(400);

    const Event = await EventRepository.updateEventById(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (!Event) return res.sendStatus(500);

    return res.status(200).send(Event);
  } catch (error) {
    console.log(
      "🚀 ~ file: Event.controller.js:75 ~ updateEvent ~ error",
      error
    );

    res.sendStatus(500);
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent,
  getAllEventsForAdmin,
};
