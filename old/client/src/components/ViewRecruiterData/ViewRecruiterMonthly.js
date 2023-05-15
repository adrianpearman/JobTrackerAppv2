import React from "react";
import { connect } from "react-redux";
import LineChart from "../../containers/Charts/LineChart";
import TableContainer from "../../containers/Table/TableContainer";
import SelectTimeFrameContainer from "../../containers/SelectTimeFrameContainer";

const ViewRecruiterProgress = ({ recruiter }) => {
  console.log(recruiter.recruitersPerMonth);
  return (
    <div>
      <LineChart data={recruiter.recruitersPerMonth} />
      <SelectTimeFrameContainer recruiter={true} />
      <TableContainer data={recruiter.recruiterList} recruiter={true} />
    </div>
  );
};

const mapStateToProps = ({ recruiter }) => {
  return {
    recruiter,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewRecruiterProgress);
