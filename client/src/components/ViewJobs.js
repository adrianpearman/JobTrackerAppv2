import React, { Component } from "react";

import Tabs from "../containers/Tab";

class ViewJobs extends Component {
  render() {
    return (
      <Tabs>
        <div title="Pie Chart"></div>
        <div title="Line Chart"></div>
      </Tabs>
    );
  }
}

export default ViewJobs;
