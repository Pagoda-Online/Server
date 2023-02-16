require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(
    `Connect to Database OK, listening on http://localhost:${
      process.env.PORT || 3001
    }`
  );
};

const disconnectDatabase = async () => {
  // Disconnect from database
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
  });
};

module.exports = {
  connectDatabase,
  disconnectDatabase,
};
