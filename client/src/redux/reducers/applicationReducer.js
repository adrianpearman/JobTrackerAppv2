import ACTIONS from "../actions/types";

const initialState = {
  applicationList: [
    {
      userId: "5cfbe3c271d5ee293ab8a643",
      applicationId: "h3gjahgfjhsgfjhsgf23492894",
      companyName: "Company One",
      applicationDate: 50398503985093853905,
      applicationLink: "ljfhksfhkjshfjkshfs",
      applicationPlatform: "LinkedIn",
      applicationMonth: 3,
      applicationYear: 2020,
      response: 2,
      interview: false,
      hired: false,
      hiredDateMonth: 0,
      hiredDateYear: 0,
      lastDayWorkedMonth: 0,
      lastDayWorkedYear: 0
    },
    {
      userId: "5cfbe3c271d5ee293ab8a643",
      applicationId: "h3gjahgfjhsgfjhsgf23492894",
      companyName: "Company One",
      applicationDate: 50398503985093853905,
      applicationLink: "ljfhksfhkjshfjkshfs",
      applicationPlatform: "LinkedIn",
      applicationMonth: 3,
      applicationYear: 2020,
      response: 2,
      interview: false,
      hired: false,
      hiredDateMonth: 0,
      hiredDateYear: 0,
      lastDayWorkedMonth: 0,
      lastDayWorkedYear: 0
    },
    {
      userId: "5cfbe3c271d5ee293ab8a643",
      applicationId: "h3gjahgfjhsgfjhsgf23492894",
      companyName: "Company One",
      applicationDate: 50398503985093853905,
      applicationLink: "ljfhksfhkjshfjkshfs",
      applicationPlatform: "LinkedIn",
      applicationMonth: 3,
      applicationYear: 2020,
      response: 2,
      interview: false,
      hired: false,
      hiredDateMonth: 0,
      hiredDateYear: 0,
      lastDayWorkedMonth: 0,
      lastDayWorkedYear: 0
    },
    {
      userId: "5cfbe3c271d5ee293ab8a643",
      applicationId: "h3gjahgfjhsgfjhsgf23492894",
      companyName: "Company One",
      applicationDate: 50398503985093853905,
      applicationLink: "ljfhksfhkjshfjkshfs",
      applicationPlatform: "LinkedIn",
      applicationMonth: 3,
      applicationYear: 2020,
      response: 2,
      interview: false,
      hired: false,
      hiredDateMonth: 0,
      hiredDateYear: 0,
      lastDayWorkedMonth: 0,
      lastDayWorkedYear: 0
    },
    {
      userId: "5cfbe3c271d5ee293ab8a643",
      applicationId: "h3gjahgfjhsgfjhsgf23492894",
      companyName: "Company One",
      applicationDate: 50398503985093853905,
      applicationLink: "ljfhksfhkjshfjkshfs",
      applicationPlatform: "LinkedIn",
      applicationMonth: 3,
      applicationYear: 2020,
      response: 2,
      interview: false,
      hired: false,
      hiredDateMonth: 0,
      hiredDateYear: 0,
      lastDayWorkedMonth: 0,
      lastDayWorkedYear: 0
    }
  ],
  applicationListLength: 5,
  applicationListLast10: [],
  singleApplication: {}
};

export const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_JOB_STATE: {
      return {
        ...state
      };
    }
    case ACTIONS.RETRIEVE_JOBS_LIST: {
      return {
        ...state,
        applicationList: action.payload.data
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
