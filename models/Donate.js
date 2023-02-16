const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const DonateSchema = new Schema({
  UserId: { type: mongoose.Types.ObjectId, ref: "User" },
  DonateMoney: Number,
  Description: String,
});

DonateSchema.plugin(mongoosePaginate);

// tạo model
const Donate = mongoose.model("Donate", DonateSchema);

module.exports = Donate;
