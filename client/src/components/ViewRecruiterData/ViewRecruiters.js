import React, { Component } from "react";

import Tabs from "../../containers/Tab";
import ViewRecruiterConversion from "./ViewRecruiterConversion";
import ViewRecruiterProgress from "./ViewRecruiterMonthly";

class ViewRecruiters extends Component {
  render() {
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
  }
}

export default ViewRecruiters;
