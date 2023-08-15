// Models
const { Application, Company, User } = require("../databases/sql/models");
const AnalyticsModel = require("../databases/mongo/models/analytic");
// Util functions
const {
  applicationAnalytics,
  doesCompanyExist,
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
      // Manipulating the applications to only include the dataValues
      const applications = user.dataValues.applications.map(
        (app) => app.dataValues
      );
      // Retriving the user analytics
      const userAnalytics = await applicationAnalytics(userUuid);
      const { analytics, msg, success } = userAnalytics;
      // Throwing an error if an error occured with getting the analytics
      if (!success) {
        throw new Error(msg);
      }

      res.send({
        analytics: analytics,
        applications,
        message: "Successfully returned all applications",
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        analytics: null,
        applications: null,
        message: error.message || "Unable to perform this request",
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
        message: `Successfully returned Application:${applicationUuid}`,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        application: null,
        message:
          error.message || `Nothing found with the id of ${applicationUuid}`,
        success: false,
      });
    }
  },
  getApplicationAnalytics: async (req, res) => {
    // Destructuring request query
    const { userUuid } = req.query;
    try {
      // throwing error if no user uuid
      if (!userUuid) {
        throw new Error("User UUID is missing");
      }
      // getting the user information
      const user = await User.findOne({
        where: { uuid: userUuid },
      });
      // getting the associated user analytics
      const userAnalytics = await AnalyticsModel.findOne(
        {
          _id: user.dataValues.analyticsUuid,
        },
        // this omits the id from the returned values
        { _id: 0 }
      );

      res.send({
        success: true,
        userAnalytics: userAnalytics,
        msg: "Successfully returned user analytics",
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        userAnalytics: {},
        msg: error.message || "Unable to retrieve analytics",
      });
    }
  },
  addNewApplication: async (req, res) => {
    const date = new Date();
    const {
      companyName,
      day = date.getDate(),
      decision = null,
      interview = null,
      interviewDate = null,
      link,
      month = date.getMonth(), // must be in a range of 0 - 11
      platformId,
      response = false,
      responseDate = null,
      sourceSite,
      userUuid,
      year = date.getFullYear(),
    } = req.body;
    try {
      const formattedDate = new Date(year, month, day, 0, 0, 0);
      // Getting user id
      const user = await User.findOne({ where: { uuid: userUuid } });
      // Verifying if company is new or previously put in DB
      const newCompany = await doesCompanyExist(companyName);

      let companyNameDetail;
      // Validates whether a company is new or not
      // todo review the findAndCreate function
      if (newCompany.exists === true) {
        companyNameDetail = newCompany.company;
      } else {
        const createdNewCompany = await Company.create({
          companyName: companyName,
        });
        companyNameDetail = createdNewCompany.dataValues;
      }

      const newApplication = await Application.create({
        applicationDate: formattedDate,
        companyId: companyNameDetail.id,
        decision: decision,
        interview: interview,
        interviewDate: interviewDate,
        link: link,
        platformId: platformId,
        response: response,
        responseDate: responseDate,
        sourceSite: sourceSite,
        userId: user.dataValues.id,
      });

      await updateUserApplicationAnalytics(userUuid);

      res.send({
        application: newApplication,
        message: "Successfully added application",
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        application: null,
        message: error.message,
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
      }
      // Updating the user analytics
      await updateUserApplicationAnalytics(userUuid);

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
