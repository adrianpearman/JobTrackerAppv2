// Models
const Applications = require("../models/applicationModel");
const Company = require("../models/companyModel");
const User = require("../models/userModel");
// Util Functions
const countEntryStatus = require("../utils/countEntryStatus");
const countMonthlyEntries = require("../utils/countMonthlyEntries");
const unixTime = require("../utils/unixTime");
const updatedCompanyContainer = require("../utils/updateCompanyContainer");

// setting the object to be saved in the database
let newJobObject = ({
  companyName,
  applicationLink,
  applicationPlatform,
  applicationMonth,
  applicationYear,
  interview,
  response,
  userId
}) => {
  return {
    companyName: companyName,
    applicationLink: applicationLink,
    applicationPlatform: applicationPlatform,
    applicationMonth: parseInt(applicationMonth),
    applicationYear: parseInt(applicationYear),
    applicationDate: unixTime(applicationMonth, applicationYear),
    interview: interview,
    response: response,
    userId: userId
  };
};

const applicationController = {
  getInitApplications: async (req, res) => {
    try {
      //All applicants
      let applications = await Applications.find({});
      // Number of applications
      let applicationsTotalNumber = applications.length;
      // get last 10 applications
      let applicationsLast10 = await Applications.find({})
        .sort({ appliationDate: -1 })
        .limit(10);

      let applicationResponses = countEntryStatus(applications, false);
      let applicationsPerMonth = countMonthlyEntries(applications, false);

      // grab latest results for current month
      let currentMonthApplications = await Applications.find({
        applicationDate: unixTime(
          new Date().getMonth() + 1,
          new Date().getFullYear()
        )
      });

      let data = {
        applicationsTotalNumber,
        applicationsLast10,
        applicationResponses,
        applicationsPerMonth,
        currentMonthApplications
      };
      return res.send(data);
    } catch (err) {
      return res
        .status(500)
        .send({ err, errMsg: "Unable to process the request" });
    }
  },
  getAllApplications: async (req, res) => {
    try {
      let applications = await Applications.find({});
      res.send({ applications });
    } catch (err) {
      res.status(500).send({ errMsg: err });
    }
  },
  getApplicationsPagination: async (req, res) => {
    const { startingPoint, amountOfRecords } = req.body;

    try {
      let applications = await Applications.find({})
        .skip(startingPoint)
        .limit(amountOfRecords);
      res.send({ applications });
    } catch (err) {
      res.status(50).send({ errMsg: err });
    }
  },
  getSingleApplication: async (req, res) => {
    const { jobId } = req.query;

    let application = await Applications.findById(jobId);
    //Validate whether job exists
    if (!application) {
      return res.status(500).send({
        message: "no application found"
      });
    }

    try {
      res.send({ application });
    } catch (err) {
      res.status(500).send({ errMsg: err });
    }
  },
  getApplicationsPerMonth: async (req, res) => {
    const { month } = req.query;

    try {
      let applications = await Applications.find({ applicationMonth: month });
      res.send({ applications });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getApplicationsPerYear: async (req, res) => {
    const { year } = req.query;

    try {
      let applications = await Applications.find({ applicationYear: year });
      res.send({ applications });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getApplicationsPerTimeFrame: async (req, res) => {
    const { unixTime, timeFrame } = req.query;

    try {
      let applications;
      if (timeFrame === "all time") {
        applications = await Applications.find({});
        return res.send({ applications });
      } else {
        applications = await Applications.find({ applicationDate: unixTime });
        return res.send({ applications });
      }
    } catch (err) {
      res.status(500).send({ errMsg: err });
    }
  },
  getApplicationsFromCompany: async (req, res) => {
    const { companyName } = req.query;

    try {
      let applications = await Applications.find({ companyName: companyName });
      let applicationResponses = countEntryStatus(applications, false);
      let applicationsPerMonth = countMonthlyEntries(applications, false);
      let data = {
        applications,
        applicationResponses,
        applicationsPerMonth
      };
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getCompanyList: async (req, res) => {
    try {
      let Companies = await Company.findOne({});
      res.send(Companies);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addApplication: async (req, res) => {
    const { applicationLink, companyName, userId } = req.body;

    // validating whether a userId is present
    let user = await User.findOne({ _id: userId });

    if (!user) {
      return res
        .status(500)
        .send({ message: "Please resubmit with a valid UserID" });
    }

    //validating whether Job has been posted already
    let job = await Applications.findOne({ applicationLink });

    if (job) {
      return res.status(500).send({
        message: "Unable to add to Database, Application already in System"
      });
    }

    try {
      let newApplicationContent = new Applications(newJobObject(req.body));
      let newApplication = await newApplicationContent.save();
      // update the company container object
      await updatedCompanyContainer.add(companyName);
      res.send(newApplication);
    } catch (err) {
      res.status(500).send({
        message: "Error occured: Unable to create application",
        errMsg: err
      });
    }
  },
  bulkAddApllication: (req, res) => {
    // Value submitted from the client
    let data = req.body.data;
    res.send(data);
  },
  updateApplication: async (req, res) => {
    const { userId, jobId } = req.body;
    const updatedContent = req.body;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(500).send({
        message: "Please resubmit with a valid UserID",
        errMsg: err
      });
    }

    try {
      await Applications.updateOne({ _id: jobId }, updatedContent);
      res.send({
        message: `Successfully updated Jo ID: ${jobId}`,
        updated: updatedContent
      });
    } catch (err) {
      res.status(500).send({
        message: "Error occured: Unable to find application",
        errMsg: err
      });
    }
  },
  deleteApplication: async (req, res) => {
    const { userId, jobId } = req.query;
    const user = await User.find({ _id: userId });

    if (!user) {
      return res.status(500).send({ errMsg: err });
    }

    try {
      const job = await Applications.deleteOne({ _id: jobId });
      await updatedCompanyContainer.delete(companyName);
      res.send({
        ...job,
        jobId
      });
    } catch (err) {
      res.json({
        errMsg: err
      });
    }
  }
};

module.exports = applicationController;
