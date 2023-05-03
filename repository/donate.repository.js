const DonateModel = require("../models/Donate");
const mongoose = require("mongoose");

const findAllDonate = async (UserId) => {
  try {
    const donates = await DonateModel.find({});
    return donates;
  } catch (error) {
    return error;
  }
};

const findAllDonateReceive = async (UserId) => {
  try {
    const donates = await DonateModel.find({ UserReceive: UserId }).populate(
      "UserId"
    );
    return donates;
  } catch (error) {
    return error;
  }
};

const findAllDonateSend = async (UserId) => {
  try {
    const donates = await DonateModel.find({ UserId: UserId }).populate(
      "UserReceive"
    );
    return donates;
  } catch (error) {
    return error;
  }
};

const findStatisticsReceive = async (UserId) => {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const endOfYear = new Date(new Date().getFullYear(), 11, 31);
    const donates = await DonateModel.aggregate([
      {
        $match: {
          UserReceive: mongoose.Types.ObjectId(UserId), // userId là id của User cần tìm kiếm
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalAmount: { $sum: "$Amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return donates;
  } catch (error) {
    return error;
  }
};

const findAllStatisticsSend = async (UserId) => {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const endOfYear = new Date(new Date().getFullYear(), 11, 31);
    const donates = await DonateModel.aggregate([
      {
        $match: {
          UserId: mongoose.Types.ObjectId(UserId), // userId là id của User cần tìm kiếm
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalAmount: { $sum: "$Amount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return donates;
  } catch (error) {
    return error;
  }
};

const findDonateById = async (id) => {
  try {
    const Donate = await DonateModel.findById(id);
    return Donate;
  } catch (error) {
    return error;
  }
};

const createDonate = async (data) => {
  try {
    const Donate = await DonateModel.create(data);
    return Donate;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findAllDonate,
  findDonateById,
  createDonate,
  findAllDonateReceive,
  findAllDonateSend,
  findAllStatisticsSend,
  findStatisticsReceive,
};
