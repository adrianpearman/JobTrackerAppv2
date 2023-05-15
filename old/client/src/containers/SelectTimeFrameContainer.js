import React from "react";
import { connect } from "react-redux";
import actions from "../redux/actions";
import ApplicationSelectOption from "./SelectOptions/applicationSelectOptions";
import RecruiterSelectOption from "./SelectOptions/recruiterSelectOptions";

const SelectTimeFrameContainer = ({
  fetchApplicationsPerMonth,
  fetchRecruitersPerMonth,
  recruiter,
  setApplicationTimeFrame,
}) => {
  return (
    <div className="row">
      <div className="form-group col-12 mt-3 text-center">
        <select
          className="form-control col-7"
          style={{ display: "inline-block" }}
          onChange={(e) => setApplicationTimeFrame(e)}
        >
          <option data-value="all time">All Time</option>
          {recruiter ? <RecruiterSelectOption /> : <ApplicationSelectOption />}
        </select>
        {recruiter ? (
          <button
            className="btn btn-primary col-4"
            style={{ float: "right" }}
            onClick={() => fetchRecruitersPerMonth()}
          >
            Search Recruiters
          </button>
        ) : (
          <button
            className="btn btn-primary col-4"
            style={{ float: "right" }}
            onClick={() => fetchApplicationsPerMonth()}
          >
            Search Applications
          </button>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  fetchApplicationsPerMonth: actions.fetchApplicationsPerMonth,
  fetchRecruitersPerMonth: actions.fetchRecruitersPerMonth,
  setApplicationTimeFrame: actions.setApplicationTimeFrame,
};

export default connect(null, mapDispatchToProps)(SelectTimeFrameContainer);
