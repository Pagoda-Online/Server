const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    UserId: { type: mongoose.Types.ObjectId, ref: "User" },
    title: String,
    Description: String,
    UrlImagePath: { type: String, default: "null" },
    UrlVideoPath: { type: String, default: "null" },
  },
  { timestamps: true }
);

CourseSchema.plugin(mongoosePaginate);

// tạo model
const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
