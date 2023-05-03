const RegisterEventRepository = require("../repository/registerEvent.repository");
const RegisterEventModel = require("../models/RegisterEvent");
const { decodeToken } = require("../utils/jwt");

const getAllRegisterEvents = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);

    const RegisterEvents = await RegisterEventRepository.getAllRegisterEvents(
      payload._id
    );
    res.send(RegisterEvents);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getRegisterEvent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const RegisterEvent = await RegisterEventRepository.getRegisterEventById(
      id
    );

    if (!RegisterEvent) res.sendStatus(400);

    res.send(RegisterEvent);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createRegisterEvent = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;
    const RegisterEvent = await RegisterEventRepository.createRegisterEvent(
      req.body
    );

    if (!RegisterEvent) return res.sendStatus(500);

    return res.status(200).send(RegisterEvent);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteRegisterEvent = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    if (!req.params.id) return res.sendStatus(400);

    const RegisterEvent = await RegisterEventRepository.deleteRegisterEventById(
      req.body.UserId,
      req.params.id
    );

    if (!RegisterEvent) return res.sendStatus(500);

    return res.status(200).send(RegisterEvent);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateRegisterEvent = async (req, res, next) => {
  try {
    // UPDATE : req.params, req.query
    if (!req.params.id && req.body) return res.sendStatus(400);

    const RegisterEvent = await RegisterEventRepository.updateRegisterEventById(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (!RegisterEvent) return res.sendStatus(500);

    return res.status(200).send(RegisterEvent);
  } catch (error) {
    res.sendStatus(500);
  }
};

const checkRegister = async (req, res, next) => {
  try {
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    const RegisterCheck = await RegisterEventModel.findOne({
      UserId: req.body.UserId,
      idEvent: req.params.id,
    });
    console.log(
      "🚀 ~ file: registerEvent.controller.js:109 ~ checkRegister ~ RegisterCheck:",
      RegisterCheck
    );
    const isRegister = !!RegisterCheck;
    return res.status(200).send(isRegister);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAllRegisterEvents,
  getRegisterEvent,
  createRegisterEvent,
  deleteRegisterEvent,
  updateRegisterEvent,
  checkRegister,
};
