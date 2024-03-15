const mongoose = require("mongoose");

async function checkConnection() {
  try {
    await mongoose.connect(process.env.ATLAS_URL);
    console.log("Connected");
  } catch (error) {
    console.log("Not Connected :", error.message);
  }
}
module.exports = { checkConnection };
