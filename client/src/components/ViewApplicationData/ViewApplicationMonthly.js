import React, { Component } from "react";
import LineChart from "../../containers/Charts/LineChart";
import TableContainer from "../../containers/Table/TableContainer";

class ViewMonthlyProgress extends Component {
  render() {
    return (
      <div>
        <LineChart />
        <TableContainer recruiter={false} />
      </div>
    );
  }
}

export default ViewMonthlyProgress;
