import ACTIONS from "../actions/types";

const initialState = {
  recruiterList: [],
  recruitersLast10: [],
  recruiterResponses: [],
  recruitersPerMonth: [],
  recruitersTotalNumber: 0,
  currentMonthRecruiters: [],
  singleRecruiter: {},
  deletedRecruiter: {}
};

export const recruiterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_RECRUITER_STATE: {
      const {
        recruitersTotalNumber,
        recruitersLast10,
        recruiterResponses,
        recruitersPerMonth,
        currentMonthRecruiters
      } = action.payload.data;
      return {
        ...state,
        recruitersTotalNumber,
        recruitersLast10,
        recruiterResponses,
        recruitersPerMonth,
        currentMonthRecruiters
      };
    }
    case ACTIONS.RETRIEVE_RECRUITER_LIST: {
      const recruiterList = action.payload.data;
      return {
        ...state,
        recruiterList
      };
    }

    default:
      return state;
  }
};
