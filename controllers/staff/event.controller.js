const EventServices = require("../../services/event.service");

const getAllEvents = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const Events = await EventServices.getAllEvents({ page, limit });
  res.send(Events);
};

const getEvent = async (req, res, next) => {
  const id = req.params.id;

  const Event = await EventServices.getEventById(id);

  if (!Event) res.sendStatus(400);

  console.log("🚀 ~ file: Event.js ~ line 16 ~ Event", Event);

  res.send(Event);
};

const createEvent = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const Event = await EventServices.createEvent(req.body);

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

    const Event = await EventServices.deleteEventById(req.params.id);

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

    const Event = await EventServices.updateEventById(
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
};
