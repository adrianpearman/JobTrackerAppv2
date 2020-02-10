const express = require("express");
const router = express.Router();
const recruiterController = require("../controller/recruiterController");
const isLoggedIn = require("../middlewares/isLoggedIn");

// GET
router.get("/api/data/recruiter/all", recruiterController.getRecruitersAll);

//POST
router.get("/api/data/recruiter/single", recruiterController.addRecruiter);
router.post("/api/data/recruiter/bulk", recruiterController.bulkAddRecruiter);
//PUT

//DELETE

module.exports = router;
