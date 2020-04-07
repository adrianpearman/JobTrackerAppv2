// importing types
import ACTIONS from "./types";
// NPM Modules
import axios from "axios";
import history from "../../utils/history";

// Input Form Actions
const onInputHandler = (e, form) => dispatch => {
  const id = e.target.id;
  let content = e.target.value;

  if (content === "false") {
    content = false;
  }
  if (content === "true") {
    content = true;
  }

  // returns values from the select input as boolean
  let actionType =
    form === "recruiter"
      ? ACTIONS.UPDATED_RECRUITER_INPUT_FIELD
      : ACTIONS.UPDATED_JOB_INPUT_FIELD;
  let inputChange = { id, content };
  dispatch({
    type: actionType,
    payload: inputChange
  });
};

const disableSubmitButton = () => () => {};

const onSubmitNewContentHandler = form => async (dispatch, getState) => {
  let actionType, actionTypeError, content, url, historyURL;
  if (form === "recruiter") {
    actionType = ACTIONS.ADD_NEW_RECRUITER;
    actionTypeError = ACTIONS.ADD_NEW_RECRUITER_ERROR;
    content = getState().form.recruiterForm;
    url = "/api/data/recruiter/";
    historyURL = "/recruiters";
  } else {
    actionType = ACTIONS.ADD_NEW_APPLICATION;
    actionTypeError = ACTIONS.ADD_NEW_APPLICATION_ERROR;
    content = getState().form.applicationForm;
    url = "/api/data/application/";
    historyURL = "/";
  }
  content.userId = getState().user.userId;

  try {
    let submitContent = await axios.post(url, content);
    dispatch({
      type: actionType,
      payload: submitContent
    });
    history.push(historyURL);
  } catch (err) {
    dispatch({
      type: actionTypeError,
      payload: err.response.data
    });
  }
};
const onSubmitUpdatedContentHandler = () => (dispatch, getState) => {
  console.log(getState());
  const existingContent = getState();
  let newContentObject = {};
  // prunes the existing object for values that are not filled in
  Object.keys(existingContent).forEach(function(key) {
    if (existingContent[key] !== "") {
      newContentObject[key] = existingContent[key];
      return newContentObject;
    }
  });
  console.log(newContentObject);
  axios
    .put("/api/data/application/single", newContentObject)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
};
//Bulk Upload
const handleFileSelect = e => dispatch => {
  let file = e.target.files[0];

  if (file.type !== "text/csv") {
    dispatch({
      type: ACTIONS.CSV_JOBS_UPLOAD_VALID,
      payload: false
    });
  }
  let id = e.target.id;

  let reader = new FileReader();
  reader.onload = event => {
    let content = {
      id: id,
      data: event.target.result.split(/(?:\\[rn]|[\r\n]+)+/g)
    };

    dispatch({
      type: ACTIONS.CSV_JOBS_UPLOAD_VALID,
      payload: true
    });
    dispatch({
      type: ACTIONS.CSV_JOBS_UPLOAD_DATA,
      payload: content
    });
  };
  reader.readAsText(file);
};

const handleSubmitFile = e => async (dispatch, getState) => {
  let data;
  if (e === "csvDataApplication") {
    data = { data: getState().bulkUploadReducer.csvDataApplication };
  } else if (e === "csvDataRecruiter") {
    data = { data: getState().bulkUploadReducer.csvDataRecruiter };
  }

  let url =
    e === "csvDataApplication"
      ? "/api/data/application/bulk"
      : "/api/data/recruiter/bulk";

  try {
    await axios.post(url, data);
    document.getElementById(e).value = "";
    dispatch({
      type: ACTIONS.CSV_JOBS_UPLOAD_SUCCESSFULL,
      payload: true
    });
    dispatch({
      type: ACTIONS.CSV_JOBS_UPLOAD_VALID,
      payload: null
    });
    dispatch({
      type: ACTIONS.CSV_JOBS_UPLOAD_DATA,
      payload: {
        id: e,
        data: null
      }
    });
    setTimeout(() => {
      dispatch({
        type: ACTIONS.CSV_JOBS_UPLOAD_SUCCESSFULL,
        payload: null
      });
    }, 2000);
  } catch (err) {
    dispatch({
      type: ACTIONS.CSV_JOBS_UPLOAD_SUCCESSFULL,
      payload: false
    });

    console.log(err);
  }
};

const clearSubmitFile = e => dispatch => {
  document.getElementById(`${e}`).value = "";
  dispatch({
    type: ACTIONS.CSV_JOBS_UPLOAD_CLEAR_DATA
  });
};

export default {
  clearSubmitFile,
  disableSubmitButton,
  handleFileSelect,
  handleSubmitFile,
  onInputHandler,
  onSubmitNewContentHandler,
  onSubmitUpdatedContentHandler
};
