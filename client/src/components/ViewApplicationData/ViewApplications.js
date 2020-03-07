import React, { useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import Tabs from "../../containers/Tab";
import ViewConversion from "./ViewApplicationConversion";
import ViewMonthlyProgress from "./ViewApplicationMonthly";

const ViewJobs = ({ init }) => {
  useEffect(() => {
    init();
  }, []);

  return (
    <Tabs>
      <div title="View Conversion History">
        <ViewConversion />
      </div>
      <div title="View Monthly Applications">
        <ViewMonthlyProgress />
      </div>
    </Tabs>
  );
};

const mapDispatchToProps = {
  init: actions.intializeJobState
};

export default connect(null, mapDispatchToProps)(ViewJobs);
