const CourseRepository = require("../repository/course.repository");

const getAllCourses = async (UserId) => {
  try {
    const Course = await CourseRepository.findAllCourse(UserId);
    return Course;
  } catch (error) {
    console.log(
      "🚀 ~ file: Courseervices.js ~ line 25 ~ getAllCourse ~ error",
      error
    );
  }
};

const getAllCoursesForAdmin = async () => {
  try {
    const Course = await CourseRepository.getAllCoursesForAdmin();
    return Course;
  } catch (error) {
    console.log(
      "🚀 ~ file: Courseervices.js ~ line 25 ~ getAllCourse ~ error",
      error
    );
  }
};

const getCourseById = async (id) => {
  try {
    const Course = await CourseRepository.findCourseById(id);
    return Course;
  } catch (error) {
    console.log(
      "🚀 ~ file: Courseervices.js ~ line 33 ~ getCourseById ~ error",
      error
    );
  }
};

const createCourse = async (data) => {
  try {
    const Course = await CourseRepository.createCourse(data);
    return Course;
  } catch (error) {
    console.log(
      "🚀 ~ file: Courseervices.js ~ line 32 ~ createCourse ~ error",
      error
    );
  }
};

const deleteCourseById = async (id) => {
  try {
    const Course = await CourseRepository.deleteCourseById(id);
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
    const Course = await CourseRepository.updateCourseById(id, data);
    return Course;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourseById,
  updateCourseById,
  getAllCoursesForAdmin,
};
