import React, { useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import UpdateTableContainer from "../../containers/Table/UpdateTableContainer";

const AdminApplications = ({ applications, getAllApplications, recruiter }) => {
  useEffect(() => {
    getAllApplications();
  }, []);

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

const mapDispatchToProps = {
  getAllApplications: actions.fetchJobs
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminApplications);
