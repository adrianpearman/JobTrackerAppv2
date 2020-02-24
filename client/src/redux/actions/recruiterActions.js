// importing types
import ACTIONS from "./types";
// NPM Modules
import axios from "axios";
import { errorHandlerAxios } from "./utils";

const fetchRecruiters = () => dispatch => {
  axios
    .get("/api/data/recruiter")
    .then(data => {
      dispatch({
        type: ACTIONS.RETRIEVE_RECRUITER_LIST,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, "recruiter", dispatch));
};
const fetchSingleRecruiter = id => dispatch => {
  axios
    .get("/api/data/recruiter/single", id)
    .then(data => {
      dispatch({
        type: ACTIONS.RETRIEVE_SINGLE_RECRUITER,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, "recruiter", dispatch));
};

export default {
  fetchRecruiters,
  fetchSingleRecruiter
};
