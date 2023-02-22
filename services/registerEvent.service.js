const RegisterEventRepository = require("../repository/registerEvent.repository");

const getAllRegisterEvents = async (UserId) => {
  try {
    const RegisterEvent = await RegisterEventRepository.findAllRegisterEvent(
      UserId
    );
    return RegisterEvent;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterEventervices.js ~ line 25 ~ getAllRegisterEvent ~ error",
      error
    );
  }
};

const getRegisterEventById = async (id) => {
  try {
    const RegisterEvent = await RegisterEventRepository.findRegisterEventById(
      id
    );
    return RegisterEvent;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterEventervices.js ~ line 33 ~ getRegisterEventById ~ error",
      error
    );
  }
};

const createRegisterEvent = async (data) => {
  try {
    const RegisterEvent = await RegisterEventRepository.createRegisterEvent(
      data
    );
    return RegisterEvent;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterEventervices.js ~ line 32 ~ createRegisterEvent ~ error",
      error
    );
  }
};

const deleteRegisterEventById = async (id) => {
  try {
    const RegisterEvent = await RegisterEventRepository.deleteRegisterEventById(
      id
    );
    return RegisterEvent;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterEventRepository.js ~ line 33 ~ findRegisterEventById ~ error",
      error
    );
  }
};

const updateRegisterEventById = async (id, data) => {
  try {
    const RegisterEvent = await RegisterEventRepository.updateRegisterEventById(
      id,
      data
    );
    return RegisterEvent;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllRegisterEvents,
  getRegisterEventById,
  createRegisterEvent,
  deleteRegisterEventById,
  updateRegisterEventById,
};
