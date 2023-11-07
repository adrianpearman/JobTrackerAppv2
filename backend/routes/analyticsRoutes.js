// NPM Modules
const express = require("express");
const router = express.Router({ mergeParams: true });
// Middlewares
const { checkAuthorized } = require("../middlewares");
// Controller
const {
  getApplicationAnalytics,
} = require("../controller/analyticsController");
// Routes
// GET
router.get("/api/analytics", getApplicationAnalytics);
// POST
// PUT
// DELETE

module.exports = router;
