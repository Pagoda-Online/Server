const RegisterCourseRepository = require("../repository/registerCourse.repository");
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
    console.log(
      "🚀 ~ file: RegisterCourseController.js ~ line 32 ~ createRegisterCourse ~ error",
      error
    );
    res.sendStatus(500);
  }
};

const deleteRegisterCourse = async (req, res, next) => {
  try {
    // DELETE : req.params, req.query
    if (!req.params.id) return res.sendStatus(400);

    const RegisterCourse =
      await RegisterCourseRepository.deleteRegisterCourseById(req.params.id);

    if (!RegisterCourse) return res.sendStatus(500);

    return res.status(200).send(RegisterCourse);
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterCourse.controller.js:52 ~ deleteRegisterCourse ~ error",
      error
    );

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
    console.log(
      "🚀 ~ file: RegisterCourse.controller.js:75 ~ updateRegisterCourse ~ error",
      error
    );

    res.sendStatus(500);
  }
};

module.exports = {
  getAllRegisterCourses,
  getRegisterCourse,
  createRegisterCourse,
  deleteRegisterCourse,
  updateRegisterCourse,
};
