const DonateModel = require("../models/Donate");

const findAllDonate = async (options) => {
  try {
    const donates = await DonateModel.paginate({}, options);
    return donates;
  } catch (error) {
    console.log(
      "🚀 ~ file: DonateRepository.js ~ line 25 ~ findAll ~ error",
      error
    );
  }
};

const findDonateById = async (id) => {
  try {
    const Donate = await DonateModel.findById(id);
    return Donate;
  } catch (error) {
    console.log(
      "🚀 ~ file: DonateRepository.js ~ line 33 ~ findDonateById ~ error",
      error
    );
  }
};

const createDonate = async (data) => {
  try {
    const Donate = await DonateModel.create(data);
    return Donate;
  } catch (error) {
    console.log(
      "🚀 ~ file: DonateRepository.js ~ line 31 ~ createDonate ~ error",
      error
    );
  }
};

module.exports = {
  findAllDonate,
  findDonateById,
  createDonate,
};
