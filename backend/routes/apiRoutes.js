const express = require("express");
const router = express.Router();
const apiController = require("../controller/apiController");

// retieve all of the applications
router.get("/api/data/all", apiController.getAllJobs);
// retrieve paginated list of items
router.get("/api/data", apiController.getJobsPagination);
// retrieve a single application
router.get("/api/data/single", apiController.getSingleJob);
// add a single application
router.post("/api/data", apiController.addApplication);
// updating a single application
router.put("/api/data/single", apiController.updateJobApplication);
// delete a single job application
router.delete("/api/data", apiController.deleteApplication);
// retrieve for month
router.get("/api/data/month", apiController.getJobsPerMonth);
// retrieve for year
router.get("/api/data/year", apiController.getJobsPerYear);
// retrieve company name
router.get("/api/data/company", apiController.getJobsFromCompany);

module.exports = router;

//
