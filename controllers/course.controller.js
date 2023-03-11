const CourseRepository = require("../repository/course.repository");
const { decodeToken } = require("../utils/jwt");
const { uploadToCloudinary } = require("../services/upload.service");
const { ErrorHandler } = require("../utils/errorHandler");
const { bufferToDataURI } = require("../utils/file");

const getAllCourses = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);

  const Courses = await CourseRepository.findAllCourse(payload._id);
  res.send(Courses);
};

const getAllCoursesForAdmin = async (req, res, next) => {
  const Courses = await CourseRepository.getAllCoursesForAdmin();
  res.send(Courses);
};

const getCourse = async (req, res, next) => {
  const id = req.params.id;

  const Course = await CourseRepository.getCourseById(id);

  if (!Course) res.sendStatus(400);

  console.log("🚀 ~ file: Course.js ~ line 16 ~ Course", Course);

  res.send(Course);
};

const createCourse = async (req, res, next) => {
  try {
    const { file } = req;
    console.log(
      "🚀 ~ file: course.controller.js:36 ~ createCourse ~ file:",
      req.body
    );
    // if (!file) throw new ErrorHandler(400, "Image is required");

    const fileFormat = file.mimetype.split("/")[1];
    console.log(
      "🚀 ~ file: course.controller.js:43 ~ createCourse ~ fileFormat:",
      fileFormat
    );
    const { base64 } = bufferToDataURI(fileFormat, file.buffer);

    const imageDetails = await uploadToCloudinary(base64, fileFormat);

    req.body.UrlImagePath = imageDetails.url;
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    const Course = await CourseRepository.createCourse(req.body);

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

    const Course = await CourseRepository.deleteCourseById(req.params.id);

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
    // const { file } = req;
    // // if (!file) throw new ErrorHandler(400, "Image is required");

    // const fileFormat = file.mimetype.split("/")[1];
    // const { base64 } = bufferToDataURI(fileFormat, file.buffer);

    // const imageDetails = await uploadToCloudinary(base64, fileFormat);

    // req.body.UrlImagePath = imageDetails.url;
    // // UPDATE : req.params, req.query
    // if (!req.params.id && req.body) return res.sendStatus(400);

    const Course = await CourseRepository.updateCourseById(
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
