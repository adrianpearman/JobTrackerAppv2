// NPM Modules
const express = require("express");
const router = express.Router({ mergeParams: true });
// Controller
const {
  createUser,
  createUserRole,
  deleteUser,
  deleteUserRole,
  getUser,
  getIndividualUserRole,
  getUserRoles,
  updateUser,
} = require("../controller/userController");
// Middlewares
const { checkAuthorized } = require("../middlewares");

// User Routes
// GET
router.get("/api/user", checkAuthorized, getUser);
// POST
router.post("/api/createUser", createUser);
// PUT
router.put("/api/updateUser", checkAuthorized, updateUser);
// DELETE
router.delete("/api/deleteUser", checkAuthorized, deleteUser);

// User Role Routes
// GET
router.get("/api/roles", checkAuthorized, getUserRoles);
router.get("/api/role", checkAuthorized, getIndividualUserRole);
// POST
router.post("/api/createRole", checkAuthorized, createUserRole);
// PUT
// DELETE
router.delete("/api/deleteRole", checkAuthorized, deleteUserRole);

module.exports = router;
