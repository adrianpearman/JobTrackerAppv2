import React from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import PieChart from "../../containers/Charts/PieChart";
import TableContainer from "../../containers/Table/TableContainer";

const ViewConversion = ({ application, fetchJobs }) => {
  return (
    <div className="col-12">
      <PieChart />
      <p>{application.applicationList.length}</p>
      <button onClick={() => fetchJobs()}>fetch buttons</button>
      <TableContainer recruiter={false} />
    </div>
  );
};

const mapStateToProps = ({ application }) => {
  return {
    application: application
  };
};

const mapDispatchToProps = {
  fetchJobs: actions.fetchJobs
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewConversion);
