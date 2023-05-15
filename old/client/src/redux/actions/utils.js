// importing types
import ACTIONS from "./types";

// Err Handler Error
export const errorHandlerAxios = (err, type) => (dispatch) => {
  let actionType =
    type === "recruiter"
      ? ACTIONS.RETRIEVE_DATA_ERROR_RECRUITER
      : ACTIONS.RETRIEVE_DATA_ERROR_APPLICATIONS;
  dispatch({
    type: actionType,
    payload: err,
  });
};
