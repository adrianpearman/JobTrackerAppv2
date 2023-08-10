// NPM Modules
const Sequelize = require("sequelize");
const admin = require("firebase-admin");
const mongoose = require("mongoose");
// Config
const { database, username, password, dialect, host, port } =
  require("../databases/sql/config/config")[process.env.NODE_ENV];
// Models
// SQL
const {
  Application,
  Company,
  Platform,
  User,
} = require("../databases/sql/models");
// Mongo
const AnalyticsModel = require("../databases/mongo/models/analytic");

module.exports = {
  // GENERAL UTIL FUNCTIONS
  doesCompanyExist: async (name) => {
    const company = await Company.findOne({
      where: {
        companyName: name,
      },
    });

    if (company === null) {
      return {
        company: null,
        exists: false,
      };
    } else {
      return {
        company: company.dataValues,
        exists: true,
      };
    }
  },
  // ANALYTICS UTIL FUNCTIONS
  applicationAnalytics: async (userUuid) => {
    try {
      const user = await User.findOne({ where: { uuid: userUuid } });
      const { analyticsUuid } = user.dataValues;

      const userAnalytics = await AnalyticsModel.findOne({
        _id: analyticsUuid,
      });

      return {
        success: true,
        analytics: userAnalytics,
        msg: "",
      };
    } catch (error) {
      return {
        success: false,
        analytics: null,
        msg: error.message || "An issue occured retrieving analytics",
      };
    }
  },
  createUserApplicationAnalytics: async () => {
    try {
      const applicationsPerPlatform = {};
      const interviewsPerPlatform = {};
      const responsesPerPlatform = {};
      let totalApplicationsWithInterview = 0;
      let totalApplicationsWithResponse = 0;

      const platforms = await Platform.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      platforms.forEach((p) => {
        const { platformName } = p.dataValues;
        applicationsPerPlatform[platformName] = 0;
        interviewsPerPlatform[platformName] = 0;
        responsesPerPlatform[platformName] = 0;
      });

      const analytics = {
        applicationsPerPlatform,
        applicationsWithResponses: [],
        interviewsPerPlatform,
        responsesPerPlatform,
        totalApplications: 0,
        totalApplicationsWithInterview,
        totalApplicationsWithResponse,
      };

      const analyticObj = new AnalyticsModel(analytics);
      const newUserAnalyticObj = await analyticObj.save();

      return {
        success: true,
        analytics: newUserAnalyticObj,
        msg: "",
      };
    } catch (error) {
      return {
        success: false,
        analytics: null,
        msg: error.message || "damn",
      };
    }
  },
  updateUserApplicationAnalytics: async (userUuid) => {
    try {
      const user = await User.findOne({
        where: {
          uuid: userUuid,
        },
        include: {
          as: "applications",
          model: Application,
        },
      });

      const applications = user.applications.map((a) => a.dataValues);

      console.log(applications);

      return {
        success: false,
        analytics: {},
        msg: "",
      };
    } catch (error) {
      return {
        success: false,
        analytics: {},
        msg: "",
      };
    }
  },
  deleteUserApplicationAnalytics: async (uuid) => {
    try {
      const analytics = await AnalyticsModel.deleteOne({ _id: uuid });

      if (analytics.deletedCount === 0) {
        throw new Error(`No Analytics matching UUID: ${uuid}`);
      }

      return {
        success: true,
        analyticsUuid: uuid,
        msg: `Successdfully deleted UUID:${uuid}`,
      };
    } catch (error) {
      return {
        success: false,
        analyticsUuid: null,
        msg: error.message || "",
      };
    }
  },
  // DATABASE AND AUTH FUNCTIONS
  firebaseAdminAuth: () => {
    const firebaseAdminConfig = {
      type: process.env.type,
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      private_key: process.env.private_key,
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url,
      universe_domain: process.env.universe_domain,
    };

    const serviceAccount = JSON.parse(JSON.stringify(firebaseAdminConfig));
    //  Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://authentication-8151c.firebaseio.com",
    });

    return admin;
  },
  mongooseConnection: async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
      console.log("Connected to Mongo Database");
    } catch (err) {
      console.error(err);
    }
  },
  sequelizeConnection: () => {
    const sequelize = new Sequelize(database, username, password, {
      dialect,
      host,
      port,
    });

    return sequelize;
  },
};
