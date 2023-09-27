//
const express = require("express");
const router = express.Router({ mergeParams: true });
//
const {
  getApplicationsByCompany,
  getCompanies,
} = require("../controller/companyController");
// Routes
// GET
router.get("/api/company", getApplicationsByCompany);
router.get("/api/companies", getCompanies);
// POST
// PUT
// DELETE

module.exports = router;
