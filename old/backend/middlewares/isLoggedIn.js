const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Access Denied: You must be logged in" });
  }

  try {
    const verified = jwt.verify(token, keys.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
