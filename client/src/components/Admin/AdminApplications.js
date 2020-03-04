import React from "react";
import UpdateTableContainer from "../../containers/table/UpdateTableContainer";

const AdminApplications = ({ recruiter }) => {
  return (
    <>
      <UpdateTableContainer recruiter={recruiter} />
    </>
  );
};

export default AdminApplications;
