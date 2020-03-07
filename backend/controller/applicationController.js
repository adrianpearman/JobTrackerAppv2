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
    applicationDate:
      moment(
        `${applicationYear}.${applicationMonth + 1}.01`,
        "YYYY.MM.DD"
      ).unix() * 1000,
    applicationLink: applicationLink,
    applicationMonth: applicationMonth + 1,
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
  getInitApplications: async (req, res) => {
    try {
      // Base Variables
      let dataContainer = [];
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      let unix = moment(`${year}.${month}.01`, "YYYY.MM.DD").unix();
      let baseUnix = moment(`2017.05.01`, "YYYY.MM.DD").unix();

      //All applicants
      let applications = await Jobs.find({});
      // Number of applications
      let applicationsTotalNumber = applications.length;
      // get last 10 applications
      let applicationsLast10 = applications
        .slice(Math.max(applications.length - 10, 0))
        .reverse();

      // Count all the application response values
      const countApplicationStatus = arr => {
        let appStatus0 = 0;
        let appStatus1 = 0;
        let appStatus2 = 0;
        let appStatus3 = 0;

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].response === 0) {
            appStatus0++;
          } else if (arr[i].response === 1) {
            appStatus1++;
          } else if (arr[i].response === 2) {
            appStatus2++;
          } else if (arr[i].response === 3) {
            appStatus3++;
          }
        }

        return [
          {
            status: "Not Viewed",
            applications: appStatus0
          },
          {
            status: "Application Viewed",
            applications: appStatus1
          },
          {
            status: "Application Declined",
            applications: appStatus2
          },
          {
            status: "Offer Provided",
            applications: appStatus3
          }
        ];
      };
      //  Count all of the monthly applications
      const countMonthlyApplications = arr => {
        let applicationMonths = {};
        // Initialize Application Month
        const initApplicationMonth = () => {
          if (unix > baseUnix) {
            month--;

            if (month === 0) {
              month = 12;
              year = year - 1;
            }

            unix = moment(`${year}.${month}.01`, "YYYY.MM.DD").unix();
            applicationMonths[unix] = 0;
            return initApplicationMonth();
          } else {
            return;
          }
        };
        initApplicationMonth();
        //Seperate all of the values by the application date
        for (let i = 0; i < arr.length; i++) {
          if (!applicationMonths[arr[i].applicationDate]) {
            applicationMonths[arr[i].applicationDate] = 1;
          } else {
            applicationMonths[arr[i].applicationDate]++;
          }
        }
        console.log(applicationMonths);
        // convert the value from an object to an array
        for (const key in applicationMonths) {
          if (applicationMonths.hasOwnProperty(key)) {
            let data = {
              date: new Date(parseInt(key) * 1000),
              name: moment.unix(key).format("MMMM/YYYY"),
              value: applicationMonths[key]
            };
            dataContainer.push(data);
          }
        }
        return dataContainer;
      };
      // grab latest results for current month
      let currentMonthApplications = await Jobs.find({
        applicationDate: unix
      });

      let applicationResponses = countApplicationStatus(applications);
      let applicationsPerMonth = countMonthlyApplications(applications);

      let data = {
        applicationsTotalNumber,
        applicationsLast10,
        applicationResponses,
        applicationsPerMonth,
        currentMonthApplications
      };
      return res.send(data);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  getAllApplications: async (req, res) => {
    try {
      let applications = await Jobs.find({});
      res.send({ applications });
    } catch (err) {
      res.status(400).send({ errMsg: err });
    }
  },
  getApplicationsPagination: async (req, res) => {
    const { startingPoint, amountOfRecords } = req.body;

    try {
      let applications = await Jobs.find({})
        .skip(startingPoint)
        .limit(amountOfRecords);
      res.send({ applications });
    } catch (err) {
      res.status(400).send({ errMsg: err });
    }
  },
  getSingleApplication: async (req, res) => {
    const { jobId } = req.body;

    let application = await Jobs.findById(jobId);
    //Validate whether job exists
    if (!application) {
      return res.status(400).send({
        message: "no application found"
      });
    }

    try {
      res.send({ application });
    } catch (err) {
      res.status(400).send({ errMsg: err });
    }
  },
  updateApplication: async (req, res) => {
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
      await Jobs.updateOne({ _id: jobId }, updatedContent);
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
  getApplicationsPerMonth: async (req, res) => {
    const { month } = req.body;

    try {
      let applications = await Jobs.find({ applicationMonth: month });
      res.send({ applications });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getApplicationsPerYear: async (req, res) => {
    const { year } = req.body;

    try {
      let applications = await Jobs.find({ applicationYear: year });
      res.send({ applications });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getApplicationsFromCompany: async (req, res) => {
    const { companyName } = req.body;

    try {
      let applications = await Jobs.find({ companyName: companyName });
      res.send({ applications });
    } catch (err) {
      res.status(400).send(err);
    }
  }
};

module.exports = applicationController;
