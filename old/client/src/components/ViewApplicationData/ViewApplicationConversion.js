import React from "react";
import { connect } from "react-redux";
import PieChart from "../../containers/Charts/PieChart";
import TableContainer from "../../containers/Table/TableContainer";

const ViewApplicationConversion = ({ application }) => {
  const { applicationResponses, applicationsLast10 } = application;
  return (
    <div className="col-12">
      <PieChart data={applicationResponses} recruiter={false} />
      <TableContainer data={applicationsLast10} recruiter={false} />
    </div>
  );
};

const mapStateToProps = ({ application }) => {
  return {
    application,
  };
};

export default connect(mapStateToProps)(ViewApplicationConversion);
