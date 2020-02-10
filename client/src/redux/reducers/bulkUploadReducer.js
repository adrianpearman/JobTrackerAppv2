import ACTIONS from "../actions/types";

const initialState = {
  isCSV: null,
  csvDataApplication: null,
  csvDataRecruiter: null,
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
      console.log(action.payload);
      return {
        ...state,
        [action.payload.id]: action.payload.data
      };
    case ACTIONS.CSV_UPLOAD_SUCCESSFULL:
      return {
        ...state,
        uploadSuccessful: action.payload
      };
    case ACTIONS.CSV_UPLOAD_CLEAR_DATA:
      return {
        ...state,
        ...initialState
      };
    default: {
      return state;
    }
  }
};
