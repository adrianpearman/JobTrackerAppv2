import React, { Component } from "react";
import LineChart from "../../containers/charts/LineChart";
import TableContainer from "../../containers/table/TableContainer";

class ViewRecruiterProgress extends Component {
  render() {
    return (
      <div>
        <h1>ViewRecruiterProgress</h1>
        <LineChart />
        <TableContainer recruiter={true} />
      </div>
    );
  }
}

export default ViewRecruiterProgress;
