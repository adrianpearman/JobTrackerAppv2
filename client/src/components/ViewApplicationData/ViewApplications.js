import React, { Component } from "react";

import Tabs from "../../containers/Tab";
import ViewConversion from "./ViewApplicationConversion";
import ViewMonthlyProgress from "./ViewApplicationMonthly";

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
