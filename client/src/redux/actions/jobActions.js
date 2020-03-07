// importing types
import ACTIONS from "./types";
// NPM Modules
import axios from "axios";
import { errorHandlerAxios } from "./utils";

const changePaginationBeginning = value => dispatch => {
  dispatch({
    type: ACTIONS.INCREASE_JOBS_PAGINATION_BEGINNING,
    payload: value
  });
};
const changePaginationEnding = value => dispatch => {
  dispatch({
    type: ACTIONS.INCREASE_JOBS_PAGINATION_ENDING,
    payload: value
  });
};
const intializeJobState = () => dispatch => {
  axios
    .get("/api/data/application/init")
    .then(data => {
      dispatch({
        type: ACTIONS.INITIALIZE_JOB_STATE,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err));
};
const fetchJobs = () => dispatch => {
  axios
    .get("/api/data/application/all")
    .then(data => {
      dispatch({
        type: ACTIONS.RETRIEVE_JOBS_LIST,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, dispatch));
};
const fetchJobsList = (startingPoint, amountOfRecords) => dispatch => {
  let requestedPagination = {
    startingPoint,
    amountOfRecords
  };

  axios
    .get("/api/data/application", requestedPagination)
    .then(data => {
      dispatch({
        type: ACTIONS.RETRIEVE_JOBS_LIST_PAGINATION,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, dispatch));
};
const singleJob = id => dispatch => {
  axios
    .get("/api/data/application/single", id)
    .then(data => {
      dispatch({
        type: ACTIONS.RETRIEVE_SINGLE_JOB,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, dispatch));
};
const updateJobInformation = content => dispatch => {
  axios
    .put("/api/data/application/single", content)
    .then(data => {
      dispatch({
        type: ACTIONS.UPDATE_JOB_INFORMATION,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, dispatch));
};

export default {
  changePaginationBeginning,
  changePaginationEnding,
  intializeJobState,
  fetchJobs,
  fetchJobsList,
  singleJob,
  updateJobInformation
};
