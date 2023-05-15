// importing types
import ACTIONS from "./types";
// NPM Modules
import axios from "axios";
import history from "../../utils/history";
import { errorHandlerAxios } from "./utils";

const changePaginationBeginning = (value) => (dispatch) => {
  dispatch({
    type: ACTIONS.INCREASE_APPLICATIONS_PAGINATION_BEGINNING,
    payload: value,
  });
};
const changePaginationEnding = (value) => (dispatch) => {
  dispatch({
    type: ACTIONS.INCREASE_APPLICATIONS_PAGINATION_ENDING,
    payload: value,
  });
};
const intializeApplicationState = () => async (dispatch) => {
  try {
    let data = await axios.get("/api/data/application/init");
    dispatch({
      type: ACTIONS.INITIALIZE_JOB_STATE,
      payload: data,
    });
  } catch (err) {
    errorHandlerAxios(err);
  }
};
const fetchApplications = () => async (dispatch) => {
  try {
    let applications = await axios.get("/api/data/application/all");
    dispatch({
      type: ACTIONS.RETRIEVE_APPLICATIONS_LIST,
      payload: applications,
    });
  } catch (err) {
    errorHandlerAxios(err, dispatch);
  }
};
const fetchApplicationsPerMonth = () => async (dispatch, getState) => {
  let {
    currentTimeFrameMonth,
    currentTimeFrameYear,
    currentTimeFrame,
  } = getState().ui;

  let unixTime = new Date(
    `${currentTimeFrameYear}.${currentTimeFrameMonth}.01`
  ).getTime();

  try {
    let applications = await axios.get("/api/data/application/timeframe", {
      params: {
        unixTime: unixTime,
        timeFrame: currentTimeFrame,
      },
    });
    dispatch({
      type: ACTIONS.UPDATE_APPLICATION_TIME_FRAME,
      payload: applications,
    });
  } catch (err) {
    errorHandlerAxios(err, dispatch);
  }
};
const fetchSingleApplication = (id) => async (dispatch) => {
  try {
    let application = await axios.get("/api/data/application/single", id);
    dispatch({
      type: ACTIONS.RETRIEVE_SINGLE_APPLICATION,
      payload: application,
    });
  } catch (err) {
    errorHandlerAxios(err, dispatch);
  }
};
const fetchApplicationsFromCompanyList = () => async (dispatch) => {
  try {
    let companies = await axios.get("/api/data/application/companies");
    dispatch({
      type: ACTIONS.RETRIEVE_COMPANIES_LIST,
      payload: companies,
    });
  } catch (err) {
    errorHandlerAxios(err, dispatch);
  }
};
const fetchApplicationsFromCompany = (company) => async (dispatch) => {
  try {
    let applicationData = await axios.get(
      "/api/data/application/companies/company",
      {
        params: {
          companyName: company,
        },
      }
    );

    let {
      applications,
      applicationResponses,
      applicationsPerMonth,
    } = applicationData.data;

    dispatch({
      type: ACTIONS.RETRIEVE_COMPANY,
      payload: {
        applications,
        applicationResponses,
        applicationsPerMonth,
        companyName: company,
      },
    });
  } catch (err) {
    errorHandlerAxios(err, dispatch);
  }
};
const updateJobInformation = (content) => async (dispatch) => {
  try {
    let application = await axios.put("/api/data/application/single", content);
    dispatch({
      type: ACTIONS.UPDATE_APPLICATION_INFORMATION,
      payload: application,
    });
  } catch (err) {
    errorHandlerAxios(err, dispatch);
  }
};
const deleteApplication = (userId, jobId) => async (dispatch) => {
  try {
    const application = await axios.get("/api/data/application/single", {
      params: { jobId },
    });

    const {
      companyName,
      applicationLink,
      applicationPlatform,
    } = application.data.application;

    await axios.delete("/api/data/application/", {
      params: {
        userId,
        jobId,
      },
    });

    const data = {
      companyName,
      applicationLink,
      applicationPlatform,
      jobId,
    };

    dispatch({
      type: ACTIONS.DELETE_APPLICATION,
      payload: data,
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
//         type: ACTIONS.RETRIEVE_APPLICATIONS_LIST_PAGINATION,
//         payload: data
//       });
//     })
//     .catch(err => errorHandlerAxios(err, dispatch));
// };
export default {
  changePaginationBeginning,
  changePaginationEnding,
  intializeApplicationState,
  fetchApplications,
  // fetchApplicationsList,
  fetchApplicationsFromCompany,
  fetchApplicationsFromCompanyList,
  fetchApplicationsPerMonth,
  fetchSingleApplication,
  updateJobInformation,
  deleteApplication,
};
