const mongoose = require("mongoose");
const keys = require("../config/keys");

module.exports = () => {
  if (process.env.NODE_ENV === "production") {
    return mongoose.connect(
      keys.MONGOURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      err => {
        if (err) {
          console.error(err);
        }
        console.log("Connected to Prodcution Database");
      }
    );
  } else {
    return mongoose.connect(
      keys.MONGOURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      err => {
        if (err) {
          console.error(err);
        }
        console.log("Connected to Development Database");
      }
    );
  }
};
