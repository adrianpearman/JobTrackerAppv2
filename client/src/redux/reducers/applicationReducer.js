import ACTIONS from "../actions/types";

const initialState = {
  applicationList: [],
  applicationsLast10: [],
  applicationResponses: [],
  applicationsPerMonth: [],
  applicationsTotalNumber: 0,
  currentMonthApplications: [],
  singleApplication: {},
  deletedApplication: {}
};

export const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_JOB_STATE: {
      const {
        applicationsLast10,
        applicationResponses,
        applicationsPerMonth,
        applicationsTotalNumber,
        currentMonthApplications
      } = action.payload.data;

      return {
        ...state,
        applicationsLast10,
        applicationResponses,
        applicationsPerMonth,
        applicationsTotalNumber,
        currentMonthApplications
      };
    }
    case ACTIONS.RETRIEVE_JOBS_LIST: {
      const { applications: applicationList } = action.payload.data;
      return {
        ...state,
        applicationList
      };
    }
    case ACTIONS.UPDATE_APPLICATION_TIME_FRAME: {
      const { applications: applicationList } = action.payload.data;
      return {
        ...state,
        applicationList
      };
    }
    case ACTIONS.RETRIEVE_JOBS_LIST_PAGINATION: {
      return {
        ...state
      };
    }
    case ACTIONS.RETRIEVE_SINGLE_JOB: {
      return {
        ...state,
        singleApplication: action.payload.data
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
    case ACTIONS.DELETE_APPLICATION: {
      return {
        ...state,
        deletedApplication: { ...action.payload }
      };
    }
    default: {
      return state;
    }
  }
};
