import React, { Component } from "react";
import LineChart from "../../containers/charts/LineChart";
import TableContainer from "../../containers/table/TableContainer";

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
