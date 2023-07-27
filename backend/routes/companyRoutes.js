//
const express = require("express");
const router = express.Router({ mergeParams: true });
//
const { getApplicationsByCompany } = require("../controller/companyController");
// Routes
// GET
router.get("/api/company", getApplicationsByCompany);
// POST
// PUT
// DELETE

module.exports = router;
