//
const {
  applicationAnalytics,
  doesCompanyExist,
  updateUserApplicationAnalytics,
} = require("../utils");

// Models
const { Application, Company, User } = require("../databases/sql/models");
const AnalyticsModel = require("../databases/mongo/models/analytic");

const applicationController = {
  getAllApplications: async (req, res) => {
    const { userUuid, isPrivate = "true" } = req.query;

    try {
      if (!userUuid) {
        throw new Error("Missing User ID");
      }

      const user = await User.findOne({ where: { uuid: userUuid } });

      const applications = await Application.findAll({
        attributes: {
          exclude:
            isPrivate === "true"
              ? ["companyId", "createdAt", "link", "updatedAt", "userId"]
              : [],
        },
        where: { userId: user.dataValues.id },
      });

      const userAnalytics = await applicationAnalytics(userUuid);
      const { analytics, msg, success } = userAnalytics;

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
    const { applicationUuid, userUuid } = req.query;
    try {
      if (!applicationUuid) {
        throw new Error("Missing Application ID");
      }
      if (!userUuid) {
        throw new Error("Missing User ID");
      }

      const user = await User.findOne({
        where: { uuid: userUuid },
      });

      const application = await Application.findOne({
        where: {
          uuid: applicationUuid,
          userId: user.id,
        },
      });

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
    const { userUuid } = req.query;

    try {
      if (!userUuid) {
        throw new Error("User UUID is missing");
      }

      const user = await User.findOne({
        where: { uuid: userUuid },
      });

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

      const updatedAnalytics = await updateUserApplicationAnalytics(userUuid);
      console.log(updatedAnalytics);

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
  // deleteApplication: async (req, res) => {
  //   const { id, userID } = req.body;
  //   try {
  //     const application = await applicationModel.findById(id);
  //     if (application.userID === userID) {
  //       const deletedApplication = await applicationModel.deleteOne({
  //         _id: id,
  //       });
  //       res.send({ data: deletedApplication });
  //     } else {
  //       res
  //         .status(400)
  //         .send({ error: `Unauthorized to delete application id: ${id}` });
  //     }
  //   } catch (err) {
  //     res.status(400).send({ error: `Unable to delete application id: ${id}` });
  //   }
  // },
};

module.exports = applicationController;
