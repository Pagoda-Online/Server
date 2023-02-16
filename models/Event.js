const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const EventSchema = new Schema({
  UserId: { type: mongoose.Types.ObjectId, ref: "User" },
  Title: String,
  Description: String,
  UrlFileImage: String,
  UrlFileAttach: String,
  UrlVideo: String,
  Start_Date: Date,
  End_Date: Date,
});

DonateSchema.plugin(mongoosePaginate);

// tạo model
const Event = mongoose.model("Event", EventSchema);

module.exports = Event;