import ACTIONS from "../actions/types";

const initialState = {
  applicationForm: {
    companyName: "",
    applicationLink: "",
    applicationPlatform: "",
    applicationMonth: "",
    applicationYear: "",
    response: false,
    interview: false,
    hired: false,
    hiredDateMonth: "",
    hiredDateYear: "",
    lastDayWorkedMonth: "",
    lastDayWorkedYear: "",
    applicationSubmitSuccess: "",
    applicationSubmitError: ""
  },
  applicationSubmit: {
    success: null,
    applicationId: "",
    companyName: "",
    errors: [],
    errorMsg: ""
  },
  recruiterForm: {
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
  },
  recruiterSubmit: {
    success: null,
    applicationId: "",
    recruiterName: "",
    errors: [],
    errorMsg: ""
  }
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.UPDATED_JOB_INPUT_FIELD: {
      return {
        ...state,
        applicationForm: {
          ...state.applicationForm,
          [action.payload.id]: action.payload.content
        }
      };
    }
    case ACTIONS.UPDATED_RECRUITER_INPUT_FIELD: {
      return {
        ...state,
        recruiterForm: {
          ...state.recruiterForm,
          [action.payload.id]: action.payload.content
        }
      };
    }
    case ACTIONS.ADD_NEW_JOB: {
      return {
        ...state,
        applicationSubmit: {
          ...state.applicationSubmit,
          success: true,
          applicationId: action.payload.data._id,
          companyName: action.payload.data.companyName,
          errors: [],
          errorMsg: ""
        }
      };
    }

    case ACTIONS.ADD_NEW_JOB_ERROR: {
      let errors = action.payload.errMsg
        ? action.payload.errMsg.errors
        : {
            applicationLink: {
              message: ""
            }
          };
      return {
        ...state,
        applicationSubmit: {
          ...state.applicationSubmit,
          success: false,
          applicationId: "",
          companyName: "",
          errorMsg: action.payload.message,
          errors: Object.entries(errors).map(error => {
            return error[0];
          })
        }
      };
    }
    case ACTIONS.ADD_NEW_RECRUITER:
      return {
        ...state,
        recruiterSubmit: {
          ...state.recruiterSubmit,
          success: true,
          applicationId: action.payload.data._id,
          recruiterName: action.payload.data.recruiterName,
          errors: [],
          errorMsg: ""
        }
      };
    case ACTIONS.ADD_NEW_RECRUITER_ERROR:
      return {
        ...state,
        recruiterSubmit: {
          ...state.recruiterSubmit,
          success: false,
          applicationId: "",
          recruiterName: "",
          errorMsg: action.payload.message,
          errors: Object.entries(action.payload.errMsg.errors).map(error => {
            return error[0];
          })
        }
      };
    default:
      return state;
  }
};
