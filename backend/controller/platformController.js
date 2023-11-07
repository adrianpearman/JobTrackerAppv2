// NPM Modules
const { Application, Platform, User } = require("../databases/sql/models");

const platformController = {
  getPlatforms: async (req, res) => {
    try {
      //  Retrieving all the platforms
      const platforms = await Platform.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.send({
        msg: "Successfully retrieved platforms",
        platforms: platforms,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        msg: error.message,
        platforms: null,
        success: false,
      });
    }
  },
  getIndividualPlatform: async (req, res) => {
    // Destructuring the req query
    const { platformId } = req.query;
    try {
      // Error handling if no platform provided
      if (!platformId) {
        throw new Error("Missing platformId");
      }
      // Retruning the individual platform
      const platform = await Platform.findOne({
        where: { id: platformId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.send({
        msg: `Successfully returned platform:${platformId}`,
        platform: platform,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        msg: error.message || "",
        platform: null,
        success: false,
      });
    }
  },
  getApplicationsByPlatform: async (req, res) => {
    // Destructuring the req query
    const { isPrivate = "false", platformId, userUuid } = req.query;
    // Returning the platform and it's associatied applications
    try {
      // Error handling if no platform provided
      if (!platformId) {
        throw new Error("Missing Platform ID");
      }
      // Throwing an error if no user uuid is provided
      if (!userUuid) {
        throw new Error("User UUID missing");
      }
      // For private request, it'll return all requests related to the user
      const privateData = isPrivate
        ? ["createdAt", "updatedAt"]
        : [
            "applicationDate",
            "createdAt",
            "decision",
            "id",
            "interview",
            "interviewDate",
            "link",
            "response",
            "responseDate",
            "updatedAt",
            "userId",
            "uuid",
          ];
      // Getting the user information
      const user = await User.findOne({
        where: {
          uuid: userUuid,
        },
      });
      // Throw error if no user
      if (user === null) {
        throw new Error("No user found");
      }
      // Destructuring the user object
      const { id } = user.dataValues;
      // Retrieving the platform data
      const platform = await Platform.findOne({
        where: { id: platformId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          as: "applications",
          model: Application,
          attributes: {
            exclude: privateData,
          },
        },
      });
      // Throw error if no platform found
      if (platform === null) {
        throw new Error("Error, invalid platform id");
      }
      // Destructuring the platform object
      const { applications, id: platId, platformName } = platform.dataValues;
      // Filtering values from platform
      // TODO: figure out if whether its possible on the request
      const userApplications = applications
        .filter((app) => app.dataValues.userId === id)
        .map((app) => app.dataValues);

      const data = {
        id: platId,
        platformName: platformName,
        applications: userApplications,
      };

      res.send({
        msg: `Successfully returned applications for platform: ${platformName}`,
        platform: data,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        applications: null,
        msg: error.message || "Unable to find applications from platform:",
        platform: null,
        success: false,
      });
    }
  },
  createPlatform: async (req, res) => {
    // Destructuring the request body
    const { platformName } = req.body;
    try {
      // Error handling if no platform provided
      if (!platformName) {
        throw new Error("Missing platform name");
      }
      // Creating the new platform
      const newPlatform = await Platform.create({
        platformName: platformName.toLowerCase(),
      });

      res.send({
        msg: "Successfully added new platform",
        platform: newPlatform,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        msg: error.message || "",
        platform: null,
        success: false,
      });
    }
  },
  updatePlatform: async (req, res) => {
    try {
    } catch (error) {
      res.status(400).send({
        msg: error.message || "",
        platform: null,
        success: false,
      });
    }
  },
  deletePlatform: async (req, res) => {
    try {
    } catch (error) {
      res.status(400).send({
        msg: error.message || "",
        platform: null,
        success: false,
      });
    }
  },
};

module.exports = platformController;
