const mongoose = require("mongoose");

async function connectDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing in environment variables");
  }

  await mongoose.connect(mongoUri);
}

module.exports = connectDatabase;
