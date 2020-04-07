const mongoose = require("mongoose");
const { Schema } = mongoose;

const recruiterSchema = new Schema({
  recruiterMessage: {
    type: String,
    required: true
  },
  recruiterPlatform: {
    type: String,
    required: true
  },
  recruiterName: {
    type: String,
    required: true
  },
  recruiterRole: {
    type: String,
    required: true
  },
  recruiterMonth: {
    type: Number,
    required: true
  },
  recruiterYear: {
    type: Number,
    required: true
  },
  recruiterDate: {
    type: Number,
    required: true
  },
  recruiterCompany: {
    type: String,
    required: true
  },
  recruiterLeadToInterview: {
    type: Boolean,
    required: true
  },
  recruiterLeadToRole: {
    type: Boolean,
    required: true
  },
  recruiterHiringContract: {
    type: Boolean,
    required: true
  },
  recruiterHiringInternal: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

let Recruiter = mongoose.model("recruiter", recruiterSchema);

module.exports = Recruiter;
