const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");

const userController = {
  createUser: (req, res) => {
    const saltRounds = 12;
    const email = req.body.email;
    const name = req.body.name;
    const passwordFromClient = req.body.password;

    bcrypt.hash(passwordFromClient, saltRounds, (err, password) => {
      User.find({ email: email })
        .then(data => {
          const newUser = new User({
            email,
            name,
            password
          });

          if (data.length !== 0) {
            res.json({
              message: "email currently in use"
            });
          } else {
            newUser.save().then(data => {
              res.json(data);
            });
          }
        })
        .catch(err => {
          res.json({
            error: "Unknown Error Occurred",
            errMSG: err
          });
        });
    });
  },
  loginUser: (req, res) => {
    const email = req.body.email;

    User.find({ email: email })
      .then(data => {
        // No user found scenario
        if (!data) {
          res.json({
            error: "Email not in use, please check email or create an account"
          });
        } else {
          bcrypt.compare(req.body.password, data[0].password, (err, result) => {
            if (result !== true) {
              res.json({
                error:
                  "incorrect information, please re-check provided content",
                errMsg: err
              });
            } else {
              res.json(data);
            }
          });
        }
      })
      .catch(err => {
        res.json({
          error: "Unknown Error Occurred",
          errMSG: err
        });
      });
  }
};

module.exports = userController;
