import ACTIONS from "../actions/types";

const initialState = {
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

export const recruiterReducer = (state = initialState, aaction) => {
  switch (ACTIONS.type) {
    default:
      return state;
  }
};
