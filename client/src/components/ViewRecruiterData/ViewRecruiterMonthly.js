import React from "react";
import LineChart from "../../containers/Charts/LineChart";
import TableContainer from "../../containers/Table/TableContainer";

const ViewRecruiterProgress = () => {
  return (
    <div>
      <LineChart data={[]} />
      <TableContainer data={[]} recruiter={true} />
    </div>
  );
};

export default ViewRecruiterProgress;
