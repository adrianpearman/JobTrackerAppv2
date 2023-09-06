const { isValidAuthSession } = require("../utils");

module.exports = {
  checkAuthorized: async (req, res, next) => {
    // Destructoring header
    const { session_token } = req.headers;

    try {
      const { data, msg, success } = await isValidAuthSession(session_token);
      // Throw an error if the sesison is invalid
      if (success === false) {
        throw new Error(msg);
      }
      // Setting a res.local value related to validated user
      res.locals.supabaseUser = data;
      // Allowing next function to run
      next();
    } catch (error) {
      res.status(403).send({
        success: false,
        msg: error.message || "Unauthorized",
      });
    }
  },
};
