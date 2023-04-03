const DonateRepository = require("../repository/donate.repository");
const { decodeToken } = require("../utils/jwt");
const stripe = require("stripe")(process.env.STRIPE_S_KEY);

const getAllDonates = async (req, res, next) => {
  const Donates = await DonateRepository.findAllDonate();
  res.send(Donates);
};

const getAllDonatesReceive = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);
  const UserId = payload._id;
  // const UserId = "6407f573cd00bfcdcca2d7ed";

  const Donates = await DonateRepository.findAllDonateReceive(UserId);
  res.send(Donates);
};

const getAllDonatesSend = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);
  const UserId = payload._id;
  // const UserId = "6407f573cd00bfcdcca2d7ed";

  const Donates = await DonateRepository.findAllDonateSend(UserId);
  res.send(Donates);
};

const getStatisticsReceive = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);
  const UserId = payload._id;
  // const UserId = "6407f573cd00bfcdcca2d7ed";

  const Donates = await DonateRepository.findStatisticsReceive(UserId);
  const totalAmountOFYear = Donates.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );

  res.send({ Donates, totalAmountOFYear });
};

const getStatisticsSend = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  const payload = decodeToken(token);
  const UserId = payload._id;
  // const UserId = "6407f573cd00bfcdcca2d7ed";

  const Donates = await DonateRepository.findAllStatisticsSend(UserId);

  const totalAmountOFYear = Donates.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );

  res.send({ Donates, totalAmountOFYear });
};

const getDonate = async (req, res, next) => {
  const id = req.params.id;

  const Donate = await DonateRepository.findDonateById(id);

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
    const tokenStripe = req.body.token;
    console.log(
      "🚀 ~ file: donate.controller.js:54 ~ createDonate ~ tokenStripe:",
      tokenStripe
    );
    const donate = req.body.donate;
    console.log(
      "🚀 ~ file: donate.controller.js:56 ~ createDonate ~ donate:",
      donate
    );

    const charge = await stripe.charges.create({
      amount: donate.amount * 100,
      currency: "usd",
      description: donate.description,
      source: tokenStripe.id,
    });

    const donateData = {
      UserId: req.body.UserId,
      UserReceive: req.params.userReceive,
      paymentId: charge.id,
      Amount: donate.amount,
      Description: charge.description,
    };

    const Donate = await DonateRepository.createDonate(donateData);
    console.log(
      "🚀 ~ file: donate.controller.js:80 ~ createDonate ~ Donate:",
      Donate
    );

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
  getAllDonatesSend,
  getAllDonatesReceive,
  getStatisticsSend,
  getStatisticsReceive,
};
