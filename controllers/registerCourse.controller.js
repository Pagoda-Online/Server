const RegisterCourseServices = require("../services/registerCourse.service");

const getAllRegisterCourses = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const RegisterCourses = await RegisterCourseServices.getAllRegisterCourses({
    page,
    limit,
  });
  res.send(RegisterCourses);
};

const getRegisterCourse = async (req, res, next) => {
  const id = req.params.id;

  const RegisterCourse = await RegisterCourseServices.getRegisterCourseById(id);

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

    const RegisterCourse = await RegisterCourseServices.createRegisterCourse(
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
      await RegisterCourseServices.deleteRegisterCourseById(req.params.id);

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
      await RegisterCourseServices.updateRegisterCourseById(
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
