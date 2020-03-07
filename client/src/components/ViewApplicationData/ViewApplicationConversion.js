import React from "react";
import { connect } from "react-redux";
import PieChart from "../../containers/Charts/PieChart";
import TableContainer from "../../containers/Table/TableContainer";

const ViewConversion = ({ application }) => {
  return (
    <div className="col-12">
      <PieChart data={application.applicationResponses} recruiter={false} />
      <TableContainer data={application.applicationsLast10} recruiter={false} />
    </div>
  );
};

const mapStateToProps = ({ application }) => {
  return {
    application
  };
};

export default connect(mapStateToProps)(ViewConversion);
