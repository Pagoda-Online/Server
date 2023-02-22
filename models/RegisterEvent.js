const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const RegisterEventSchema = new Schema(
  {
    UserId: { type: mongoose.Types.ObjectId, ref: "User" },
    idEvent: { type: mongoose.Types.ObjectId, ref: "Event" },
  },
  { timestamps: true }
);

RegisterEventSchema.plugin(mongoosePaginate);

// tạo model
const RegisterEvent = mongoose.model("RegisterEvent", RegisterEventSchema);

module.exports = RegisterEvent;
