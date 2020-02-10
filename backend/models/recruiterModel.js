const mongoose = require("mongoose");
const { Schema } = mongoose;

const recruiterSchema = new Schema({
  recruiterName: { type: String },
  recruiterDate: { type: Number },
  recruiterMonth: { type: String },
  recruiterYear: { type: Number },
  recruiterPlatform: { type: String },
  recruiterRole: { type: String },
  recruiterLeadToRole: { type: Boolean },
  recruiterLeadToInterview: { type: Boolean },
  recruiterContract: { type: Boolean },
  recruiterHiringInternal: { type: Boolean },
  recruiterCompany: { type: String }
});

mongoose.model("recruiter", recruiterSchema);
