// Models
const { Application, Role, User } = require("../databases/sql/models");
// Util functions
const {
  createSupabaseUser,
  createUserApplicationAnalytics,
  deleteSupabaseUser,
  deleteUserApplicationAnalytics,
  isAdminUser,
} = require("../utils");

const userController = {
  // User Actions
  createUser: async (req, res) => {
    // Destructuring request body
    const { firstName, lastName, email, password } = req.body;
    try {
      // Throwing error if firstname is missing
      if (firstName === undefined || firstName === "") {
        throw new Error("First name cannot be blank");
      }
      // Throwing error if lastname is missing
      if (lastName === undefined || lastName === "") {
        throw new Error("Last name cannot be blank");
      }
      // Throwing error if email is missing
      if (email === undefined || email === "") {
        throw new Error("Email cannot be blank");
      }
      // Throwing error if password is missing
      if (password === undefined || password === "") {
        throw new Error("Password cannot be blank");
      }
      // Throwing an error if password length is not at appropriate length
      if (password.length < 8) {
        throw new Error("Password must be longer than 7 characters");
      }
      // Generating the user analytics & destructuring user analytics response
      const { analytics, msg, success } =
        await createUserApplicationAnalytics();
      // Throwing an error if unable to create user analytics
      if (success !== true) {
        throw new Error(msg);
      }
      // Create supabase credentials
      const {
        data,
        error,
        success: supabaseSuccess,
      } = await createSupabaseUser({
        firstName,
        lastName,
        email,
        password,
      });
      // Throwing error if unable to create supabase credentials
      if (supabaseSuccess === false) {
        throw new Error(error);
      }

      // TODO: consider deleting values if errors occured

      // Creating the new user
      const user = await User.create({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        analyticsUuid: analytics.id,
        authUuid: data.user.id,
      });

      res.send({
        msg: "Successfully created a new user",
        success: true,
        user: user,
      });
    } catch (error) {
      res.status(400).send({
        msg: error.message,
        success: false,
        user: null,
      });
    }
  },
  deleteUser: async (req, res) => {
    // Retrieving value set from middleware
    const { user: spUser } = res.locals.supabaseUser;
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
      // Destructuring user obj
      const { authUuid, analyticsUuid, id } = user.dataValues;
      // Throwing error if account is attempted to be deleted by not the same user
      if (authUuid !== spUser.id) {
        throw new Error("Unauthorized to delete another user's account");
      }
      // Deleting associated supabase auth values
      const { error, success: supabaseSuccess } = await deleteSupabaseUser(
        authUuid
      );
      // If an error has occured when deleteing Supabase profile
      if (supabaseSuccess === false) {
        throw new Error(error);
      }
      // Deleting the associated user analytics
      const deletedAnalytics = await deleteUserApplicationAnalytics(
        analyticsUuid
      );
      // Destructuring useranalytics obj
      const { msg, success } = deletedAnalytics;
      // If an error occured when deleting user analytics
      if (success === false) {
        throw new Error(msg);
      }
      // Deleting all applications related to user
      await Application.destroy({
        where: {
          userId: id,
        },
      });
      // Deleting the user
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
    const { authUuid, searchByAuth = "false", userUuid } = req.query;
    try {
      // Throwing an error if no user uuid
      if (searchByAuth === "false" && !userUuid) {
        throw new Error("User UUID is missing");
      }

      const searchParam =
        searchByAuth === "false" ? { uuid: userUuid } : { authUuid: authUuid };
      // Getting the user information
      const user = await User.findOne({
        where: searchParam,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.send({
        msg: "Successfully returned user",
        success: true,
        user: user,
      });
    } catch (error) {
      res.status(400).send({
        msg: error.message || "An error occured while retrieving User",
        success: false,
        user: null,
      });
    }
  },
  updateUser: async (req, res) => {
    const { userUuid } = req.body;
    const data = req.body;

    try {
      // Throw error if no userUuid
      if (!userUuid) {
        throw new Error("Missing user id");
      }

      const user = await User.findOne({
        where: {
          uuid: userUuid,
        },
      });
      // Throwing error if no user is found
      if (!user) {
        throw new Error(`No user matching id: ${userUuid}`);
      }
      // TODO: Will need to validate and investigate this further
      if (data.hasOwnProperty("roleId")) {
        throw new Error("Unable to change role id");
      }
      // Deleting analytics if part of the object
      if (data.hasOwnProperty("analyticsUuid")) {
        delete data.analyticsUuid;
      }
      // Setting values to lowercase
      if (data.hasOwnProperty("firstName")) {
        data.firstName = data.firstName.toLowerCase();
      }
      if (data.hasOwnProperty("lastName")) {
        data.lastName = data.lastName.toLowerCase();
      }
      if (data.hasOwnProperty("email")) {
        data.email = data.email.toLowerCase();
      }
      // New object to represent updated user
      const updatedObj = {
        ...user.dataValues,
        ...data,
      };
      // Updating the user request
      const updateUserRequest = await User.update(updatedObj, {
        where: {
          uuid: userUuid,
        },
        returning: true,
        plain: true,
      });
      // Setting returned values to a variable for further processing
      const updatedUser = updateUserRequest[1].dataValues;
      // Removing values before sending back to the client
      delete updatedUser.id;
      delete updatedUser.uuid;
      delete updatedUser.createdAt;
      delete updatedUser.updatedAt;
      delete updatedUser.analyticsUuid;

      res.send({
        success: true,
        msg: `Successfully updated user ${userUuid}`,
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        msg: error.message || "An error has occured",
        user: null,
      });
    }
  },
  // User Roles Actions
  getUserRoles: async (req, res) => {
    try {
      // Retrieving all user roles
      const roles = await Role.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.send({
        success: true,
        roles: roles,
        msg: "Successfully returned all user roles",
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        roles: null,
        msg: error.message || "Unable to complete request",
      });
    }
  },
  getIndividualUserRole: async (req, res) => {
    // Destructuring Request
    const { roldeId } = req.query;
    try {
      // Returning the associated user role
      const roles = await Role.findAll({
        where: {
          id: roldeId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.send({
        success: true,
        roles: roles,
        msg: "",
      });
    } catch (error) {
      console.log(error);

      res.status(400).send({
        success: false,
        roles: null,
        msg: "",
      });
    }
  },
  createUserRole: async (req, res) => {
    // Destructuring req body
    const { role, userUuid } = req.body;

    try {
      // Destructuring returned object on Admin user function
      const { isAdmin, msg } = await isAdminUser(userUuid);
      // Throwing an error if not an admin
      if (!isAdmin) {
        throw new Error(msg);
      }
      // Throwing error if no role
      if (!role) {
        throw new Error("Missing role");
      }
      // Creating the new role
      const newRole = await Role.create({
        role: role.toLowerCase(),
      });

      res.send({
        success: true,
        role: newRole,
        msg: `Successfully created new role: ${role}`,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        role: null,
        msg: error.message || "unable to perform request",
      });
    }
  },
  updateUserRole: async (req, res) => {},
  deleteUserRole: async (req, res) => {
    // Destructuring the req body
    const { role, userUuid } = req.body;

    try {
      // Validate whether user is an admin user
      const { isAdmin, msg } = await isAdminUser(userUuid);
      //  Throw error if it's not an admin
      if (!isAdmin) {
        throw new Error(msg);
      }
      // Throw error if no role is provided
      if (!role) {
        throw new Error("Missing role");
      }
      // Throw error if admin role is attempted to be deleted
      if (role.toLowerCase() === "admin") {
        throw new Error("Unable to delete Admin role");
      }
      // Deleting the role
      const deletedRole = await Role.destroy({
        where: {
          role: role.toLowerCase(),
        },
      });
      // Throw error for role that does not exist
      if (deletedRole === 0) {
        throw new Error(`Error: no role called ${role}`);
      }

      res.send({
        msg: `Successfully deleted role: ${role}`,
        success: true,
      });
    } catch (error) {
      res.status(400).send({
        msg: error.message || "Unable to perform the request",
        success: false,
      });
    }
  },
};

module.exports = userController;
