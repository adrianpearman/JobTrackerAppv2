// Models
const { User } = require("../databases/sql/models");
// Util functions
const {
  createUserApplicationAnalytics,
  deleteUserApplicationAnalytics,
} = require("../utils");

const userController = {
  createUser: async (req, res) => {
    // Destructuring request body
    const { firstName, lastName, email } = req.body;
    try {
      // Throwing errors if firstname is missing
      if (firstName === undefined) {
        throw new Error("First name cannot be blank");
      }
      // Throwing errors if lastname is missing
      if (lastName === undefined) {
        throw new Error("Last name cannot be blank");
      }
      // Throwing errors if email is missing
      if (email === undefined) {
        throw new Error("Email cannot be blank");
      }
      // Generating the user analytics
      const userAnalytics = await createUserApplicationAnalytics();
      // Destructuring user analytics
      const { analytics, msg, success } = userAnalytics;
      // Throwing an error if unable to create analytics
      if (success !== true) {
        throw new Error(msg);
      }
      // Creating the new user
      const user = await User.create({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        analyticsUuid: analytics.id,
      });

      res.send({
        analytics: userAnalytics.analytics.id,
        message: "Successfully created a new user",
        success: true,
        user: user,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        user: null,
      });
    }
  },
  deleteUser: async (req, res) => {
    // Destructuring request body
    const { userUuid } = req.body;
    try {
      // Throwing an error if no user uuid
      if (!userUuid) {
        throw new Error("User UUID is missing");
      }
      // Getting the user information
      const user = await User.findOne({
        where: {
          uuid: userUuid,
        },
      });
      // If no user exists, throw an error
      if (user === null) {
        throw new Error(`Unable to find user:${userUuid}`);
      }
      // Deleting the associated user analytics
      const deletedAnalytics = await deleteUserApplicationAnalytics(
        user.dataValues.analyticsUuid
      );
      const { msg, success } = deletedAnalytics;
      // If an error occured when deleting user analytics
      if (success === false) {
        throw new Error(msg);
      }
      // Deletfing the user
      const deletedUser = await User.destroy({
        where: {
          uuid: userUuid,
        },
      });
      // Throw an error if an error occured deleting the user
      if (deletedUser !== 1) {
        throw new Error(`Unable to delete user:${userUuid}`);
      }

      res.send({
        success: true,
        user: user,
        msg: `Successfully deleted User:${userUuid}`,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        user: null,
        msg: error.message || `An error occured, try again later`,
      });
    }
  },
  getUser: async (req, res) => {
    // Destructuring request body
    const { userUuid } = req.query;
    try {
      // Throwing an error if no user uuid
      if (!userUuid) {
        throw new Error("User UUID is missing");
      }
      // Getting the user information
      const user = await User.findOne({
        where: { uuid: userUuid },
      });

      res.send({
        message: "Successfully returned user",
        success: true,
        user: user,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message || "An error occured while retrieving User",
        success: true,
        user: null,
      });
    }
  },
  updateUser: async () => {},
};

module.exports = userController;
