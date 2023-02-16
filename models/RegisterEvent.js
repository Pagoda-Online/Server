const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const RegisterEventSchema = new Schema({
  idUser: { type: mongoose.Types.ObjectId, ref: "User" },
  idEvent: { type: mongoose.Types.ObjectId, ref: "Event" },
});

RegisterEventSchema.plugin(mongoosePaginate);

// tạo model
const RegisterEvent = mongoose.model("RegisterEvent", RegisterEventSchema);

module.exports = RegisterEvent;
