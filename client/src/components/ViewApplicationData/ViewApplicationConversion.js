import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import PieChart from "../../containers/charts/PieChart";
import TableContainer from "../../containers/table/TableContainer";

const ViewConversion = props => {
  return (
    <div className="col-12">
      <PieChart />
      <p>{props.job.jobList.length}</p>
      <button onClick={() => props.fetchJobs()}>fetch buttons</button>
      <TableContainer recruiter={false} />
    </div>
  );
};

const mapStateToProps = ({ job }) => {
  return {
    job: job
  };
};

const mapDispatchToProps = {
  fetchJobs: actions.fetchJobs
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewConversion);
