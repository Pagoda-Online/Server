const EventModel = require("../models/Event");

const findAllEvent = async (UserId) => {
  try {
    const events = await EventModel.find({ UserId: UserId });
    return events;
  } catch (error) {
    console.log(
      "🚀 ~ file: EventRepository.js ~ line 25 ~ findAll ~ error",
      error
    );
  }
};

const getAllEventsForAdmin = async () => {
  try {
    const events = await EventModel.find();
    return events;
  } catch (error) {
    console.log(
      "🚀 ~ file: EventRepository.js ~ line 25 ~ findAll ~ error",
      error
    );
  }
};

const findEventById = async (id) => {
  try {
    const Event = await EventModel.findById(id);
    return Event;
  } catch (error) {
    console.log(
      "🚀 ~ file: EventRepository.js ~ line 33 ~ findEventById ~ error",
      error
    );
  }
};

const createEvent = async (data) => {
  try {
    const Event = await EventModel.create(data);
    return Event;
  } catch (error) {
    console.log(
      "🚀 ~ file: EventRepository.js ~ line 31 ~ createEvent ~ error",
      error
    );
  }
};

const deleteEventById = async (id) => {
  try {
    const Event = await EventModel.deleteMany({ _id: id });
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
    const Event = await EventModel.updateMany(id, data);
    return Event;
  } catch (err) {
    return err;
  }
};

module.exports = {
  findAllEvent,
  findEventById,
  createEvent,
  deleteEventById,
  updateEventById,
  getAllEventsForAdmin,
};
