const RegisterCourseRepository = require("../repository/registerCourse.repository");
const RegisterCourseModel = require("../models/RegisterCourse");
const { decodeToken } = require("../utils/jwt");

const getAllRegisterCourses = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);

  const RegisterCourses = await RegisterCourseRepository.getAllRegisterCourses(
    payload._id
  );
  res.send(RegisterCourses);
};

const getRegisterCourse = async (req, res, next) => {
  const id = req.params.id;

  const RegisterCourse = await RegisterCourseRepository.getRegisterCourseById(
    id
  );

  if (!RegisterCourse) res.sendStatus(400);

  console.log(
    "🚀 ~ file: RegisterCourse.js ~ line 16 ~ RegisterCourse",
    RegisterCourse
  );

  res.send(RegisterCourse);
};

const createRegisterCourse = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    const RegisterCourse = await RegisterCourseRepository.createRegisterCourse(
      req.body
    );

    if (!RegisterCourse) return res.sendStatus(500);

    return res.status(200).send(RegisterCourse);
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteRegisterCourse = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    if (!req.params.id) return res.sendStatus(400);

    const RegisterCourse =
      await RegisterCourseRepository.deleteRegisterCourseById(
        req.body.UserId,
        req.params.id
      );

    if (!RegisterCourse) return res.sendStatus(500);

    return res.status(200).send(RegisterCourse);
  } catch (error) {
    res.sendStatus(500);
  }
};

const updateRegisterCourse = async (req, res, next) => {
  try {
    // UPDATE : req.params, req.query
    if (!req.params.id && req.body) return res.sendStatus(400);

    const RegisterCourse =
      await RegisterCourseRepository.updateRegisterCourseById(
        { _id: req.params.id },
        { $set: req.body }
      );

    if (!RegisterCourse) return res.sendStatus(500);

    return res.status(200).send(RegisterCourse);
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

    const RegisterCheck = await RegisterCourseModel.findOne({
      UserId: req.body.UserId,
      idCourse: req.params.id,
    });

    const isRegister = !!RegisterCheck;

    return res.status(200).send(isRegister);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAllRegisterCourses,
  getRegisterCourse,
  createRegisterCourse,
  deleteRegisterCourse,
  updateRegisterCourse,
  checkRegister,
};
