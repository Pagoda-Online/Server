const RegisterEventModel = require("../models/RegisterEvent");

const findAllRegisterEvent = async (UserId) => {
  try {
    const registerEvents = await RegisterEventModel.find({ UserId: UserId });
    return registerEvents;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterEventRepository.js ~ line 25 ~ findAll ~ error",
      error
    );
  }
};

const findRegisterEventById = async (id) => {
  try {
    const RegisterEvent = await RegisterEventModel.findById(id);
    return RegisterEvent;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterEventRepository.js ~ line 33 ~ findRegisterEventById ~ error",
      error
    );
  }
};

const createRegisterEvent = async (data) => {
  try {
    const RegisterEvent = await RegisterEventModel.create(data);
    return RegisterEvent;
  } catch (error) {
    console.log(
      "🚀 ~ file: RegisterEventRepository.js ~ line 31 ~ createRegisterEvent ~ error",
      error
    );
  }
};

const deleteRegisterEventById = async (id) => {
  try {
    const RegisterEvent = await RegisterEventModel.deleteMany({ _id: id });
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
    const RegisterEvent = await RegisterEventModel.updateMany(id, data);
    return RegisterEvent;
  } catch (err) {
    return err;
  }
};

module.exports = {
  findAllRegisterEvent,
  findRegisterEventById,
  createRegisterEvent,
  deleteRegisterEventById,
  updateRegisterEventById,
};
