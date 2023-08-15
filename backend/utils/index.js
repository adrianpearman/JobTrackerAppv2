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

// Functions
// GENERAL UTIL FUNCTIONS
const convertToUnixSec = (time) => {
  return parseInt((new Date(time).getTime() / 1000).toFixed(0));
};
const doesCompanyExist = async (name) => {
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
};
const daysBetweenApplications = (beginning, end) => {
  const secondInDay = 86400;
  const beginningUnix = parseInt(
    (new Date(beginning).getTime() / 1000).toFixed(0)
  );
  const endUnix = parseInt((new Date(end).getTime() / 1000).toFixed(0));
  return (endUnix - beginningUnix) / secondInDay;
};
// ANALYTICS UTIL FUNCTIONS
const applicationAnalytics = async (userUuid) => {
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
};
const createUserApplicationAnalytics = async () => {
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
      averageAmountOfDailyApplications,
      averageResponsesTimePerPlatform,
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
      msg: "Successfully created user analytics",
    };
  } catch (error) {
    return {
      success: false,
      analytics: null,
      msg: error.message || "Issue creating analytics, try again later",
    };
  }
};
const updateUserApplicationAnalytics = async (userUuid) => {
  // Setting base obj
  const baseAnalytics = {
    applicationsPerPlatform: {},
    averageAmountOfDailyApplications: 0,
    averageResponsesTimePerPlatform: {},
    interviewsPerPlatform: {},
    responsesPerPlatform: {},
    responsesTimeTotalPerPlatform: {},
    totalApplications: 0,
    totalApplicationsWithInterview: 0,
    totalApplicationsWithResponse: 0,
  };

  try {
    // Setting variable for earliest application
    const arrayOfDates = [];
    // Getting the user and their associated applications
    const user = await User.findOne({
      where: {
        uuid: userUuid,
      },
      include: {
        as: "applications",
        model: Application,
      },
    });
    // Getting all a vailable platforms
    const platforms = await Platform.findAll({});
    // Iterating through platforms to create base analytic objext
    platforms.forEach((plat) => {
      // Destructuring iterated platform object
      const { platformName } = plat.dataValues;
      // Destructuring base analytics object
      const {
        applicationsPerPlatform,
        averageResponsesTimePerPlatform,
        interviewsPerPlatform,
        responsesPerPlatform,
        responsesTimeTotalPerPlatform,
      } = baseAnalytics;
      // Setting base values
      applicationsPerPlatform[platformName] = 0;
      averageResponsesTimePerPlatform[platformName] = 0;
      interviewsPerPlatform[platformName] = 0;
      responsesPerPlatform[platformName] = 0;
      responsesTimeTotalPerPlatform[platformName] = 0;
    });
    // Iterating thorough user applications
    user.applications.forEach((ua) => {
      // Destructured each user app
      const { dataValues: apps } = ua;
      // Pushing start dates to array for future calculation
      arrayOfDates.push(apps.applicationDate);
      // Looping through each platform
      platforms.forEach((p) => {
        const { dataValues: plat } = p;
        // Segmenting the applications to their respective platforms
        if (plat.id === apps.platformId) {
          // Increasing the amount of applications per platform
          baseAnalytics.applicationsPerPlatform[plat.platformName]++;
          // If an application has an interview
          if (apps.interview === true) {
            baseAnalytics.interviewsPerPlatform[plat.platformName]++;
          }
          // If an application has been responded to
          if (apps.response === true) {
            // Destructuring base analytic object
            const {
              averageResponsesTimePerPlatform,
              responsesPerPlatform,
              responsesTimeTotalPerPlatform,
            } = baseAnalytics;
            // Destructring the individual application
            const { applicationDate, responseDate } = apps;
            // Increasing the total responses per platform
            responsesPerPlatform[plat.platformName]++;
            // Calculating the time between applying and and response datew
            const t = daysBetweenApplications(applicationDate, responseDate);
            // Increasing the total amount of days between response per platform
            responsesTimeTotalPerPlatform[plat.platformName] =
              responsesTimeTotalPerPlatform[plat.platformName] + t;
            // Calculating the average days to respond to an application
            averageResponsesTimePerPlatform[plat.platformName] = parseFloat(
              (
                responsesTimeTotalPerPlatform[plat.platformName] /
                responsesPerPlatform[plat.platformName]
              ).toFixed(2)
            );
          }
        }
      });
      // If an application resulted in an interview; showcasing total amount of interviews
      if (apps.interview === true) {
        baseAnalytics.totalApplicationsWithInterview++;
      }
      // If an application received a response; showcasing total amount of responses
      if (apps.response === true) {
        baseAnalytics.totalApplicationsWithResponse++;
      }
      // Increasing total amount of applications
      baseAnalytics.totalApplications++;
    });
    // Calculating average applications per day
    // Getting current date in seconds
    const currentDate = new Date();
    const firstApplicationDate = new Date(Math.min(...arrayOfDates));
    // Calculating the average amount of applications per day
    const averageDailyApplications =
      baseAnalytics.totalApplications /
      Math.floor(daysBetweenApplications(firstApplicationDate, currentDate));
    // Setting value to analytic object
    baseAnalytics.averageAmountOfDailyApplications = averageDailyApplications;
    // Deleting un needed obj property
    delete baseAnalytics.responsesTimeTotalPerPlatform;
    // Updating individual user analytics
    await AnalyticsModel.findOneAndUpdate(
      { id: user.dataValues.platformId },
      baseAnalytics
    );
    // Getting the newly created obj to return
    const newAnalytics = await AnalyticsModel.findOne({
      id: user.dataValues.platformId,
    });

    return {
      success: true,
      analytics: newAnalytics,
      msg: "Successfully updated user analytics",
    };
  } catch (error) {
    return {
      success: false,
      analytics: {},
      msg: error.message || "An error occured, plese try again later",
    };
  }
};
const deleteUserApplicationAnalytics = async (uuid) => {
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
};

module.exports = {
  doesCompanyExist,
  daysBetweenApplications,
  applicationAnalytics,
  createUserApplicationAnalytics,
  updateUserApplicationAnalytics,
  deleteUserApplicationAnalytics,
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
