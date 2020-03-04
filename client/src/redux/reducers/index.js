import { combineReducers } from "redux";
import { bulkUploadReducer } from "./bulkUploadReducer";
import { formReducer } from "./formReducer";
import { jobsReducer } from "./jobReducer";
import { modalReducer } from "./modalReducer";
import { recruiterReducer } from "./recruiterReducer";
import { uiReducer } from "./uiReducers";
import { userReducer } from "./usersReducer";

const jobTrackingReducer = combineReducers({
  bulkUploadReducer: bulkUploadReducer,
  form: formReducer,
  job: jobsReducer,
  modal: modalReducer,
  recruiter: recruiterReducer,
  ui: uiReducer,
  user: userReducer
});

export default jobTrackingReducer;
