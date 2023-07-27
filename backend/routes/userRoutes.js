// NPM Modules
const express = require("express");
const router = express.Router({ mergeParams: true });
// Controller
const {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} = require("../controller/userController");

// GET
router.get("/api/user", getUser);
// POST
router.post("/api/createUser", createUser);
// PUT
router.put("/api/updateUser", updateUser);
// DELETE
router.delete("/api/deleteUser", deleteUser);

module.exports = router;
