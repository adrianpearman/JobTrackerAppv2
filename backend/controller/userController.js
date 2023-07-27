//
const { User } = require("../models");

const userController = {
  createUser: async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
      if (firstName === undefined) {
        throw new Error("First name cannot be blank");
      }
      if (lastName === undefined) {
        throw new Error("Last name cannot be blank");
      }
      if (email === undefined) {
        throw new Error("Email cannot be blank");
      }

      const user = await User.create({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
      });

      res.send({
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
  deleteUser: async () => {},
  getUser: async (req, res) => {
    const { userUuid } = req.query;
    try {
      const user = await User.findOne({
        where: { uuid: userUuid },
      });

      res.send({
        message: "Successfully ",
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
