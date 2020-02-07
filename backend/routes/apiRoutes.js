const express = require("express");
const router = express.Router();
const apiController = require("../controller/apiController");
const isLoggedIn = require("../middlewares/isLoggedIn");

//GET REQUESTS
// retieve all of the applications
router.get("/api/data/all", apiController.getAllJobs);
// retrieve paginated list of items
router.get("/api/data", apiController.getJobsPagination);
// retrieve a single application
router.get("/api/data/single", apiController.getSingleJob);
// retrieve for month
router.get("/api/data/month", apiController.getJobsPerMonth);
// retrieve for year
router.get("/api/data/year", apiController.getJobsPerYear);
// retrieve company name
router.get("/api/data/company", apiController.getJobsFromCompany);

//POST REQUESTS
// add a single application
router.post("/api/data", isLoggedIn, apiController.addApplication);
// bulk upload applications
router.post("/api/data/bulk", apiController.bulkAddApllication);

//PUT REQUESTS
// updating a single application
router.put("/api/data/single", isLoggedIn, apiController.updateJobApplication);

//DELETE REQUESTS
// delete a single job application
router.delete("/api/data", isLoggedIn, apiController.deleteApplication);

module.exports = router;
