// NPM Modules
const express = require("express");
const router = express.Router({ mergeParams: true });
// Controller
const checkAutherizationController = require("../controller/checkAutheriationController");

router.get("/api", checkAutherizationController.checkAutherized, (req, res) => {
  res.send({
    msg: "Authorized",
  });
});
module.exports = router;
