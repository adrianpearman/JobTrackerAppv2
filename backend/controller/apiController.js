const Jobs = require("../models/jobModel.js");
const User = require("../models/userModel");

const apiController = {
  getAllJobs: (req, res) => {
    Jobs.find({})
      .then(jobs => {
        res.json(jobs);
      })
      .catch(err => {
        res.json(err);
      });
  },
  getJobsPagination: (req, res) => {
    const startingPoint = req.body.startingPoint;
    const amountOfRecords = req.body.amountOfRecords;

    Jobs.find({})
      .skip(startingPoint)
      .limit(amountOfRecords)
      .then(jobs => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  },
  getSingleJob: (req, res) => {
    const jobId = req.body.jobId;
    Jobs.findById(jobId)
      .then(job => {
        if (!job) {
          res.json({
            message: "no application found"
          });
        } else {
          res.json(job);
        }
      })
      .catch(err => {
        res.json({
          message,
          errMsg: err
        });
      });
  },
  updateJobApplication: (req, res) => {
    User.findById(req.body.userId)
      .then(user => {
        const updatedContent = req.body;
        const jobId = updatedContent.jobId;
        Jobs.updateOne({ _id: jobId }, updatedContent)
          .then(updatedJob => {
            res.json({
              message: `Successfully updated Jo ID: ${jobId}`,
              updated: updatedContent
            });
          })
          .catch(err => {
            res.json({
              message: "Error occured: Unable to find application",
              errMsg: err
            });
          });
      })
      .catch(err => {
        res.json({
          message: "Please resubmit with a valid UserID",
          errMsg: err
        });
      });
  },
  addApplication: (req, res) => {
    // setting the object to be saved in the database
    let newJobContent = {
      userId: req.body.userId,
      companyName: req.body.companyName,
      applicationLink: req.body.applicationLink,
      applicationMonth: req.body.applicationMonth,
      applicationYear: req.body.applicationYear,
      response: req.body.response,
      interview: req.body.interview,
      hired: req.body.hired,
      hiredDate: req.body.hiredDate,
      lastDayWorked: req.body.lastDayWorked
    };

    // defining the new object with mongoose
    let newJob = new Jobs(newJobContent);

    // validating whether a userId is present
    User.find({ _id: req.body.userId })
      .then(user => {
        newJob
          .save()
          .then(job => {
            res.json(job);
          })
          .catch(err => {
            res.json({
              message: "Error occured: Uanble to create application",
              errMsg: err
            });
          });
      })
      .catch(err => {
        res.json({
          message: "Please resubmit with a valid UserID",
          errMsg: err
        });
      });
  },
  deleteApplication: (req, res) => {
    const userId = req.body.userId;
    const jobId = req.body.jobId;

    User.find({ _id: userId })
      .then(user => {
        Jobs.deleteOne({ _id: jobId })
          .then(job => {
            res.json(job);
          })
          .catch(err => {
            res.json({
              message,
              errMsg: err
            });
          });
      })
      .catch(err => {
        res.json({
          message,
          errMsg: err
        });
      });
  },
  getJobsPerMonth: (req, res) => {
    const month = req.body.month;

    Jobs.find({ applicationMonth: month })
      .then(jobs => {
        res.json(jobs);
      })
      .catch(err => {
        res.json(err);
      });
  },
  getJobsPerYear: (req, res) => {
    const year = req.body.year;

    Jobs.find({ applicationYear: year })
      .then(jobs => {
        res.json(jobs);
      })
      .catch(err => {
        res.json(err);
      });
  },
  getJobsFromCompany: (req, res) => {
    const companyName = req.body.companyName;

    Jobs.find({ companyName: companyName })
      .then(jobs => {
        res.json(jobs);
      })
      .catch(err => {
        res.json(err);
      });
  }
};

module.exports = apiController;
