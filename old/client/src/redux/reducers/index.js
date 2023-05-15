import { applicationReducer } from "./applicationReducer";
import { bulkUploadReducer } from "./bulkUploadReducer";
import { combineReducers } from "redux";
import { formReducer } from "./formReducer";
import { modalReducer } from "./modalReducer";
import { recruiterReducer } from "./recruiterReducer";
import { uiReducer } from "./uiReducers";
import { userReducer } from "./usersReducer";

const jobTrackingReducer = combineReducers({
  application: applicationReducer,
  bulkUploadReducer: bulkUploadReducer,
  form: formReducer,
  modal: modalReducer,
  recruiter: recruiterReducer,
  ui: uiReducer,
  user: userReducer
});

export default jobTrackingReducer;
