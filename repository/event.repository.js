const EventModel = require("../models/Event");
const RegisterEventModel = require("../models/RegisterEvent");

const findAllEvent = async (UserId) => {
  try {
    const events = await EventModel.find({ UserId: UserId }).populate("UserId");
    return events;
  } catch (error) {
    return error;
  }
};

const findAllRegisteredEvent = async (UserId) => {
  try {
    const events = await RegisterEventModel.find({
      UserId: UserId,
    }).populate("idEvent");
    return events;
  } catch (error) {
    return error;
  }
};

const getAllEventsForAdmin = async () => {
  try {
    const events = await EventModel.find().populate("UserId");
    return events;
  } catch (error) {
    return error;
  }
};

const findEventById = async (id) => {
  try {
    const Event = await EventModel.findById(id);
    return Event;
  } catch (error) {
    return error;
  }
};

const createEvent = async (data) => {
  try {
    const Event = await EventModel.create(data);
    return Event;
  } catch (error) {
    return error;
  }
};

const deleteEventById = async (id) => {
  try {
    const Event = await EventModel.deleteMany({ _id: id });
    return Event;
  } catch (error) {
    return error;
  }
};

const updateEventById = async (id, data) => {
  try {
    const Event = await EventModel.findOneAndUpdate(id, data, {
      new: true,
    });
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
  findAllRegisteredEvent,
};
