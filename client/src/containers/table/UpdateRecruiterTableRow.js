import React from "react";

const UpdateRecruiterTableRow = ({ content, toggleModal }) => {
  const {
    recruiterId,
    recruiterName,
    recruiterMonth,
    recruiterYear,
    recruiterPlatform,
    recruiterRole,
    recruiterLeadToRole,
    recruiterLeadToInterview,
    recruiterHiringInternal,
    recruiterCompany
  } = content;

  return (
    <tr className="" id={recruiterId}>
      <td>{recruiterName}</td>
      <td>{recruiterCompany}</td>
      <td>{recruiterPlatform}</td>
      <td>{recruiterMonth}</td>
      <td>{recruiterYear}</td>
      <td>{recruiterRole}</td>
      <td>{recruiterLeadToRole}</td>
      <td>{recruiterLeadToInterview}</td>
      <td>{recruiterHiringInternal}</td>
      <td>
        <button onClick={() => toggleModal(false)} className="btn btn-primary">
          Update
        </button>
      </td>
      <td>
        <button onClick={() => toggleModal(false)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UpdateRecruiterTableRow;
