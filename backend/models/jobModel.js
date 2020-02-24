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
  applicationDate: {
    type: Number,
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
    required: true
  },
  applicationYear: {
    type: Number,
    required: true,
    default: new Date().getFullYear()
  },
  // 0 - Not Viewed
  // 1 - Representative has reached out to me
  // 2 - Application Declined
  // 3 - Offer provided
  response: {
    type: Number,
    default: 0
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
    type: Number,
    default: 0
  },
  hiredDateYear: {
    type: Number,
    default: 0
  },
  lastDayWorkedMonth: {
    type: Number,
    default: 0
  },
  lastDayWorkedYear: {
    type: Number,
    default: 0
  }
});

let Applications = mongoose.model("Applications", ApplicationSchema);

module.exports = Applications;
