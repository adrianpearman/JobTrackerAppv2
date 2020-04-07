import React from "react";
import { connect } from "react-redux";
import actions from "../redux/actions";

const SelectTimeFrameContainer = ({
  application,
  fetchApplicationsPerMonth,
  setApplicationTimeFrame
}) => {
  return (
    <div className="row">
      <div className="form-group col-10 text-center">
        <select
          className="form-control col-8"
          style={{ display: "inline-block" }}
          onChange={e => setApplicationTimeFrame(e)}
        >
          <option data-value="all time">All Time</option>
          {application.applicationsPerMonth.map((application, index) => {
            return (
              <option key={index} data-value={application.date}>
                {application.name}
              </option>
            );
          })}
        </select>
        <button
          className="btn btn-primary"
          style={{ float: "right" }}
          onClick={() => fetchApplicationsPerMonth()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ application }) => {
  return {
    application
  };
};

const mapDispatchToProps = {
  fetchApplicationsPerMonth: actions.fetchApplicationsPerMonth,
  setApplicationTimeFrame: actions.setApplicationTimeFrame
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectTimeFrameContainer);
