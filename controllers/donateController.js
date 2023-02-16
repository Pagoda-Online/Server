const DonateServices = require("../services/donate.service");

const getAllDonates = async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;

  const Donates = await DonateServices.getAllDonates({ page, limit });
  res.send(Donates);
};

const getDonate = async (req, res, next) => {
  const id = req.params.id;

  const Donate = await DonateServices.getDonateById(id);

  if (!Donate) res.sendStatus(400);

  console.log("🚀 ~ file: Donate.js ~ line 16 ~ Donate", Donate);

  res.send(Donate);
};

const createDonate = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const Donate = await DonateServices.createDonate(req.body);

    if (!Donate) return res.sendStatus(500);

    return res.status(200).send(Donate);
  } catch (error) {
    console.log(
      "🚀 ~ file: DonateController.js ~ line 32 ~ createDonate ~ error",
      error
    );
    res.sendStatus(500);
  }
};

module.exports = {
  getAllDonates,
  getDonate,
  createDonate,
};
