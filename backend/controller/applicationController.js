const moment = require("moment");
const Jobs = require("../models/jobModel.js");
const User = require("../models/userModel");

// setting the object to be saved in the database
let newJobObject = ({
  applicationLink,
  applicationMonth,
  applicationPlatform,
  applicationSource,
  applicationYear,
  companyName,
  hired,
  hiredDate,
  interview,
  lastDayWorked,
  response,
  userId
}) => {
  return {
    applicationDate: moment(
      `${applicationYear}.${applicationMonth}.01`,
      "YYYY.MM.DD"
    ).unix(),
    applicationLink: applicationLink,
    applicationMonth: applicationMonth,
    applicationPlatform: applicationPlatform,
    applicationSource: applicationSource,
    applicationYear: applicationYear,
    companyName: companyName,
    hired: hired,
    hiredDate: hiredDate,
    interview: interview,
    lastDayWorked: lastDayWorked,
    response: response,
    userId: userId
  };
};

const applicationController = {
  getAllJobs: async (req, res) => {
    try {
      let jobs = await Jobs.find({});
      res.json(jobs);
    } catch (err) {
      res.status(400).send({ errMsg: err });
    }
  },
  getJobsPagination: async (req, res) => {
    const { startingPoint, amountOfRecords } = req.body;

    try {
      let jobs = await Jobs.find({})
        .skip(startingPoint)
        .limit(amountOfRecords);
      res.json(jobs);
    } catch (err) {
      res.status(400).send({ errMsg: err });
    }
  },
  getSingleJob: async (req, res) => {
    const { jobId } = req.body;

    let job = await Jobs.findById(jobId);
    //Validate whether job exists
    if (!job) {
      return res.status(400).send({
        message: "no application found"
      });
    }

    try {
      res.json(job);
    } catch (err) {
      res.status(400).send({ errMsg: err });
    }
  },
  updateJobApplication: async (req, res) => {
    const { userId, jobId } = req.body;
    const updatedContent = req.body;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).send({
        message: "Please resubmit with a valid UserID",
        errMsg: err
      });
    }

    try {
      let job = await Jobs.updateOne({ _id: jobId }, updatedContent);
      res.send({
        message: `Successfully updated Jo ID: ${jobId}`,
        updated: updatedContent
      });
    } catch (err) {
      res.status(400).send({
        message: "Error occured: Unable to find application",
        errMsg: err
      });
    }
  },
  addApplication: async (req, res) => {
    const { userId, applicationLink } = req.body;

    // validating whether a userId is present
    let user = await User.findOne({ _id: userId });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Please resubmit with a valid UserID" });
    }

    //validating whether Job has been posted already
    let job = await Jobs.findOne({ applicationLink });

    if (job) {
      return res.status(400).send({
        message: "Unable to add to Database, Application already in System"
      });
    }

    try {
      let newJobContent = new Jobs(newJobObject(req.body));
      let newJob = await newJobContent.save();
      res.send(newJob);
    } catch (err) {
      res.status(400).send({
        message: "Error occured: Unable to create application",
        errMsg: err
      });
    }
  },
  // bulkUpload from client provided json object
  bulkAddApllication: (req, res) => {
    // Value submitted from the client
    let data = req.body.data;
    res.send(data);
  },
  deleteApplication: async (req, res) => {
    const { userId, jobId } = req.body;

    let user = await User.find({ _id: userId });

    if (!user) {
      return res.status(400).send({ errMsg: err });
    }

    try {
      let job = await Jobs.deleteOne({ _id: jobId });
      res.send({
        ...job,
        jobId
      });
    } catch (err) {
      res.json({
        errMsg: err
      });
    }
  },
  getJobsPerMonth: async (req, res) => {
    const { month } = req.body;

    try {
      let jobs = await Jobs.find({ applicationMonth: month });
      res.json(jobs);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getJobsPerYear: async (req, res) => {
    const { year } = req.body;

    try {
      let jobs = await Jobs.find({ applicationYear: year });
      res.json(jobs);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getJobsFromCompany: async (req, res) => {
    const { companyName } = req.body;

    try {
      let jobs = await Jobs.find({ companyName: companyName });
      res.json(jobs);
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

module.exports = applicationController;
