const DonateRepository = require("../repository/donate.repository");

const getAllDonates = async (UserId) => {
  try {
    const Donate = await DonateRepository.findAllDonate(UserId);
    return Donate;
  } catch (error) {
    console.log(
      "🚀 ~ file: Donateervices.js ~ line 25 ~ getAllDonate ~ error",
      error
    );
  }
};

const getAllDonatesReceived = async (UserId) => {
  try {
    const Donate = await DonateRepository.findAllDonateReceive(UserId);
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
  getAllDonatesReceived,
};
