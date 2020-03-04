import ACTIONS from "../actions/types";

const initialState = {
  recruiterList: [
    {
      recruiterId: "vkfskjhfkjshfkhsjfhsdf",
      recruiterName: "fmsfmnsmfbsmndfb",
      recruiterDate: 792394293874293847,
      recruiterMonth: 3,
      recruiterYear: 2020,
      recruiterPlatform: "LinkedIn",
      recruiterRole: "Recruiter",
      recruiterLeadToRole: false,
      recruiterLeadToInterview: false,
      recruiterContract: false,
      recruiterHiringInternal: true,
      recruiterCompany: "kjsdhfjkshfkjhsdf"
    },
    {
      recruiterId: "vkfskjhfkjshfkhsjfhsdf",
      recruiterName: "fmsfmnsmfbsmndfb",
      recruiterDate: 792394293874293847,
      recruiterMonth: 3,
      recruiterYear: 2020,
      recruiterPlatform: "LinkedIn",
      recruiterRole: "Recruiter",
      recruiterLeadToRole: false,
      recruiterLeadToInterview: false,
      recruiterContract: false,
      recruiterHiringInternal: true,
      recruiterCompany: "kjsdhfjkshfkjhsdf"
    },
    {
      recruiterId: "vkfskjhfkjshfkhsjfhsdf",
      recruiterName: "fmsfmnsmfbsmndfb",
      recruiterDate: 792394293874293847,
      recruiterMonth: 3,
      recruiterYear: 2020,
      recruiterPlatform: "LinkedIn",
      recruiterRole: "Recruiter",
      recruiterLeadToRole: false,
      recruiterLeadToInterview: false,
      recruiterContract: false,
      recruiterHiringInternal: true,
      recruiterCompany: "kjsdhfjkshfkjhsdf"
    }
  ],
  recruiterListLength: 3,
  recruiterListLast10: [],
  singleRecruiter: {}
};

export const recruiterReducer = (state = initialState, aaction) => {
  switch (ACTIONS.type) {
    default:
      return state;
  }
};
