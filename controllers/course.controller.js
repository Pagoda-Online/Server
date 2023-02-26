const CourseServices = require("../services/course.service");
const { decodeToken } = require("../utils/jwt");

const getAllCourses = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);

  const Courses = await CourseServices.getAllCourses(payload._id);
  res.send(Courses);
};

const getAllCoursesForAdmin = async (req, res, next) => {
  const Courses = await CourseServices.getAllCoursesForAdmin();
  res.send(Courses);
};

const getCourse = async (req, res, next) => {
  const id = req.params.id;

  const Course = await CourseServices.getCourseById(id);

  if (!Course) res.sendStatus(400);

  console.log("🚀 ~ file: Course.js ~ line 16 ~ Course", Course);

  res.send(Course);
};

const createCourse = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    const Course = await CourseServices.createCourse(req.body);

    if (!Course) return res.sendStatus(500);

    return res.status(200).send(Course);
  } catch (error) {
    console.log(
      "🚀 ~ file: CourseController.js ~ line 32 ~ createCourse ~ error",
      error
    );
    res.sendStatus(500);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    // DELETE : req.params, req.query
    if (!req.params.id) return res.sendStatus(400);

    const Course = await CourseServices.deleteCourseById(req.params.id);

    if (!Course) return res.sendStatus(500);

    return res.status(200).send(Course);
  } catch (error) {
    console.log(
      "🚀 ~ file: course.controller.js:52 ~ deleteCourse ~ error",
      error
    );

    res.sendStatus(500);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    // UPDATE : req.params, req.query
    if (!req.params.id && req.body) return res.sendStatus(400);

    const Course = await CourseServices.updateCourseById(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (!Course) return res.sendStatus(500);

    return res.status(200).send(Course);
  } catch (error) {
    console.log(
      "🚀 ~ file: course.controller.js:75 ~ updateCourse ~ error",
      error
    );

    res.sendStatus(500);
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
  getAllCoursesForAdmin,
};
