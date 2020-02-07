const csv = require("csvtojson");
const csvFilePath = require("path").join(__dirname, "../", "test-csv.csv");

const Jobs = require("../models/jobModel.js");
const User = require("../models/userModel");

// setting the object to be saved in the database
let newJobObject = (req, applicationNumber) => {
  return {
    applicationLink: req.body.applicationLink,
    applicationMonth: req.body.applicationMonth,
    applicationSource: req.body.applicationSource,
    applicationYear: req.body.applicationYear,
    companyName: req.body.companyName,
    hired: req.body.hired,
    hiredDate: req.body.hiredDate,
    interview: req.body.interview,
    lastDayWorked: req.body.lastDayWorked,
    response: req.body.response,
    userId: req.body.userId
  };
};

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
        res.json(jobs);
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
      .then(() => {
        const updatedContent = req.body;
        const jobId = updatedContent.jobId;
        Jobs.updateOne({ _id: jobId }, updatedContent)
          .then(() => {
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
    // validating whether a userId is present
    User.find({ _id: req.body.userId })
      .then(() => {
        Jobs.findOne({ applicationLink: req.body.applicationLink })
          .then(job => {
            if (!job) {
              let newJobContent = newJobObject(req);
              let newJob = new Jobs(newJobContent);
              newJob
                .save()
                .then(job => {
                  res.json(job);
                })
                .catch(err => {
                  res.json({
                    message: "Error occured: Unable to create application",
                    errMsg: err
                  });
                });
            } else {
              res.json({
                message:
                  "Unable to add to Database, Application already in System",
                job: job
              });
            }
          })
          .catch(err => {
            res.json({
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
  // bulkUpload from client provided json object
  bulkAddApllication: (req, res) => {
    // Value submitted from the
    let data = req.body.data;

    res.send(data);
  },
  deleteApplication: (req, res) => {
    const userId = req.body.userId;
    const jobId = req.body.jobId;

    User.find({ _id: userId })
      .then(() => {
        Jobs.deleteOne({ _id: jobId })
          .then(job => {
            res.json({
              ...job,
              jobId
            });
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
