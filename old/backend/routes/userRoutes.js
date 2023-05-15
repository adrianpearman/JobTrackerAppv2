const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// Create a brand new user
router.post("/api/create/user", userController.createUser);
// Login In User
router.post("/api/login/user", userController.loginUser);

module.exports = router;
