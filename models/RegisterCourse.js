const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const RegisterCourseSchema = new Schema(
  {
    idUser: { type: mongoose.Types.ObjectId, ref: "User" },
    idCourse: { type: mongoose.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true }
);

RegisterCourseSchema.plugin(mongoosePaginate);

// tạo model
const RegisterCourse = mongoose.model("RegisterCourse", RegisterCourseSchema);

module.exports = RegisterCourse;
