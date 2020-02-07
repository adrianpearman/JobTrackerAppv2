// importing types
import ACTIONS from "./types";

// NPM Modules
import axios from "axios";

// Err Handler Error
const errorHandlerAxios = err => dispatch => {
  dispatch({
    type: ACTIONS.RETRIEVE_DATA_ERROR,
    payload: err
  });
};
export const changePaginationBeginning = value => dispatch => {
  dispatch({
    type: ACTIONS.INCREASE_PAGINATION_BEGINNING,
    payload: value
  });
};
export const changePaginationEnding = value => dispatch => {
  dispatch({
    type: ACTIONS.INCREASE_PAGINATION_ENDING,
    payload: value
  });
};
export const intializeJobState = job => dispatch => {
  dispatch({
    type: ACTIONS.INITIALIZE_JOB_STATE,
    payload: job
  });
};
export const fetchJobs = () => dispatch => {
  axios
    .get("/api/data/all")
    .then(data => {
      dispatch({
        type: ACTIONS.RETRIEVE_JOBS_LIST,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, dispatch));
};
export const fetchJobsList = (startingPoint, amountOfRecords) => dispatch => {
  let requestedPagination = {
    startingPoint,
    amountOfRecords
  };

  axios
    .get("/api/data", requestedPagination)
    .then(data => {
      dispatch({
        type: ACTIONS.RETRIEVE_JOBS_LIST_PAGINATION,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, dispatch));
};
export const singleJob = id => dispatch => {
  axios
    .get("/api/data/single", id)
    .then(data => {
      dispatch({
        type: ACTIONS.RETRIEVE_SINGLE_JOB,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, dispatch));
};
export const postSingleJob = content => dispatch => {
  axios
    .post("/api/data", content)
    .then(data => {
      dispatch({
        type: ACTIONS,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, dispatch));
};
export const updateJobInformation = content => dispatch => {
  axios
    .put("/api/data/single", content)
    .then(data => {
      dispatch({
        type: ACTIONS.UPDATE_JOB_INFORMATION,
        payload: data
      });
    })
    .catch(err => errorHandlerAxios(err, dispatch));
};
// Input Form Actions
export const onInputHandler = e => dispatch => {
  const id = e.target.id;
  let content = e.target.value;
  // returns values from the select input as boolean
  if (content === "false") {
    content = false;
  }
  if (content === "true") {
    content = true;
  }
  let inputChange = { id, content };
  dispatch({
    type: ACTIONS.UPDATED_INPUT_FIELD,
    payload: inputChange
  });
};

export const onClickHandler = state => {
  const existingContent = state;
  let newContentObject = {};
  // prunes the existing object for values that are not filled in
  Object.keys(existingContent).forEach(function(key) {
    if (existingContent[key] !== "") {
      let newKey = key;
      let newValues = existingContent[key];
      newContentObject[newKey] = newValues;
      return newContentObject;
    }
  });
  console.log(newContentObject);
  axios
    .put("/api/data/single", newContentObject)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
};

//Bulk Upload
export const handleFileSelect = e => dispatch => {
  let file = e.target.files[0];
  if (file.type !== "type/csv") {
    dispatch({
      type: ACTIONS.CSV_UPLOAD_VALID,
      payload: false
    });
  }

  let reader = new FileReader();
  reader.onload = event => {
    let data = event.target.result.split(/(?:\\[rn]|[\r\n]+)+/g);
    dispatch({
      type: ACTIONS.CSV_UPLOAD_VALID,
      payload: true
    });
    dispatch({
      type: ACTIONS.CSV_UPLOAD_DATA,
      payload: data
    });
  };
  reader.readAsText(file);
};

export const handleSubmitFile = () => (dispatch, getState) => {
  let data = { data: getState().bulkUploadReducer.csvData };
  axios
    .post("/api/data/bulk", data)
    .then(res => {
      console.log(res);
      document.getElementById("files").value = "";
      dispatch({
        type: ACTIONS.CSV_UPLOAD_SUCCESSFULL,
        payload: true
      });
      dispatch({
        type: ACTIONS.CSV_UPLOAD_VALID,
        payload: null
      });
      dispatch({
        type: ACTIONS.CSV_UPLOAD_DATA,
        payload: null
      });
      setTimeout(() => {
        dispatch({
          type: ACTIONS.CSV_UPLOAD_SUCCESSFULL,
          payload: null
        });
      }, 2000);
    })
    .catch(err => {
      dispatch({
        type: ACTIONS.CSV_UPLOAD_SUCCESSFULL,
        payload: false
      });

      console.log(err);
    });
};

export const clearSubmitFile = () => dispatch => {
  document.getElementById("files").value = "";
  dispatch({
    type: ACTIONS.CSV_UPLOAD_CLEAR_DATA
  });
};
