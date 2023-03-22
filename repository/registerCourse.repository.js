const RegisterCourseModel = require("../models/RegisterCourse");

const findAllRegisterCourse = async (UserId) => {
  try {
    const registerCourses = await RegisterCourseModel.find({ UserId: UserId });
    return registerCourses;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterCourseRepository.js ~ line 25 ~ findAll ~ error",
      error
    );
  }
};

const findRegisterCourseById = async (id) => {
  try {
    const RegisterCourse = await RegisterCourseModel.findById(id);
    return RegisterCourse;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterCourseRepository.js ~ line 33 ~ findRegisterCourseById ~ error",
      error
    );
  }
};

const createRegisterCourse = async (data) => {
  try {
    const RegisterCourse = await RegisterCourseModel.create(data);
    return RegisterCourse;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterCourseRepository.js ~ line 31 ~ createRegisterCourse ~ error",
      error
    );
  }
};

const deleteRegisterCourseById = async (UserId, id) => {
  try {
    const RegisterCourse = await RegisterCourseModel.deleteMany({
      UserId: UserId,
      idCourse: id,
    });
    return RegisterCourse;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterCourseRepository.js ~ line 33 ~ findRegisterCourseById ~ error",
      error
    );
  }
};

const updateRegisterCourseById = async (id, data) => {
  try {
    const RegisterCourse = await RegisterCourseModel.updateMany(id, data);
    return RegisterCourse;
  } catch (err) {
    return err;
  }
};

const checkRegister = async (UserId, CourseId) => {
  try {
    const registerEvents = await RegisterCourseModel.findOne({
      UserId: UserId,
      idCourse: CourseId,
    });
    return registerEvents;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findAllRegisterCourse,
  findRegisterCourseById,
  createRegisterCourse,
  deleteRegisterCourseById,
  updateRegisterCourseById,
  checkRegister,
};
