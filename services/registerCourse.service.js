const RegisterCourseRepository = require("../repository/registerCourse.repository");

const getAllRegisterCourses = async (options) => {
  try {
    const RegisterCourse = await RegisterCourseRepository.findAllRegisterCourse(
      options
    );
    return RegisterCourse;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterCourseervices.js ~ line 25 ~ getAllRegisterCourse ~ error",
      error
    );
  }
};

const getRegisterCourseById = async (id) => {
  try {
    const RegisterCourse =
      await RegisterCourseRepository.findRegisterCourseById(id);
    return RegisterCourse;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterCourseervices.js ~ line 33 ~ getRegisterCourseById ~ error",
      error
    );
  }
};

const createRegisterCourse = async (data) => {
  try {
    const RegisterCourse = await RegisterCourseRepository.createRegisterCourse(
      data
    );
    return RegisterCourse;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterCourseervices.js ~ line 32 ~ createRegisterCourse ~ error",
      error
    );
  }
};

const deleteRegisterCourseById = async (id) => {
  try {
    const RegisterCourse =
      await RegisterCourseRepository.deleteRegisterCourseById(id);
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
    const RegisterCourse =
      await RegisterCourseRepository.updateRegisterCourseById(id, data);
    return RegisterCourse;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllRegisterCourses,
  getRegisterCourseById,
  createRegisterCourse,
  deleteRegisterCourseById,
  updateRegisterCourseById,
};
