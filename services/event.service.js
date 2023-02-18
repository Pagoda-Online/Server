const EventRepository = require("../repository/event.repository");

const getAllEvents = async (options) => {
  try {
    const Event = await EventRepository.findAllEvent(options);
    return Event;
  } catch (error) {
    console.log(
      "🚀 ~ file: Eventervices.js ~ line 25 ~ getAllEvent ~ error",
      error
    );
  }
};

const getEventById = async (id) => {
  try {
    const Event = await EventRepository.findEventById(id);
    return Event;
  } catch (error) {
    console.log(
      "🚀 ~ file: Eventervices.js ~ line 33 ~ getEventById ~ error",
      error
    );
  }
};

const createEvent = async (data) => {
  try {
    const Event = await EventRepository.createEvent(data);
    return Event;
  } catch (error) {
    console.log(
      "🚀 ~ file: Eventervices.js ~ line 32 ~ createEvent ~ error",
      error
    );
  }
};

const deleteEventById = async (id) => {
  try {
    const Event = await EventRepository.deleteEventById(id);
    return Event;
  } catch (error) {
    console.log(
      "🚀 ~ file: EventRepository.js ~ line 33 ~ findEventById ~ error",
      error
    );
  }
};

const updateEventById = async (id, data) => {
  try {
    const Event = await EventRepository.updateEventById(id, data);
    return Event;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  deleteEventById,
  updateEventById,
};
