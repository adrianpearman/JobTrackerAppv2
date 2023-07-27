// NPM Modules
const { Application, Platform } = require("../models");

//
const platformController = {
  getPlatforms: async (req, res) => {
    try {
      const platforms = await Platform.findAll();

      res.send({
        message: "Successfully retrieved platforms",
        platforms: platforms,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        platforms: null,
        success: false,
      });
    }
  },
  getIndividualPlatform: async (req, res) => {
    const { platformId } = req.query;
    try {
      if (platformId === null || platformId === undefined) {
        throw new Error("Missing platformId");
      }

      console.log(platformId);

      const platform = await Platform.findOne({
        where: { id: platformId },
      });

      res.send({
        message: `Successfully returned platform:${platformId}`,
        platform: platform,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message || "",
        platform: null,
        success: false,
      });
    }
  },
  getApplicationsByPlatform: async (req, res) => {
    const { platformId } = req.query;

    try {
      if (!platformId) {
        throw new Error("Missing Platform ID");
      }

      const platform = await Platform.findOne({
        where: { id: platformId },
        include: {
          as: "applications",
          model: Application,
        },
      });

      res.send({
        applications: null,
        message: "",
        platform: platform,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        applications: null,
        message: error.message || "Unable to find applications from platform:",
        platform: null,
        success: false,
      });
    }
  },
  createPlatform: async (req, res) => {
    const { platformName } = req.body;
    try {
      if (!platformName) {
        throw new Error("Missing platform name");
      }

      const newPlatform = await Platform.create({
        platformName: platformName.toLowerCase(),
      });

      res.send({
        message: "Successfully added new platform",
        platform: newPlatform,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message || "",
        platform: null,
        success: false,
      });
    }
  },
  updatePlatform: async (req, res) => {
    try {
    } catch (error) {
      res.status(400).send({
        message: error.message || "",
        platform: null,
        success: false,
      });
    }
  },
  deletePlatform: async (req, res) => {
    try {
    } catch (error) {
      res.status(400).send({
        message: error.message || "",
        platform: null,
        success: false,
      });
    }
  },
};

module.exports = platformController;
