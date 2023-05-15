// importing types
import ACTIONS from "./types";
// NPM Modules
import axios from "axios";
import history from "../../utils/history";
import { errorHandlerAxios } from "./utils";

const initializeRecruiterState = () => (dispatch) => {
  axios
    .get("/api/data/recruiter/init")
    .then((data) => {
      dispatch({
        type: ACTIONS.INITIALIZE_RECRUITER_STATE,
        payload: data,
      });
    })
    .catch((err) => errorHandlerAxios(err));
};
const fetchRecruiters = () => (dispatch) => {
  axios
    .get("/api/data/recruiter/all")
    .then((data) => {
      dispatch({
        type: ACTIONS.RETRIEVE_RECRUITER_LIST,
        payload: data,
      });
    })
    .catch((err) => errorHandlerAxios(err, "recruiter", dispatch));
};
const fetchSingleRecruiter = (id) => (dispatch) => {
  axios
    .get("/api/data/recruiter/single", id)
    .then((data) => {
      dispatch({
        type: ACTIONS.RETRIEVE_SINGLE_RECRUITER,
        payload: data,
      });
    })
    .catch((err) => errorHandlerAxios(err, "recruiter", dispatch));
};
const fetchRecruitersPerMonth = () => async (dispatch, getState) => {
  let {
    currentTimeFrameMonth,
    currentTimeFrameYear,
    currentTimeFrame,
  } = getState().ui;

  let unixTime = new Date(
    `${currentTimeFrameYear}.${currentTimeFrameMonth}.01`
  ).getTime();

  try {
    let recruiters = await axios.get("/api/data/recruiter/timeframe", {
      params: {
        unixTime: unixTime,
        timeFrame: currentTimeFrame,
      },
    });
    dispatch({
      type: ACTIONS.UPDATE_RECRUITER_TIME_FRAME,
      payload: recruiters,
    });
  } catch (err) {
    errorHandlerAxios(err, dispatch);
  }
};

export default {
  initializeRecruiterState,
  fetchRecruiters,
  fetchSingleRecruiter,
  fetchRecruitersPerMonth,
};
