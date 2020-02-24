// importing types
import ACTIONS from "./types";
// NPM Modules
import axios from "axios";
import { errorHandlerAxios } from "./utils";

const createUser = data => dispatch => {
  axios
    .post("/api/create/user", data)
    .then(user => {
      console.log(user);
    })
    .catch(err => {
      console.log(err);
    });
};

const loginUser = data => dispatch => {
  axios
    .post("/api/login/user", data)
    .then(user => {
      console.log(user);
    })
    .catch(err => {
      console.log(err);
    });
};

export default {
  createUser,
  loginUser
};
