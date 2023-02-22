const DonateServices = require("../services/donate.service");
const { decodeToken } = require("../utils/jwt");

const getAllDonates = async (req, res, next) => {
  const token = req.cookies.access_token || req.headers.access_token;
  const payload = decodeToken(token);

  const Donates = await DonateServices.getAllDonates(payload._id);
  res.send(Donates);
};

const getAllDonatesReceive = async (req, res, next) => {
  const token = req.cookies.access_token || req.headers.access_token;
  const payload = decodeToken(token);

  const Donates = await DonateServices.getAllDonatesReceived(payload._id);
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

    const token = req.cookies.access_token || req.headers.access_token;
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

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
  getAllDonatesReceive,
};
