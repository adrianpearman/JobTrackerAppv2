import React from "react";
import ApplicationRows from "./Rows/ApplicationRows";
import RecruiterTableRow from "./Rows/RecruiterRows";

const TableRows = ({ recruiter, content }) => {
  return (
    <>
      {recruiter ? (
        <RecruiterTableRow content={content} />
      ) : (
        <ApplicationRows content={content} />
      )}
    </>
  );
};

export default TableRows;
