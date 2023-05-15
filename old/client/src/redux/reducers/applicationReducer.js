import ACTIONS from "../actions/types";

const initialState = {
  applicationList: [],
  applicationsLast10: [],
  applicationResponses: [],
  applicationsPerMonth: [],
  applicationsTotalNumber: 0,
  singleApplication: {},
  deletedApplication: {},
  currentCompany: {
    applications: [],
    applicationResponses: [],
    applicationsPerMonth: [],
    companyName: "",
  },
  companyList: {
    companyNameContainer: [],
    letters: {
      a: [],
      b: [],
      c: [],
      d: [],
      e: [],
      f: [],
      g: [],
      h: [],
      i: [],
      j: [],
      k: [],
      l: [],
      m: [],
      n: [],
      o: [],
      p: [],
      q: [],
      r: [],
      s: [],
      t: [],
      u: [],
      v: [],
      w: [],
      x: [],
      y: [],
      z: [],
      number: [],
    },
  },
};

export const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_JOB_STATE: {
      const {
        applicationsLast10,
        applicationResponses,
        applicationsPerMonth,
        applicationsTotalNumber,
        currentMonthApplications,
      } = action.payload.data;

      return {
        ...state,
        applicationsLast10,
        applicationResponses,
        applicationsPerMonth,
        applicationsTotalNumber,
        applicationList: currentMonthApplications,
      };
    }
    case ACTIONS.RETRIEVE_APPLICATIONS_LIST: {
      const { applications: applicationList } = action.payload.data;
      return {
        ...state,
        applicationList,
      };
    }
    case ACTIONS.UPDATE_APPLICATION_TIME_FRAME: {
      const { applications: applicationList } = action.payload.data;
      return {
        ...state,
        applicationList,
      };
    }
    case ACTIONS.RETRIEVE_APPLICATIONS_LIST_PAGINATION: {
      return {
        ...state,
      };
    }
    case ACTIONS.RETRIEVE_SINGLE_APPLICATION: {
      return {
        ...state,
        singleApplication: action.payload.data,
      };
    }
    case ACTIONS.RETRIEVE_COMPANIES_LIST: {
      const removeId = ({ _id, ...rest }) => rest;
      const setLetters = ({ _id, companyNameContainer, ...rest }) => rest;
      const { companyNameContainer } = removeId(action.payload.data);
      const letters = setLetters(action.payload.data);

      return {
        ...state,
        companyList: {
          ...state.companyList,
          companyNameContainer,
          letters: {
            ...state.companyList.letters,
            ...letters,
          },
        },
      };
    }
    case ACTIONS.RETRIEVE_COMPANY: {
      const {
        applications,
        applicationResponses,
        applicationsPerMonth,
        companyName,
      } = action.payload;

      return {
        ...state,
        currentCompany: {
          ...state.currentCompany,
          applications,
          applicationResponses,
          applicationsPerMonth,
          companyName,
        },
      };
    }
    case ACTIONS.RETRIEVE_DATA_ERROR_APPLICATIONS: {
      return {
        ...state,
      };
    }
    case ACTIONS.INCREASE_PAGINATION_BEGINNING: {
      return {
        ...state,
      };
    }
    case ACTIONS.INCREASE_PAGINATION_ENDING: {
      return {
        ...state,
      };
    }
    case ACTIONS.UPDATE_APPLICATION_INFORMATION: {
      return {
        ...state,
      };
    }
    case ACTIONS.DELETE_APPLICATION: {
      return {
        ...state,
        deletedApplication: { ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
};
