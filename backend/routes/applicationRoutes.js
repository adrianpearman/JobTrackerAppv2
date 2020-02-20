const express = require("express");
const router = express.Router();
const applicationController = require("../controller/applicationController");
const isLoggedIn = require("../middlewares/isLoggedIn");

//GET REQUESTS
// retieve all of the applications
router.get("/api/data/application/all", applicationController.getAllJobs);
// retrieve paginated list of items
router.get("/api/data/application", applicationController.getJobsPagination);
// retrieve a single application
router.get("/api/data/application/single", applicationController.getSingleJob);
// retrieve for month
router.get(
  "/api/data/application/month",
  applicationController.getJobsPerMonth
);
// retrieve for year
router.get("/api/data/application/year", applicationController.getJobsPerYear);
// retrieve company name
router.get(
  "/api/data/application/company",
  applicationController.getJobsFromCompany
);

//POST REQUESTS
// add a single application
router.post("/api/data/application", applicationController.addApplication);
// bulk upload applications
router.post(
  "/api/data/application/bulk",
  applicationController.bulkAddApllication
);

//PUT REQUESTS
// updating a single application
router.put(
  "/api/data/application/single",
  isLoggedIn,
  applicationController.updateJobApplication
);

//DELETE REQUESTS
// delete a single job application
router.delete(
  "/api/data/application",
  isLoggedIn,
  applicationController.deleteApplication
);

module.exports = router;
