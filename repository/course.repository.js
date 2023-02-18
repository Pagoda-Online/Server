const CourseModel = require("../models/Course");

const findAllCourse = async (options) => {
  try {
    const courses = await CourseModel.paginate({}, options);
    return courses;
  } catch (error) {
    console.log(
      "🚀 ~ file: CourseRepository.js ~ line 25 ~ findAll ~ error",
      error
    );
  }
};

const findCourseById = async (id) => {
  try {
    const Course = await CourseModel.findById(id);
    return Course;
  } catch (error) {
    console.log(
      "🚀 ~ file: CourseRepository.js ~ line 33 ~ findCourseById ~ error",
      error
    );
  }
};

const createCourse = async (data) => {
  try {
    const Course = await CourseModel.create(data);
    return Course;
  } catch (error) {
    console.log(
      "🚀 ~ file: CourseRepository.js ~ line 31 ~ createCourse ~ error",
      error
    );
  }
};

const deleteCourseById = async (id) => {
  try {
    const Course = await CourseModel.deleteMany({ _id: id });
    return Course;
  } catch (error) {
    console.log(
      "🚀 ~ file: CourseRepository.js ~ line 33 ~ findCourseById ~ error",
      error
    );
  }
};

const updateCourseById = async (id, data) => {
  try {
    const Course = await CourseModel.updateMany(id, data);
    return Course;
  } catch (err) {
    return err;
  }
};

module.exports = {
  findAllCourse,
  findCourseById,
  createCourse,
  deleteCourseById,
  updateCourseById,
};
