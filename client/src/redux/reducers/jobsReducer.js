import ACTIONS from "../actions/types";

const initialState = {
  jobId: "",
  companyName: "",
  applicationLink: "",
  applicationPlatform: "",
  applicationMonth: "",
  applicationYear: "",
  response: "",
  interview: "",
  hired: "",
  hiredDateMonth: "",
  hiredDateYear: "",
  lastDayWorkedMonth: "",
  lastDayWorkedYear: "",
  paginationBeginning: "",
  paginationEnding: "",
  recruiterName: "",
  recruiterDate: "",
  recruiterMonth: "",
  recruiterYear: "",
  recruiterPlatform: "",
  recruiterRole: "",
  recruiterLeadToRole: "",
  recruiterLeadToInterview: "",
  recruiterHiringInternal: "",
  recruiterCompany: ""
};

export const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATED_INPUT_FIELD: {
      return {
        ...state,
        [action.payload.id]: action.payload.content
      };
    }
    case ACTIONS.INITIALIZE_JOB_STATE: {
      return {
        ...state,
        ...action.payload
      };
    }
    case ACTIONS.RETRIEVE_JOBS_LIST: {
      return {
        ...state
      };
    }
    case ACTIONS.RETRIEVE_JOBS_LIST_PAGINATION: {
      return {
        ...state
      };
    }
    case ACTIONS.RETRIEVE_SINGLE_JOB: {
      return {
        ...state
      };
    }
    case ACTIONS.RETRIEVE_DATA_ERROR: {
      return {
        ...state
      };
    }
    case ACTIONS.INCREASE_PAGINATION_BEGINNING: {
      return {
        ...state
      };
    }
    case ACTIONS.INCREASE_PAGINATION_ENDING: {
      return {
        ...state
      };
    }
    case ACTIONS.ADD_NEW_JOB: {
      return {
        ...state
      };
    }
    case ACTIONS.UPDATE_JOB_INFORMATION: {
      return {
        ...state
      };
    }
    case ACTIONS.DELETE_JOB: {
      return {
        ...state
      };
    }
    case ACTIONS.SUBMITTED_INPUT_COLLECTION: {
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
};
