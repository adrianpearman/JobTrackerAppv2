import React, { Component } from "react";

import Tabs from "../../containers/Tab";
import ViewConversion from "./ViewConversion";
import ViewMonthlyProgress from "./ViewMonthyProgress";

class ViewJobs extends Component {
  render() {
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
  }
}

export default ViewJobs;
