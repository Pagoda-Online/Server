const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    UserId: { type: mongoose.Types.ObjectId, ref: "User" },
    Title: String,
    Description: String,
    UrlImagePath: { type: String, default: "null" },
    Start_Date: { type: Date, default: Date.now() },
    End_Date: {
      type: Date,
      default: new Date("3000-01-01T00:00:00.000Z"),
    },
  },
  { timestamps: true }
);

EventSchema.plugin(mongoosePaginate);

// tạo model
const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
