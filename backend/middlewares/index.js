const { isValidAuthSession } = require("../utils");

module.exports = {
  checkAuthorized: async (req, res, next) => {
    // destructoring header
    const { session_token } = req.headers;

    try {
      const { msg, success } = await isValidAuthSession(session_token);
      // throw an error if the sesison is invalid
      if (success === false) {
        throw new Error(msg);
      }
      // allowing next function to run
      next();
    } catch (error) {
      res.status(403).send({
        success: false,
        msg: error.message || "Unauthorized",
      });
    }
  },
};
