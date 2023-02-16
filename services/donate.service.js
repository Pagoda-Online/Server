const DonateRepository = require("../repository/donate.repository");

const getAllDonates = async (options) => {
  try {
    const Donate = await DonateRepository.findAllDonate(options);
    return Donate;
  } catch (error) {
    console.log(
      "🚀 ~ file: Donateervices.js ~ line 25 ~ getAllDonate ~ error",
      error
    );
  }
};

const getDonateById = async (id) => {
  try {
    const Donate = await DonateRepository.findDonateById(id);
    return Donate;
  } catch (error) {
    console.log(
      "🚀 ~ file: Donateervices.js ~ line 33 ~ getDonateById ~ error",
      error
    );
  }
};

const createDonate = async (data) => {
  try {
    const Donate = await DonateRepository.createDonate(data);
    return Donate;
  } catch (error) {
    console.log(
      "🚀 ~ file: Donateervices.js ~ line 32 ~ createDonate ~ error",
      error
    );
  }
};

module.exports = {
  getAllDonates,
  getDonateById,
  createDonate,
};
