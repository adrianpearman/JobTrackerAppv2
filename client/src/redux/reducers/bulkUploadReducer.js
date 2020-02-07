import ACTIONS from "../actions/types";

const initialState = {
  isCSV: null,
  csvData: null,
  uploadSuccessful: null
};

export const bulkUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CSV_UPLOAD_VALID:
      return {
        ...state,
        isCSV: action.payload
      };
    case ACTIONS.CSV_UPLOAD_DATA:
      return {
        ...state,
        csvData: action.payload
      };
    case ACTIONS.CSV_UPLOAD_SUCCESSFULL:
      return {
        ...state,
        uploadSuccessful: action.payload
      };
    case ACTIONS.CSV_UPLOAD_CLEAR_DATA:
      return {
        ...state,
        csvData: null
      };
    default: {
      return state;
    }
  }
};
