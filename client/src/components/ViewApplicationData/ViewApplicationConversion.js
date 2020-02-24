import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";

const ViewConversion = props => {
  return (
    <div>
      <h1>ViewConversion</h1>
      <button onClick={() => props.fetchJobs()}>fetch buttons</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = {
  fetchJobs: actions.fetchJobs
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewConversion);
