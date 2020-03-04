import React, { Component } from "react";
import LineChart from "../../containers/Charts/LineChart";
import TableContainer from "../../containers/Table/TableContainer";

class ViewRecruiterProgress extends Component {
  render() {
    return (
      <div>
        <LineChart />
        <TableContainer recruiter={true} />
      </div>
    );
  }
}

export default ViewRecruiterProgress;
