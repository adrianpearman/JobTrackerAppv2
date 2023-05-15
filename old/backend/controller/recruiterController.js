const Recruiters = require("../models/recruiterModel");
const User = require("../models/userModel");
// Util Functions
const countEntryStatus = require("../utils/countEntryStatus");
const countMonthlyEntries = require("../utils/countMonthlyEntries");
const unixTime = require("../utils/unixTime");
const updatedCompanyContainer = require("../utils/updateCompanyContainer");

let newRecruiterObject = ({
  recruiterMessage,
  recruiterPlatform,
  recruiterName,
  recruiterRole,
  recruiterMonth,
  recruiterYear,
  recruiterCompany,
  recruiterLeadToInterview,
  recruiterLeadToRole,
  recruiterHiringContract,
  recruiterHiringInternal,
  userId
}) => {
  return {
    recruiterMessage: recruiterMessage,
    recruiterPlatform: recruiterPlatform,
    recruiterName: recruiterName,
    recruiterRole: recruiterRole,
    recruiterMonth: parseInt(recruiterMonth),
    recruiterYear: parseInt(recruiterYear),
    recruiterDate: unixTime(recruiterMonth, recruiterYear),
    recruiterCompany: recruiterCompany,
    recruiterLeadToInterview: recruiterLeadToInterview,
    recruiterLeadToRole: recruiterLeadToRole,
    recruiterHiringContract: recruiterHiringContract,
    recruiterHiringInternal: recruiterHiringInternal,
    userId: userId
  };
};

const recruitrerController = {
  getInitRecruiters: async (req, res) => {
    try {
      const recruiters = await Recruiters.find({});
      const recruitersTotalNumber = recruiters.length;
      const recruitersLast10 = await Recruiters.find({})
        .sort({ recruiterDate: -1 })
        .limit(10);
      const recruiterResponses = countEntryStatus(recruiters, true);
      const recruitersPerMonth = countMonthlyEntries(recruiters, true);
      const currentMonthRecruiters = await Recruiters.find({
        recruiterDate: unixTime(
          new Date().getMonth() + 1,
          new Date().getFullYear()
        )
      });

      const data = {
        recruitersTotalNumber,
        recruitersLast10,
        recruiterResponses,
        recruitersPerMonth,
        currentMonthRecruiters
      };

      return res.send(data);
    } catch (err) {
      return res
        .status(500)
        .send({ err, errMsg: "Unable to process the request" });
    }
  },
  getRecruitersAll: async (req, res) => {
    try {
      const recruiter = await Recruiters.find();
      res.send(recruiter);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getRecruitersPagination: async (req, res) => {
    const { startingPoint, amountOfRecords } = req.body;

    try {
      const recruiter = await Recruiters.find({})
        .skip(startingPoint)
        .limit(amountOfRecords);
      res.send(recruiter);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getSingleRecruiter: async (req, res) => {
    const { recruiterId } = req.query;
    const recruiter = await Recruiters.findById(recruiterId);

    if (!recruiter) {
      return res.status(500).send({
        message: "no recruiter message found"
      });
    }

    res.send(recruiter);
  },
  getRecruiterPerMonth: async (req, res) => {
    const { month } = req.body;

    try {
      let recruiter = await Recruiters.find({ recruiterMonth: month });
      res.send(recruiter);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getRecruiterPerTimeFrame: async (req, res) => {
    const { unixTime, timeFrame } = req.query;

    try {
      let recruiters;
      if (timeFrame === "all time") {
        recruiters = await Recruiters.find({});
        return res.send({ recruiters });
      } else {
        recruiters = await Recruiters.find({ recruiterDate: unixTime });
        res.send({ recruiters });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getRecruiterPerYear: async (req, res) => {
    const { year } = req.body.year;

    try {
      let recruiter = await Recruiters.find({ recruiterYear: year });
      res.send(recruiter);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getRecruiterFromCompany: async (req, res) => {
    const { recruiterCompany } = req.body;

    try {
      let recruiter = await Recruiters.find({
        recruiterCompany: recruiterCompany
      });
      res.send(recruiter);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  addRecruiter: async (req, res) => {
    // validating whether a userId is present
    const {
      userId,
      recruiterCompany,
      recruiterName,
      recruiterMonth,
      recruiterYear
    } = req.body;
    const date = unixTime(recruiterMonth, recruiterYear);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).send({
        message: "Please resubmit with a valid UserID"
      });
    }

    const recruiter = await Recruiters.findOne({
      name: recruiterName,
      date: date
    });

    if (recruiter) {
      return res.status(500).send({
        message:
          "Unable to add to Database, Recruiter Message already in System",
        job: job
      });
    }

    try {
      const newRecruiter = new Recruiters(newRecruiterObject(req.body));
      const newRecruiterContent = await newRecruiter.save();
      // update the company container object
      await updatedCompanyContainer.add(recruiterCompany);
      res.send(newRecruiterContent);
    } catch (err) {
      res.status(500).send({
        message: "Error occured: Unable to create application",
        errMsg: err
      });
    }
  },
  bulkAddRecruiter: (req, res) => {
    // Value submitted from the
    let data = req.body.data;

    res.send(data);
  },
  updateRecruiterApplication: async (req, res) => {
    const { userId, recruiterId } = req.body;
    const updatedContent = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(500).send({
        message: "Please resubmit with a valid UserID"
      });
    }

    try {
      let updatedContentRecruiter = await Recruiters.updateOne(
        { _id: recruiterId },
        updatedContent
      );
      res.send({
        message: `Successfully updated Recruiter ID: ${recruiterId}`,
        updated: updatedContentRecruiter
      });
    } catch (err) {
      res.status(500).send({
        message: "Error occured: Unable to find application",
        errMsg: err
      });
    }
  },
  deleteApplication: async (req, res) => {
    const { userId, recruiterId } = req.query;

    let user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(500).send({
        message: "Please resubmit with a valid UserID"
      });
    }

    try {
      let recruiter = await Recruiters.deleteOne({ _id: recruiterId });
      res.send({ ...recruiter });
    } catch (err) {
      res.status(500).send({
        errMsg: err
      });
    }
  }
};

module.exports = recruitrerController;
