const RegisterCourseModel = require("../models/RegisterCourse");

const findAllRegisterCourse = async (options) => {
  try {
    const registerCourses = await RegisterCourseModel.paginate({}, options);
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

const deleteRegisterCourseById = async (id) => {
  try {
    const RegisterCourse = await RegisterCourseModel.deleteMany({ _id: id });
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

module.exports = {
  findAllRegisterCourse,
  findRegisterCourseById,
  createRegisterCourse,
  deleteRegisterCourseById,
  updateRegisterCourseById,
};
