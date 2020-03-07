import React from "react";
import PieChart from "../../containers/Charts/PieChart";
import TableContainer from "../../containers/Table/TableContainer";

const ViewRecruiterConversion = props => {
  return (
    <div className="col-12">
      <PieChart data={[]} recruiter={true} />
      <TableContainer data={[]} recruiter={true} />
    </div>
  );
};

export default ViewRecruiterConversion;
