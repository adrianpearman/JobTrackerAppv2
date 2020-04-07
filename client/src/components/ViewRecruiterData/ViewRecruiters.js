import React, { useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import Tabs from "../../containers/Tab";
import ViewRecruiterConversion from "./ViewRecruiterConversion";
import ViewRecruiterProgress from "./ViewRecruiterMonthly";

const ViewRecruiters = ({ init }) => {
  useEffect(() => {
    init();
  }, []);

  return (
    <Tabs>
      <div title="View Recruiter Conversion History">
        <ViewRecruiterConversion />
      </div>
      <div title="View Monthly Recruiter Progress">
        <ViewRecruiterProgress />
      </div>
    </Tabs>
  );
};

const mapDispatchToProps = {
  init: actions.initializeRecruiterState
};

export default connect(null, mapDispatchToProps)(ViewRecruiters);
