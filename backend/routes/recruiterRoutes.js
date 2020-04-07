const express = require("express");
const router = express.Router();
const recruiterController = require("../controller/recruiterController");
const isLoggedIn = require("../middlewares/isLoggedIn");

// GET
// retrieve initial data
router.get("/api/data/recruiter/init", recruiterController.getInitRecruiters);
router.get("/api/data/recruiter/all", recruiterController.getRecruitersAll);
router.get(
  "/api/data/recruiter/single",
  recruiterController.getSingleRecruiter
);
//POST
router.post("/api/data/recruiter/", recruiterController.addRecruiter);
router.post("/api/data/recruiter/bulk", recruiterController.bulkAddRecruiter);
//PUT

//DELETE

module.exports = router;
