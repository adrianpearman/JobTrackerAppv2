const types = {
  // Job Actions
  INITIALIZE_JOB_STATE: "INITIALIZE_JOB_STATE",
  // GET REQUESTS
  RETRIEVE_APPLICATIONS_LIST: "RETRIEVE_APPLICATIONS_LIST",
  RETRIEVE_APPLICATIONS_LIST_PAGINATION:
    "RETRIEVE_APPLICATIONS_LIST_PAGINATION",
  RETRIEVE_SINGLE_APPLICATION: "RETRIEVE_SINGLE_APPLICATION",
  RETRIEVE_DATA_ERROR_APPLICATIONS: "RETRIEVE_DATA_ERROR_APPLICATIONS",
  INCREASE_APPLICATIONS_PAGINATION_BEGINNING:
    "INCREASE_APPLICATIONS_PAGINATION_BEGINNING",
  INCREASE_APPLICATIONS_PAGINATION_ENDING:
    "INCREASE_APPLICATIONS_PAGINATION_ENDING",
  RETRIEVE_COMPANIES_LIST: "RETRIEVE_COMPANIES_LIST",
  RETRIEVE_COMPANY: "RETRIEVE_COMPANY",
  // POST REQUESTS
  ADD_NEW_APPLICATION: "ADD_NEW_APPLICATION",
  ADD_NEW_APPLICATION_ERROR: "ADD_NEW_APPLICATION_ERROR",
  // PUT REQUESTS
  UPDATE_APPLICATION_INFORMATION: "UPDATE_APPLICATION_INFORMATION",
  // DELETE REQUESTS
  DELETE_APPLICATION: "DELETE_APPLICATION",
  DELETE_APPLICATION_ERROR: "DELETE_APPLICATION_ERROR",
  //BULK UPLOAD
  CSV_APPLICATIONS_UPLOAD_VALID: "CSV_APPLICATIONS_UPLOAD_VALID",
  CSV_APPLICATIONS_UPLOAD_DATA: "CSV_APPLICATIONS_UPLOAD_DATA",
  CSV_APPLICATIONS_UPLOAD_CLEAR_DATA: "CSV_APPLICATIONS_UPLOAD_CLEAR_DATA",
  CSV_APPLICATIONS_UPLOAD_SUCCESSFULL: "CSV_APPLICATIONS_UPLOAD_SUCCESSFULL",

  // Recruiter Actions
  INITIALIZE_RECRUITER_STATE: "INITIALIZE_RECRUITER_STATE",
  // GET REQUESTS
  RETRIEVE_RECRUITER_LIST: "RETRIEVE_RECRUITER_LIST",
  RETRIEVE_RECRUITER_LIST_PAGINATION: "RETRIEVE_RECRUITER_LIST_PAGINATION",
  RETRIEVE_SINGLE_RECRUITER: "RETRIEVE_SINGLE_RECRUITER",
  RETRIEVE_DATA_ERROR_RECRUITER: "RETRIEVE_DATA_ERROR_RECRUITER",
  INCREASE_PAGINATION_BEGINNING: "INCREASE_PAGINATION_BEGINNING",
  INCREASE_PAGINATION_ENDING: "INCREASE_PAGINATION_ENDING",
  // POST REQUESTS
  ADD_NEW_RECRUITER: "ADD_NEW_RECRUITER",
  ADD_NEW_RECRUITER_ERROR: "ADD_NEW_RECRUITER_ERROR",
  // PUT REQUESTS
  UPDATE_RECRUITER_INFORMATION: "UPDATE_RECRUITER_INFORMATION",
  // DELETE REQUESTS
  DELETE_RECRUITER: "DELETE_RECRUITER",
  //BULK UPLOAD
  CSV_RECRUITER_UPLOAD_VALID: "CSV_RECRUITER_UPLOAD_VALID",
  CSV_RECRUITER_UPLOAD_DATA: "CSV_RECRUITER_UPLOAD_DATA",
  CSV_RECRUITER_UPLOAD_CLEAR_DATA: "CSV_RECRUITER_UPLOAD_CLEAR_DATA",
  CSV_RECRUITER_UPLOAD_SUCCESSFULL: "CSV_RECRUITER_UPLOAD_SUCCESSFULL",

  // UI Actions
  // APPLICATION FORM TYPES
  VALID_COMPANY_NAME: "VALID_COMPANY_NAME",
  VALID_APPLICATION_LINK: "VALID_APPLICATION_LINK",
  VALID_APPLICATION_MONTH: "VALID_APPLICATION_MONTH",
  VALID_APPLICATION_SOURCE: "VALID_APPLICATION_SOURCE",
  VALID_APPLICATION_YEAR: "VALID_APPLICATION_YEAR",
  // USERNAME FORM TYPES
  VALID_USERNAME: "VALID_USERNAME",
  VALID_EMAIL: "VALID_EMAIL",
  VALID_PASSWORD: "VALID_PASSWORD",
  VALID_IMAGE_URL: "VALID_IMAGE_URL",
  // User Actions
  USER_CREATE: "USER_CREATE",
  USER_CREATE_SUCCESSFUL: "USER_CREATE_SUCCESSFUL",
  USER_CREATE_UNSUCCESSFUL: "USER_CREATE_UNSUCCESSFUL",
  USER_LOGIN: "USER_LOGIN",
  USER_LOGIN_SUCCESSFULL: "USER_LOGIN_SUCCESSFULL",
  USER_LOGIN_UNSUCCESSFUL: "USER_LOGIN_UNSUCCESSFUL",

  //Form Actions
  UPDATED_RECRUITER_INPUT_FIELD: "UPDATED_RECRUITER_INPUT_FIELD",
  UPDATED_JOB_INPUT_FIELD: "UPDATED_JOB_INPUT_FIELD",

  //Modal Actions
  TOGGLE_MODAL: "TOGGLE_MODAL",

  //Line Chart Actions
  APPLICATION_TIME_FRAME: "APPLICATION_TIME_FRAME",
  UPDATE_APPLICATION_TIME_FRAME: "UPDATE_APPLICATION_TIME_FRAME",
  UPDATE_RECRUITER_TIME_FRAME: "UPDATE_RECRUITER_TIME_FRAME",
};

export default types;