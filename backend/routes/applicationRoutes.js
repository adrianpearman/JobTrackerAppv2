const express = require("express");
const router = express.Router({ mergeParams: true });
const applicationController = require("../controller/applicationController");
const isLoggedIn = require("../middlewares/isLoggedIn");

//GET REQUESTS
// retrieve initial data
router.get(
  "/api/data/application/init",
  applicationController.getInitApplications
);
// retieve all of the applications
router.get(
  "/api/data/application/all",
  applicationController.getAllApplications
);
// retrieve paginated list of items
router.get(
  "/api/data/application",
  applicationController.getApplicationsPagination
);
// retrieve a single application
router.get(
  "/api/data/application/single",
  applicationController.getSingleApplication
);
// retrieve for month
router.get(
  "/api/data/application/month",
  applicationController.getApplicationsPerMonth
);
// retrieve for year
router.get(
  "/api/data/application/year",
  applicationController.getApplicationsPerYear
);
// retrieve company name
router.get(
  "/api/data/application/company",
  applicationController.getApplicationsFromCompany
);
// retrieve for spefic timeframe
router.get(
  "/api/data/application/timeframe",
  applicationController.getApplicationsPerTimeFrame
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
  applicationController.updateApplication
);

//DELETE REQUESTS
// delete a single job application
router.delete(
  "/api/data/application",
  // isLoggedIn,
  applicationController.deleteApplication
);

module.exports = router;
