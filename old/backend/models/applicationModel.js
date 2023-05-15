const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
  applicationLink: {
    type: String,
    required: true
  },
  applicationPlatform: {
    type: String,
    required: true
  },
  applicationMonth: {
    type: Number,
    default: new Date().getMonth() + 1
  },
  applicationYear: {
    type: Number,
    default: new Date().getFullYear()
  },
  applicationDate: {
    type: Number,
    required: true
  },
  hired: {
    type: Boolean,
    default: false
  },
  hiredDateMonth: {
    type: Number,
    default: 0
  },
  hiredDateYear: {
    type: Number,
    default: 0
  },
  hiredDate: {
    type: Number,
    default: 0
  },
  interview: {
    type: Boolean,
    default: false
  },
  lastDayWorkedMonth: {
    type: Number,
    default: 0
  },
  lastDayWorkedYear: {
    type: Number,
    default: 0
  },
  // 1 - Not Viewed
  // 2 - Representative has reached out to me
  // 3 - Application Declined
  // 4 - Offer provided
  response: {
    type: Number,
    default: 1
  },
  userId: {
    type: String,
    required: true
  }
});

const Applications = mongoose.model("Applications", ApplicationSchema);

module.exports = Applications;
