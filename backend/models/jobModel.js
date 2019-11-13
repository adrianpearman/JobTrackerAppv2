const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  applicationLink: {
    type: String,
    required: true
  },
  applicationMonth: {
    type: Number,
    required: true
  },
  applicationYear: {
    type: Number,
    required: true
  },
  response: {
    type: Boolean,
    default: false
  },
  interview: {
    type: Boolean,
    default: false
  },
  hired: {
    type: Boolean,
    default: false
  },
  hiredDateMonth: {
    type: Number
  },
  hiredDateYear: {
    type: Number
  },
  lastDayWorkedMonth: {
    type: Number
  },
  lastDayWorkedYear: {
    type: Number
  }
});

let Applications = mongoose.model("Applications", ApplicationSchema);

module.exports = Applications;
