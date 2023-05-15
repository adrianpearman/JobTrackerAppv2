// NPM Modules
const express = require("express");
const router = express.Router({ mergeParams: true });
// Controller
const applicationController = require("../controller/applicationController");
// Routes
// GET
router.get("/api/analytics", applicationController.getApplicationAnalytics);
router.get("/api/application", applicationController.getAllApplications);
router.get(
  "/api/application/id",
  applicationController.getIndividualApplication
);
router.get(
  "/api/application/company",
  applicationController.getApplicationsByCompany
);
// POST
router.post("/api/application", applicationController.addNewApplication);
// PUT
router.put("/api/application/id", applicationController.updateApplication);
// DELETE
router.delete("/api/application/id", applicationController.deleteApplication);

module.exports = router;
