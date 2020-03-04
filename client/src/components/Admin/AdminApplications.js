import React from "react";
import { connect } from "react-redux";
import UpdateTableContainer from "../../containers/Table/UpdateTableContainer";

const AdminApplications = ({ applications, recruiter }) => {
  return (
    <>
      <UpdateTableContainer
        recruiter={recruiter}
        data={applications.applicationList}
      />
    </>
  );
};

const mapStateToProps = ({ application }) => {
  return {
    applications: application
  };
};

export default connect(mapStateToProps)(AdminApplications);
