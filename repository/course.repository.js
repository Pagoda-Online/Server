const CourseModel = require("../models/Course");
const RegisterCourseModel = require("../models/RegisterCourse");

const findAllCourse = async (UserId) => {
  try {
    const courses = await CourseModel.find({ UserId: UserId }).populate(
      "UserId"
    );
    return courses;
  } catch (error) {
    return error.message;
  }
};

const findAllRegisteredCourse = async (UserId) => {
  try {
    const courses = await RegisterCourseModel.find({ UserId: UserId }).populate(
      "idCourse"
    );
    return courses;
  } catch (error) {
    return error.message;
  }
};

const getAllCoursesForAdmin = async () => {
  try {
    const courses = await CourseModel.find().populate("UserId");
    return courses;
  } catch (error) {
    return error.message;
  }
};

const findCourseById = async (id) => {
  try {
    const Course = await CourseModel.findById(id);
    return Course;
  } catch (error) {
    return error.message;
  }
};

const createCourse = async (data) => {
  try {
    const Course = await CourseModel.create(data);
    return Course;
  } catch (error) {
    return error.message;
  }
};

const deleteCourseById = async (id) => {
  try {
    const Course = await CourseModel.deleteMany({ _id: id });
    return Course;
  } catch (error) {
    return error.message;
  }
};

// const updateCourseById = async (id, data) => {
//   try {
//     const Course = await CourseModel.updateMany(id, data);
//     return Course;
//   } catch (err) {
//     return err;
//   }
// };

const updateCourseById = async (id, data) => {
  try {
    const updatedCourse = await CourseModel.findOneAndUpdate(id, data, {
      new: true,
    });
    return updatedCourse;
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
  getAllCoursesForAdmin,
  findAllRegisteredCourse,
};
