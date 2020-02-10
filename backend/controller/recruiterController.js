const Recruiter = require("../models/recruiterModel");

let newRecruiterObject = (req, applicationNumber) => {
  return {
    name: req.body.name,
    date: req.body.date,
    month: req.body.month,
    year: req.body.year,
    platform: req.body.platform,
    role: req.body.role,
    leadToRole: req.body.leadToRole,
    leadToInterview: req.body.leadToInterview,
    contract: req.body.contract,
    hiringInternal: req.body.hiringInternal,
    company: req.body.company
  };
};

const recruitrerController = {
  getRecruitersAll: (req, res) => {
    Recruiter.find()
      .then(rec => {
        res.send(rec);
      })
      .catch(err => {
        res.send(err);
      });
  },
  getRecruitersPagination: (req, res) => {
    const startingPoint = req.body.startingPoint;
    const amountOfRecords = req.body.amountOfRecords;

    Recruiter.find({})
      .skip(startingPoint)
      .limit(amountOfRecords)
      .then(rec => {
        res.json(rec);
      })
      .catch(err => {
        res.json(err);
      });
  },
  getSingleRecruiter: (req, res) => {
    const recruiterId = req.body.recruiterId;
    Recruiter.findById(recruiterId)
      .then(rec => {
        if (!rec) {
          res.json({
            message: "no application found"
          });
        } else {
          res.json(rec);
        }
      })
      .catch(err => {
        res.json({
          message,
          errMsg: err
        });
      });
  },
  addRecruiter: (req, res) => {
    // validating whether a userId is present
    User.find({ _id: req.body.userId })
      .then(() => {
        Recruiter.findOne({ name: req.body.name, date: req.body.date })
          .then(recruiter => {
            if (!recruiter) {
              let newrecruiterContent = newRecruiterObject(req);
              let newRecruiter = new Jobs(newrecruiterContent);
              newRecruiter
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
                  "Unable to add to Database, Recruiter Message already in System",
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
  bulkAddRecruiter: (req, res) => {
    // Value submitted from the
    let data = req.body.data;

    res.send(data);
  },
  getRecruiterPerMonth: (req, res) => {
    const month = req.body.month;

    Recruiter.find({ recruiterMonth: month })
      .then(rec => {
        res.json(rec);
      })
      .catch(err => {
        res.json(err);
      });
  },
  getRecruiterPerYear: (req, res) => {
    const year = req.body.year;

    Jobs.find({ recruiterYear: year })
      .then(rec => {
        res.json(rec);
      })
      .catch(err => {
        res.json(err);
      });
  },
  getRecruiterFromCompany: (req, res) => {
    const recruiterCompany = req.body.company;

    Recruiter.find({ recruiterCompany: recruiterCompany })
      .then(jobs => {
        res.json(jobs);
      })
      .catch(err => {
        res.json(err);
      });
  },
  updateRecruiterApplication: (req, res) => {
    User.findById(req.body.userId)
      .then(() => {
        const updatedContent = req.body;
        const recruiterId = updatedContent.recruiterId;
        Recruiter.updateOne({ _id: recruiterId }, updatedContent)
          .then(() => {
            res.json({
              message: `Successfully updated Recruiter ID: ${recruiterId}`,
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
  deleteApplication: (req, res) => {
    const userId = req.body.userId;
    const recruiterId = req.body.recruiterId;

    User.find({ _id: userId })
      .then(() => {
        Recruiter.deleteOne({ _id: recruiterId })
          .then(rec => {
            res.json({
              ...rec,
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
  }
};

module.exports = recruitrerController;
