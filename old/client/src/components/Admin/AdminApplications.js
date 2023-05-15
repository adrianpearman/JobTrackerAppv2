import React, { useEffect } from "react";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import UpdateTableContainer from "../../containers/Table/UpdateTableContainer";

const AdminApplications = ({
  applicationList,
  getAllApplications,
  getAllRecruiters,
  recruiter,
  recruiterList
}) => {
  useEffect(() => {
    getAllApplications();
    getAllRecruiters();
  }, []);
  if (recruiter) {
    return (
      <>
        <UpdateTableContainer recruiter={recruiter} data={recruiterList} />
      </>
    );
  } else {
    return (
      <>
        <UpdateTableContainer recruiter={recruiter} data={applicationList} />
      </>
    );
  }
};

const mapStateToProps = ({ application, recruiter }) => {
  return {
    applicationList: application.applicationList,
    recruiterList: recruiter.recruiterList
  };
};

const mapDispatchToProps = {
  getAllApplications: actions.fetchApplications,
  getAllRecruiters: actions.fetchRecruiters
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminApplications);
