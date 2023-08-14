// NPM Modules
const express = require("express");
const router = express.Router({ mergeParams: true });
// Controller
const {
  addNewApplication,
  deleteApplication,
  getAllApplications,
  getApplicationAnalytics,
  getIndividualApplication,
  updateApplication,
} = require("../controller/applicationController");
// Routes
// GET
router.get("/api/analytics", getApplicationAnalytics);
router.get("/api/applications", getAllApplications);
router.get("/api/application", getIndividualApplication);
// POST
router.post("/api/application", addNewApplication);
// PUT
// router.put("/api/application/id", updateApplication);
// DELETE
router.delete("/api/application", deleteApplication);

module.exports = router;
