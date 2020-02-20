const Recruiter = require("../models/recruiterModel");

let newRecruiterObject = ({
  company,
  contract,
  date,
  hiringInternal,
  leadToInterview,
  leadToRole,
  month,
  name,
  platform,
  role,
  year
}) => {
  return {
    company: company,
    contract: contract,
    date: date,
    hiringInternal: hiringInternal,
    leadToInterview: leadToInterview,
    leadToRole: leadToRole,
    month: month,
    name: name,
    platform: platform,
    role: role,
    year: year
  };
};

const recruitrerController = {
  getRecruitersAll: async (req, res) => {
    try {
      let recruiter = await Recruiter.find();
      res.send(recruiter);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getRecruitersPagination: async (req, res) => {
    const { startingPoint, amountOfRecords } = req.body;

    try {
      let recruiter = await Recruiter.find({})
        .skip(startingPoint)
        .limit(amountOfRecords);
      res.send(recruiter);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getSingleRecruiter: async (req, res) => {
    const { recruiterId } = req.body;

    let recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(400).send({
        message: "no recruiter message found"
      });
    }

    res.send(recruiter);
  },
  addRecruiter: async (req, res) => {
    // validating whether a userId is present
    const { userId, name, date } = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({
        message: "Please resubmit with a valid UserID"
      });
    }

    let recruiter = await Recruiter.findOne({
      name: name,
      date: date
    });

    if (recruiter) {
      return res.status(400).send({
        message:
          "Unable to add to Database, Recruiter Message already in System",
        job: job
      });
    }

    try {
      let newRecruiter = new Jobs(newRecruiterObject(req.body));
      let newRecruiterContent = await newRecruiter.save();
      res.send(newRecruiterContent);
    } catch (err) {
      res.status(400).send({
        message: "Error occured: Unable to create application",
        errMsg: err
      });
    }
  },
  // bulkUpload from client provided json object
  bulkAddRecruiter: (req, res) => {
    // Value submitted from the
    let data = req.body.data;

    res.send(data);
  },
  getRecruiterPerMonth: async (req, res) => {
    const { month } = req.body;

    try {
      let recruiter = await Recruiter.find({ recruiterMonth: month });
      res.send(recruiter);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getRecruiterPerYear: async (req, res) => {
    const { year } = req.body.year;

    try {
      let recruiter = await Recruiter.find({ recruiterYear: year });
      res.send(recruiter);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getRecruiterFromCompany: async (req, res) => {
    const { recruiterCompany } = req.body;

    try {
      let recruiter = await Recruiter.find({
        recruiterCompany: recruiterCompany
      });
      res.send(recruiter);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  updateRecruiterApplication: async (req, res) => {
    const { userId, recruiterId } = req.body;
    const updatedContent = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({
        message: "Please resubmit with a valid UserID"
      });
    }

    try {
      let updatedContentRecruiter = await Recruiter.updateOne(
        { _id: recruiterId },
        updatedContent
      );
      res.send({
        message: `Successfully updated Recruiter ID: ${recruiterId}`,
        updated: updatedContentRecruiter
      });
    } catch (err) {
      res.status(400).send({
        message: "Error occured: Unable to find application",
        errMsg: err
      });
    }
  },
  deleteApplication: async (req, res) => {
    const { userId, recruiterId } = req.body;

    let user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).send({
        message: "Please resubmit with a valid UserID"
      });
    }

    try {
      let recruiter = await Recruiter.deleteOne({ _id: recruiterId });
      res.send({ ...recruiter });
    } catch (err) {
      res.status(400).send({
        errMsg: err
      });
    }
  }
};

module.exports = recruitrerController;
