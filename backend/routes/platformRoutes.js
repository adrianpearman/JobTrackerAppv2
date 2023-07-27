// NPM Modules
const express = require("express");
const router = express.Router({ mergeParams: true });
// Controller
const {
  createPlatform,
  deletePlatform,
  getApplicationsByPlatform,
  getPlatforms,
  getIndividualPlatform,
  updatePlatform,
} = require("../controller/platformController");

// GET
router.get("/api/platforms", getPlatforms);
router.get("/api/platform", getIndividualPlatform);
router.get("/api/platform/applications", getApplicationsByPlatform);
// POST
router.post("/api/addPlatform", createPlatform);
// PUT
// router.put("/api/updatePlatform", updatePlatform);
// DELETE
// router.delete("/api/deletePlatform", deletePlatform);

module.exports = router;
