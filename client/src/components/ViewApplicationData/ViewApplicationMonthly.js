import React from "react";
import { connect } from "react-redux";
import LineChart from "../../containers/Charts/LineChart";
import TableContainer from "../../containers/Table/TableContainer";
import SelectTimeFrameContainer from "../../containers/SelectTimeFrameContainer";

const ViewMonthlyProgress = ({ application }) => {
  return (
    <div>
      <LineChart data={application.applicationsPerMonth} />
      <SelectTimeFrameContainer />
      <TableContainer data={application.applicationList} recruiter={false} />
    </div>
  );
};

const mapStateToProps = ({ application }) => {
  return {
    application
  };
};

export default connect(mapStateToProps)(ViewMonthlyProgress);
