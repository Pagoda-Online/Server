const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const DonateSchema = new Schema(
  {
    UserId: { type: mongoose.Types.ObjectId, ref: "User" },
    UserReceive: { type: mongoose.Types.ObjectId, ref: "User" },
    paymentId: String,
    Amount: Number,
    Description: String,
  },
  { timestamps: true }
);

DonateSchema.plugin(mongoosePaginate);

// tạo model
const Donate = mongoose.model("Donate", DonateSchema);

module.exports = Donate;
