import React from "react";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import displayMonth from "../../../utils/displayMonth";
import capitalize from "../../../utils/capitalizeContent";

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
      <td>{capitalize(recruiterName)}</td>
      <td>{capitalize(recruiterCompany)}</td>
      <td>{capitalize(recruiterPlatform)}</td>
      <td>{displayMonth(recruiterMonth)}</td>
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

export default connect()(UpdateRecruiterTableRow);
