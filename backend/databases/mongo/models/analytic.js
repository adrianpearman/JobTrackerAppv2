const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnalyticsModelSchema = new Schema(
  {
    averageAmountOfDailyApplications: { type: Number },
    applicationsPerPlatform: Schema.Types.Mixed,
    averageResponsesTimePerPlatform: Schema.Types.Mixed,
    interviewsPerPlatform: Schema.Types.Mixed,
    responsesPerPlatform: Schema.Types.Mixed,
    totalApplications: { type: Number },
    totalApplicationsWithInterview: { type: Number },
    totalApplicationsWithResponse: { type: Number },
  },
  { strict: false }
);

const AnalyticsModel = mongoose.model("AnalyticsModel", AnalyticsModelSchema);

module.exports = AnalyticsModel;
