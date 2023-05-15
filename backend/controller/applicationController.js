// Models
const applicationModel = require("../models/applicationModel");

const applicationController = {
  // GET REQUESTS
  getAllApplications: async (req, res) => {
    try {
      const { userID } = req.query;
      const applications = await applicationModel
        .find({})
        .where("userID")
        .equals(userID);

      res.send({ data: applications });
    } catch (err) {
      res.status(400).send({
        error: "Unable to perform this request",
      });
    }
  },
  getIndividualApplication: async (req, res) => {
    const { id, userID } = req.query;

    try {
      const data = await applicationModel.findById(id);
      if (data.userID === userID) {
        res.send({ data: data });
      } else if (data === null) {
        throw error;
      } else {
        res.status(400).send({ error: `Unauthorized to access application` });
      }
    } catch (err) {
      res.status(400).send({ error: `Nothing found with the id of ${id}` });
    }
  },
  getApplicationsByCompany: async (req, res) => {
    const { companyName } = req.query;

    try {
      const applications = await applicationModel
        .find({})
        .where("companyName")
        .equals(companyName);
      // Sending information
      res.send({ data: applications });
    } catch (err) {
      res.status(400).send({ error: `Unable to find company: ${companyName}` });
    }
  },
  getApplicationsByPlatform: async (req, res) => {
    const { platform } = req.query;

    try {
      const applications = await applicationModel
        .find({})
        .where("platform")
        .equals(platform);

      res.send({ data: applications });
    } catch (err) {
      res.status(400).send({
        error: `Unable to find applications from platform: ${platform}`,
      });
    }
  },
  getApplicationAnalytics: async (req, res) => {
    // console.log(req.query);
    try {
      const data = await applicationModel.find({});
      res.send({
        data: data,
      });
    } catch (err) {
      res.status(400).send({ error: "Unable to perform this request" });
    }
    // average days between response
    // applications per day
    // total applications w/ out company names, links
    // responses
  },
  // POST REQUESTS
  addNewApplication: async (req, res) => {
    const {
      companyName,
      day,
      decision,
      interview,
      interviewDate,
      link,
      month,
      response,
      responseDate,
      sourceSite,
      userID,
      year,
    } = req.body;

    try {
      const formattedDate = new Date(`${year}-${month}-${day}`);
      const applicationObj = {
        applicationDate: formattedDate,
        companyName,
        decision,
        interview,
        interviewDate,
        link,
        response,
        responseDate,
        sourceSite,
        userID,
      };
      const newApplication = await applicationModel.create(applicationObj);
      res.send({ data: newApplication });
    } catch (err) {
      const errorInformation = [];
      const errorData = Object.keys(err.errors);

      errorData.forEach((e) => {
        errorInformation.push(err.errors[e].message);
      });

      res.status(400).send({ error: errorInformation });
    }
  },
  bulkAddApplications: async (req, res) => {},
  // PUT REQUESTS
  updateApplication: async (req, res) => {
    const id = req.body._id;
    try {
      const updatedApplication = await applicationModel.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );
      res.send({ data: updatedApplication });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send({ error: `An error occured while trying to update id: ${id}` });
    }
  },
  // DELETE REQUESTS
  deleteApplication: async (req, res) => {
    const { id, userID } = req.body;

    try {
      const application = await applicationModel.findById(id);
      if (application.userID === userID) {
        const deletedApplication = await applicationModel.deleteOne({
          _id: id,
        });
        res.send({ data: deletedApplication });
      } else {
        res
          .status(400)
          .send({ error: `Unauthorized to delete application id: ${id}` });
      }
    } catch (err) {
      res.status(400).send({ error: `Unable to delete application id: ${id}` });
    }
  },
};

module.exports = applicationController;
