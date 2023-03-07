const DonateRepository = require("../repository/donate.repository");
const { decodeToken } = require("../utils/jwt");

const getAllDonates = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);

  const Donates = await DonateRepository.getAllDonates(payload._id);
  res.send(Donates);
};

const getAllDonatesReceive = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);

  const Donates = await DonateRepository.getAllDonatesReceived(payload._id);
  res.send(Donates);
};

const getDonate = async (req, res, next) => {
  const id = req.params.id;

  const Donate = await DonateRepository.getDonateById(id);

  if (!Donate) res.sendStatus(400);

  console.log("🚀 ~ file: Donate.js ~ line 16 ~ Donate", Donate);

  res.send(Donate);
};

const createDonate = async (req, res, next) => {
  try {
    // GET : req.params, req.query
    if (!req.body) return res.sendStatus(400);

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    const payload = decodeToken(token);
    req.body.UserId = payload._id;

    const Donate = await DonateRepository.createDonate(req.body);

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
