import React from "react";
import UpdateTableContainer from "../../containers/table/UpdateTableContainer";

const AdminRecruiters = ({ recruiter }) => {
  return (
    <>
      <UpdateTableContainer recruiter={recruiter} />
    </>
  );
};

export default AdminRecruiters;
