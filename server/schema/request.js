const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  urlId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  nmap: {
    type: String,
  },
  zap: {
    type: String,
  },
  nmapstatus: {
    type: Boolean,
    default: false,
  },
  zapstatus: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
  },
});

const model = mongoose.model("request", schema);
module.exports = model;
