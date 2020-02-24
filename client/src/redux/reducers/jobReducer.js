import ACTIONS from "../actions/types";

const initialState = {
  jobList: [],
  singleJob: {}
};

export const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case ACTIONS.RETRIEVE_DATA_ERROR_JOBS: {
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
    default: {
      return state;
    }
  }
};
