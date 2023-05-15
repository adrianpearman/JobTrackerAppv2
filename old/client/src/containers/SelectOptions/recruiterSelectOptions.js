import React from "react";
import { connect } from "react-redux";

const recruiterSelectOptions = ({ recruiterState }) => {
  return (
    <>
      {recruiterState.recruitersPerMonth.map((recruiter, index) => {
        return (
          <option key={index} data-value={recruiter.date}>
            {recruiter.name}
          </option>
        );
      })}
    </>
  );
};

const mapStateToProps = ({ recruiter }) => {
  return {
    recruiterState: recruiter,
  };
};

export default connect(mapStateToProps)(recruiterSelectOptions);
