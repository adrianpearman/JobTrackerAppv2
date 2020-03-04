import React from "react";
import { connect } from "react-redux";
import UpdateTableContainer from "../../containers/Table/UpdateTableContainer";

const AdminRecruiters = ({ recruiter, recruiters }) => {
  return (
    <>
      <UpdateTableContainer
        recruiter={recruiter}
        data={recruiters.recruiterList}
      />
    </>
  );
};

const mapStateToProps = ({ recruiter }) => {
  return {
    recruiters: recruiter
  };
};

export default connect(mapStateToProps)(AdminRecruiters);
