import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import PieChart from "../../containers/charts/PieChart";
import TableContainer from "../../containers/table/TableContainer";

const ViewRecruiterConversion = props => {
  return (
    <div className="col-12">
      <PieChart />
      <TableContainer recruiter={true} />
    </div>
  );
};

export default ViewRecruiterConversion;
