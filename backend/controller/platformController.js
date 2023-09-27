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

    try {
      // Error handling if no platform provided
      if (!platformId) {
        throw new Error("Missing Platform ID");
      }
      let platform;

      // Returning the platform and it's associatied applications
      // For private request, it'll return all requests related to the user
      if (isPrivate === "true") {
        // Throwing an error if no user uuid is provided
        if (!userUuid) {
          throw new Error("User UUID missing");
        }
        // Getting the user information
        const user = await User.findOne({
          where: {
            uuid: userUuid,
          },
        });
        // Destructuring the user object
        const { id } = user.dataValues;
        // Retrieving the platform data
        platform = await Platform.findOne({
          where: { id: platformId },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: {
            as: "applications",
            model: Application,
            where: {
              userId: id,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        });
      }
      // For non private, it'll return all applications per platform but user data removed
      else {
        platform = await Platform.findOne({
          where: { id: platformId },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: {
            as: "applications",
            model: Application,
            attributes: {
              exclude: [
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
              ],
            },
          },
        });
      }
      // Destructuring the platform object
      const { platformName } = platform.dataValues;

      res.send({
        msg: `Successfully returned applications for platform: ${platformName}`,
        platform: platform,
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
