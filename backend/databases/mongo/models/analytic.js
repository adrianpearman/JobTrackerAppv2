const mongoose = require("mongoose");
const { Schema } = mongoose;

const individualApplicationTypes = {
  id: {
    type: String,
  },
  uuid: {
    type: String,
  },
  applicationDate: {
    type: String,
  },
  decision: {
    type: Boolean,
  },
  interview: {
    type: String,
  },
  interviewDate: {
    type: String,
  },
  link: {
    type: String,
  },
  response: {
    type: String,
  },
  responseDate: {
    type: String,
  },
  sourceSite: {
    type: String,
  },
  companyId: {
    type: Number,
  },
  platformId: {
    type: Number,
  },
  userId: {
    type: String,
  },
};

const AnalyticsModelSchema = new Schema({
  applicationsPerPlatform: {
    linkedin: {
      type: Number,
    },
    indeed: {
      type: Number,
    },
    internal: {
      type: Number,
    },
  },
  applicationsWithResponses: [individualApplicationTypes],
  interviewsPerPlatform: {
    linkedin: { type: Number },
    indeed: { type: Number },
    internal: { type: Number },
  },
  responsesPerPlatform: {
    linkedin: { type: Number },
    indeed: { type: Number },
    internal: { type: Number },
  },
  totalApplications: { type: Number },
  totalApplicationsWithInterview: { type: Number },
  totalApplicationsWithResponse: { type: Number },
});

const AnalyticsModel = mongoose.model("AnalyticsModel", AnalyticsModelSchema);

module.exports = AnalyticsModel;
