// Models
const { Application, User } = require("../databases/sql/models");
// Util functions
const {
  applicationAnalytics,
  doesCompanyExist,
  doesPlatformExist,
  updateUserApplicationAnalytics,
} = require("../utils");

const applicationController = {
  getAllApplications: async (req, res) => {
    // Destructuring the request query
    const { userUuid, isPrivate = "true" } = req.query;
    try {
      // Throw an error if no user uuid
      if (!userUuid) {
        throw new Error("Missing User ID");
      }
      // Setting conditions for which values to return
      const privateConditions =
        isPrivate === "true"
          ? ["companyId", "createdAt", "id", "link", "updatedAt", "userId"]
          : [];
      // Getting the user information
      const user = await User.findOne({
        where: { uuid: userUuid },
        include: {
          model: Application,
          as: "applications",
          attributes: {
            exclude: privateConditions,
          },
        },
      });
      const { applications, analyticsUuid } = user.dataValues;
      // Manipulating the applications to only include the dataValues
      const applicationData = applications.map((app) => app.dataValues);
      // Retriving the user analytics
      const userAnalytics = await applicationAnalytics(analyticsUuid);
      const { analytics, msg, success } = userAnalytics;
      // Throwing an error if an error occured with getting the analytics
      if (!success) {
        throw new Error(msg);
      }

      res.send({
        analytics: analytics,
        applications: applicationData,
        msg: "Successfully returned all applications",
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        analytics: null,
        applications: null,
        msg: error.message || "Unable to perform this request",
        success: false,
      });
    }
  },
  getIndividualApplication: async (req, res) => {
    // Destructuring request query
    const { applicationUuid, userUuid } = req.query;
    try {
      // Throwing error if no application ID
      if (!applicationUuid) {
        throw new Error("Missing Application ID");
      }
      // Throwing error if no user uuid
      if (!userUuid) {
        throw new Error("Missing User ID");
      }
      // Getting the user information
      const user = await User.findOne({
        where: { uuid: userUuid },
        include: {
          model: Application,
          as: "applications",
          where: {
            uuid: applicationUuid,
          },
          attributes: {
            exclude: ["id"],
          },
        },
      });
      // Individual application
      const application = user.dataValues.applications[0].dataValues;

      res.send({
        application: application,
        msg: `Successfully returned Application:${applicationUuid}`,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        application: null,
        msg: error.message || `Nothing found with the id of ${applicationUuid}`,
        success: false,
      });
    }
  },
  addNewApplication: async (req, res) => {
    const date = new Date();
    let {
      companyName,
      day, // must be valid for the specified month
      decision = null,
      interview = null,
      interviewDate,
      link,
      month, // must be in a range of 0 - 11
      response = false,
      responseDate,
      sourceSite,
      userUuid,
      year, // must be a valid year
    } = req.body;

    try {
      // Sanitizing Request Data
      // Dates
      if (day === "") {
        day = date.getDate();
      }
      if (month === "") {
        month = date.getMonth();
      }
      if (year === "") {
        year = date.getFullYear();
      }
      // Interview
      if (interviewDate === "") {
        interviewDate = null;
      }
      // Response
      if (responseDate === "") {
        responseDate = null;
      }

      const formattedDate = new Date(year, month, day, 0, 0, 0);
      // Getting user id
      const user = await User.findOne({ where: { uuid: userUuid } });
      // Verifying if company is new or previously put in DB
      const companyDetails = await doesCompanyExist(companyName);
      // Throwing error if unable to add or retrieve company
      if (companyDetails.success === false) {
        throw new Error(companyDetails.msg);
      }
      // Verifying if platform is new or previously put in DB
      const platFormDetails = await doesPlatformExist(sourceSite);
      // Throwing error if unable to add or retrieve platform
      if (platFormDetails.success === false) {
        throw new Error(platFormDetails.msg);
      }
      // Creating new application
      const newApplication = await Application.create({
        applicationDate: formattedDate,
        companyId: companyDetails.company.id,
        decision: decision,
        interview: interview,
        interviewDate: interviewDate,
        link: link,
        platformId: platFormDetails.platform.id,
        response: response,
        responseDate: responseDate,
        userId: user.dataValues.id,
      });
      // Updating user analytics
      await updateUserApplicationAnalytics(userUuid);
      // Sending response back thru response
      res.send({
        application: newApplication,
        msg: "Successfully added application",
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        application: null,
        msg: error.message,
        success: false,
      });
    }
  },
  // bulkAddApplications: async (req, res) => {},
  // // PUT REQUESTS
  // updateApplication: async (req, res) => {
  //   const id = req.body._id;
  //   try {
  //     const updatedApplication = await applicationModel.findOneAndUpdate(
  //       { _id: id },
  //       { ...req.body }
  //     );
  //     res.send({ data: updatedApplication });
  //   } catch (err) {
  //     console.log(err);
  //     res
  //       .status(400)
  //       .send({ error: `An error occured while trying to update id: ${id}` });
  //   }
  // },
  deleteApplication: async (req, res) => {
    // Destructuring the req body
    const { applicationUuid, userUuid } = req.body;

    try {
      // Throwing error if no application uuid
      if (!applicationUuid) {
        throw new Error("Missing Application");
      }
      // Throwing error if no user uuid
      if (!userUuid) {
        throw new Error("Missing User UUID");
      }
      // Getting the user and application through association
      const user = await User.findOne({
        where: { uuid: userUuid },
        include: {
          model: Application,
          as: "applications",
          where: {
            uuid: applicationUuid,
          },
        },
      });
      // Throwing error if no valid user
      if (user === null) {
        throw new Error(`Unable to find user:${userUuid}`);
      }
      // Retrieving the uuid. primarily to ensure that it belongs to the user
      const { dataValues: app } = user.dataValues.applications[0];
      // Throwing an error if the app does not exist
      if (app.uuid === null) {
        throw new Error(`Unable to find application:${applicationUuid}`);
      }
      // Deleteing the application
      const deletedApplication = await Application.destroy({
        where: {
          uuid: applicationUuid,
        },
      });
      // Throw error if unable to delete the application
      if (deletedApplication !== 1) {
        throw new Error(`Unable to delete application:${applicationUuid}`);
      } else {
        // Updating the user analytics
        console.log("starting analytic flow");
        await updateUserApplicationAnalytics(userUuid);
      }

      res.send({
        application: app,
        msg: `Successfully deleted application:${applicationUuid}`,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        msg: error.message || "An error has occured",
        application: null,
      });
    }

    // const { id, userID } = req.body;
    // try {
    //   const application = await applicationModel.findById(id);
    //   if (application.userID === userID) {
    //     const deletedApplication = await applicationModel.deleteOne({
    //       _id: id,
    //     });
    //     res.send({ data: deletedApplication });
    //   } else {
    //     res
    //       .status(400)
    //       .send({ error: `Unauthorized to delete application id: ${id}` });
    //   }
    // } catch (err) {
    //   res.status(400).send({ error: `Unable to delete application id: ${id}` });
    // }
  },
};

module.exports = applicationController;
