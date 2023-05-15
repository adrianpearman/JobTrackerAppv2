const admin = require("../firebase/firebaseAdmin");

const checkAutheriationController = {
  checkAutherized: async (req, res, next) => {
    if (req.headers.authtoken) {
      try {
        await admin.auth().verifyIdToken(req.headers.authtoken);
        next();
      } catch (err) {
        res.status(403).send({
          msg: "Unauthorized",
        });
      }
    } else {
      res.status(403).send({
        msg: "Unauthorized",
      });
    }
  },
};

module.exports = checkAutheriationController;