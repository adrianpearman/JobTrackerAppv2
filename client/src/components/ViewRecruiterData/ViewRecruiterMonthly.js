import React from "react";
import { connect } from "react-redux";
import LineChart from "../../containers/Charts/LineChart";
import TableContainer from "../../containers/Table/TableContainer";
import SelectTimeFrameContainer from "../../containers/SelectTimeFrameContainer";

const ViewRecruiterProgress = () => {
  return (
    <div>
      <LineChart data={[]} />
      <SelectTimeFrameContainer />
      <TableContainer data={[]} recruiter={true} />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewRecruiterProgress);
