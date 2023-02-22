const RegisterEventServices = require("../services/registerEvent.service");
const { decodeToken } = require("../utils/jwt");

const getAllRegisterEvents = async (req, res, next) => {
  const token = req.cookies.access_token || req.headers.access_token;
  const payload = decodeToken(token);

  const RegisterEvents = await RegisterEventServices.getAllRegisterEvents(
    payload._id
  );
  res.send(RegisterEvents);
};

const getRegisterEvent = async (req, res, next) => {
  const id = req.params.id;

  const RegisterEvent = await RegisterEventServices.getRegisterEventById(id);

  if (!RegisterEvent) res.sendStatus(400);

  console.log(
    "🚀 ~ file: RegisterEvent.js ~ line 16 ~ RegisterEvent",
    RegisterEvent
  );

  res.send(RegisterEvent);
};

const createRegisterEvent = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const token = req.cookies.access_token || req.headers.access_token;
    const payload = decodeToken(token);
    req.body.UserId = payload._id;
    const RegisterEvent = await RegisterEventServices.createRegisterEvent(
      req.body
    );

    if (!RegisterEvent) return res.sendStatus(500);

    return res.status(200).send(RegisterEvent);
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterEventController.js ~ line 32 ~ createRegisterEvent ~ error",
      error
    );
    res.sendStatus(500);
  }
};

const deleteRegisterEvent = async (req, res, next) => {
  try {
    // DELETE : req.params, req.query
    if (!req.params.id) return res.sendStatus(400);

    const RegisterEvent = await RegisterEventServices.deleteRegisterEventById(
      req.params.id
    );

    if (!RegisterEvent) return res.sendStatus(500);

    return res.status(200).send(RegisterEvent);
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterEvent.controller.js:52 ~ deleteRegisterEvent ~ error",
      error
    );

    res.sendStatus(500);
  }
};

const updateRegisterEvent = async (req, res, next) => {
  try {
    // UPDATE : req.params, req.query
    if (!req.params.id && req.body) return res.sendStatus(400);

    const RegisterEvent = await RegisterEventServices.updateRegisterEventById(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (!RegisterEvent) return res.sendStatus(500);

    return res.status(200).send(RegisterEvent);
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterEvent.controller.js:75 ~ updateRegisterEvent ~ error",
      error
    );

    res.sendStatus(500);
  }
};

module.exports = {
  getAllRegisterEvents,
  getRegisterEvent,
  createRegisterEvent,
  deleteRegisterEvent,
  updateRegisterEvent,
};
