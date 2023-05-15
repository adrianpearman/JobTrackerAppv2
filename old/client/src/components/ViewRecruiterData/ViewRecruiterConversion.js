import React from "react";
import { connect } from "react-redux";
import PieChart from "../../containers/Charts/PieChart";
import TableContainer from "../../containers/Table/TableContainer";

const ViewRecruiterConversion = ({ recruiter }) => {
  const { recruiterResponses, recruitersLast10 } = recruiter;
  return (
    <div className="col-12">
      <PieChart data={recruiterResponses} recruiter={true} />
      <TableContainer data={recruitersLast10} recruiter={true} />
    </div>
  );
};

const mapStateToProps = ({ recruiter }) => {
  return {
    recruiter,
  };
};

export default connect(mapStateToProps)(ViewRecruiterConversion);
