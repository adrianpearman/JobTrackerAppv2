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
  // 0 - Not Viewed
  // 1 - Representative has reached out to me
  // 2 - Application Declined
  // 3 - Offer provided
  response: {
    type: Number,
    default: 0
  },
  userId: {
    type: String,
    required: true
  }
});

const Applications = mongoose.model("Applications", ApplicationSchema);

module.exports = Applications;
