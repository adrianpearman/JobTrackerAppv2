import React from "react";
import { connect } from "react-redux";
import LineChart from "../../containers/Charts/LineChart";
import TableContainer from "../../containers/Table/TableContainer";

const ViewMonthlyProgress = ({ application }) => {
  return (
    <div>
      <LineChart data={application.applicationsPerMonth} />
      <TableContainer data={application} recruiter={false} />
    </div>
  );
};

const mapStateToProps = ({ application }) => {
  return {
    application
  };
};

export default connect(mapStateToProps)(ViewMonthlyProgress);
