// Models
const { User } = require("../databases/sql/models");
const AnalyticsModel = require("../databases/mongo/models/analytic");
// Util functions
const {} = require("../utils");

const applicationController = {
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

      const { analyticsUuid, firstName, lastName } = user.dataValues;
      // getting the associated user analytics
      const userAnalytics = await AnalyticsModel.findOne(
        {
          _id: analyticsUuid,
        },
        // this omits the id from the returned values
        { _id: 0 }
      );

      const data = {
        ...userAnalytics._doc,
        firstName,
        lastName,
      };

      res.send({
        success: true,
        userAnalytics: data,
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
};

module.exports = applicationController;
