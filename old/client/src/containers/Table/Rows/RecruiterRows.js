import React from "react";
import capitalize from "../../../utils/capitalizeContent";
import displayMonth from "../../../utils/displayMonth";

const RecruiterTableRow = ({ content }) => {
  const {
    recruiterCompany,
    recruiterHiringInternal,
    recruiterLeadToInterview,
    recruiterLeadToRole,
    recruiterMonth,
    recruiterName,
    recruiterPlatform,
    recruiterRole,
    recruiterYear,
    _id,
  } = content;
  return (
    <tr className="" id={_id}>
      <td>{capitalize(recruiterName)}</td>
      <td>{capitalize(recruiterCompany)}</td>
      <td>{capitalize(recruiterPlatform)}</td>
      <td>{displayMonth(recruiterMonth)}</td>
      <td>{recruiterYear}</td>
      <td>{recruiterRole}</td>
      <td>{recruiterLeadToRole ? "Yes" : "No"}</td>
      <td>{recruiterLeadToInterview ? "Yes" : "No"}</td>
      <td>{recruiterHiringInternal ? "Yes" : "No"}</td>
    </tr>
  );
};

export default RecruiterTableRow;
