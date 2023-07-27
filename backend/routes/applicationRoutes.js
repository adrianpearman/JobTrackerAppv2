// NPM Modules
const express = require("express");
const router = express.Router({ mergeParams: true });
// Controller
const {
  addNewApplication,
  deleteApplication,
  getAllApplications,
  getIndividualApplication,
  updateApplication,
} = require("../controller/applicationController");
// Routes
// GET
// router.get("/api/analytics", appController.getApplicationAnalytics);
router.get("/api/application", getAllApplications);
router.get("/api/application/id", getIndividualApplication);
// POST
router.post("/api/application", addNewApplication);
// PUT
// router.put("/api/application/id", updateApplication);
// DELETE
// router.delete("/api/application/id", deleteApplication);

module.exports = router;
