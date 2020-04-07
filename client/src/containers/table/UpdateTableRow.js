import React from "react";
import UpdateApplicationTableRow from "./Rows/UpdateApplicationRows";
import UpdateRecruiterTableRow from "./Rows/UpdateRecruiterRows";

const UpdateTableRow = ({ content, recruiter, toggleModal }) => {
  return (
    <>
      {recruiter ? (
        <UpdateRecruiterTableRow toggleModal={toggleModal} content={content} />
      ) : (
        <UpdateApplicationTableRow
          toggleModal={toggleModal}
          content={content}
        />
      )}
    </>
  );
};

export default UpdateTableRow;
