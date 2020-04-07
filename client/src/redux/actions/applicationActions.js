// importing types
import ACTIONS from "./types";
// NPM Modules
import axios from "axios";
import history from "../../utils/history";
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
const intializeApplicationState = () => dispatch => {
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
const fetchApplications = () => dispatch => {
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
// //Pagination
// const fetchApplicationsList = (startingPoint, amountOfRecords) => dispatch => {
//   let requestedPagination = {
//     startingPoint,
//     amountOfRecords
//   };
//   axios
//     .get("/api/data/application", requestedPagination)
//     .then(data => {
//       dispatch({
//         type: ACTIONS.RETRIEVE_JOBS_LIST_PAGINATION,
//         payload: data
//       });
//     })
//     .catch(err => errorHandlerAxios(err, dispatch));
// };
const fetchApplicationsPerMonth = () => (dispatch, getState) => {
  let {
    currentTimeFrameMonth,
    currentTimeFrameYear,
    currentTimeFrame
  } = getState().ui;

  let unixTime =
    new Date(`${currentTimeFrameYear}.${currentTimeFrameMonth}.01`).getTime() /
    1000;

  axios
    .get("/api/data/application/timeframe", {
      params: {
        unixTime: unixTime,
        timeFrame: currentTimeFrame
      }
    })
    .then(data => {
      dispatch({
        type: ACTIONS.UPDATE_APPLICATION_TIME_FRAME,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, dispatch));
};
const fetchSingleJob = id => dispatch => {
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
const deleteApplication = (userId, jobId) => async dispatch => {
  try {
    const application = await axios.get("/api/data/application/single", {
      params: { jobId }
    });

    const {
      companyName,
      applicationLink,
      applicationPlatform
    } = application.data.application;

    await axios.delete("/api/data/application/", {
      params: {
        userId,
        jobId
      }
    });

    const data = {
      companyName,
      applicationLink,
      applicationPlatform,
      jobId
    };

    dispatch({
      type: ACTIONS.DELETE_APPLICATION,
      payload: data
    });
    history.push("/");
  } catch (err) {
    console.log(err);
    // dispatch({
    //       type: actionTypeError,
    //       payload: err.response.data
    //     });
  }
};

export default {
  changePaginationBeginning,
  changePaginationEnding,
  intializeApplicationState,
  fetchApplications,
  // fetchApplicationsList,
  fetchApplicationsPerMonth,
  fetchSingleJob,
  updateJobInformation,
  deleteApplication
};
