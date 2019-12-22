import { combineReducers } from "redux";
import { jobsReducer } from "./jobsReducer";
import { uiReducer } from "./uiReducers";
import { userReducer } from "./usersReducer";

const jobTrackingReducer = combineReducers({
  jobs: jobsReducer,
  ui: uiReducer,
  user: userReducer
});

export default jobTrackingReducer;
