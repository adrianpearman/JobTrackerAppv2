import React from "react";
import { connect } from "react-redux";

const applicationSelectOptions = ({ applicationState }) => {
  return (
    <>
      {applicationState.applicationsPerMonth.map((application, index) => {
        return (
          <option key={index} data-value={application.date}>
            {application.name}
          </option>
        );
      })}
    </>
  );
};

const mapStateToProps = ({ application }) => {
  return {
    applicationState: application,
  };
};

export default connect(mapStateToProps)(applicationSelectOptions);
