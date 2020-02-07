import { combineReducers } from "redux";
import { bulkUploadReducer } from "./bulkUploadReducer";
import { jobsReducer } from "./jobsReducer";
import { uiReducer } from "./uiReducers";
import { userReducer } from "./usersReducer";

const jobTrackingReducer = combineReducers({
  bulkUploadReducer: bulkUploadReducer,
  jobs: jobsReducer,
  ui: uiReducer,
  user: userReducer
});

export default jobTrackingReducer;
