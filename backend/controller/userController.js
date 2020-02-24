const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const keys = require("../config/keys");
const User = require("../models/userModel.js");

const userController = {
  createUser: async (req, res) => {
    const saltRounds = 12;
    const { email, name, passwordFromClient } = req.body;

    let bcryptPwd = await bcrypt.hash(passwordFromClient, saltRounds);

    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send({ message: "email currently in use" });
    }

    try {
      const newUser = new User({
        email,
        name,
        password: bcryptPwd
      });

      await newUser.save();
      res.json(newUser);
    } catch (err) {
      res.status(400).send({
        error: "Unknown Error Occurred",
        errMSG: err
      });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({
        error: "Email not in use, please check email or create an account"
      });
    }

    let bcryptCompare = await bcrypt.compare(password, user.password);
    if (!bcryptCompare) {
      return res.status(400).send({
        errMsg: "incorrect information, please re-check provided content"
      });
    }

    const { _id } = user;
    const token = jwt.sign({ _id }, keys.TOKEN_SECRET);
    res.header("auth-token", token).send(user);
  }
};

module.exports = userController;
