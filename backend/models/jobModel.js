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
    required: true
  },
  applicationSource: {
    type: String,
    required: true
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
